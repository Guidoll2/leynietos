import { type NextRequest, NextResponse } from "next/server"
import connectDB from "../../lib/connect-db"
import Application from "../../models/application"

export async function POST(request: NextRequest) {
  console.log("[API] POST /api/applications called")
  try {
    console.log("[API] Connecting to DB...")
    await connectDB()
    console.log("[API] Connected to DB successfully")

    const body = await request.json()
    console.log("[API] Received body:", body)
    const application = new Application(body)
    console.log("[API] Created application object")
    await application.save()
    console.log("[API] Application saved successfully")

    return NextResponse.json({ success: true, data: application })
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json({ success: false, error: "Error al crear la aplicación" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  console.log("[API] GET /api/applications called")
  try {
    console.log("[API] Connecting to DB...")
    await connectDB()
    console.log("[API] Connected to DB successfully")

    // Obtener parámetros de filtro de la URL
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const month = searchParams.get('month') // formato: "2023-09"
    
    console.log("[API] Filters - startDate:", startDate, "endDate:", endDate, "month:", month)

    // Construir filtro de fecha
    let dateFilter = {}
    if (startDate && endDate) {
      dateFilter = {
        fechaTramite: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }
    } else if (month) {
      // Filtrar por mes específico (ej: "2023-09")
      const [year, monthNum] = month.split('-')
      const startOfMonth = new Date(parseInt(year), parseInt(monthNum) - 1, 1)
      const endOfMonth = new Date(parseInt(year), parseInt(monthNum), 0)
      dateFilter = {
        fechaTramite: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      }
    }

    console.log("[API] Date filter:", dateFilter)
    console.log("[API] Fetching applications...")
    const applications = await Application.find(dateFilter).sort({ fechaCreacion: -1 })
    console.log("[API] Found", applications.length, "applications")

    const stats = {
      total: applications.length,
      enEspera: applications.filter((app) => !app.resolucionRecibida).length,
      resueltos: applications.filter((app) => app.resolucionRecibida).length,
      conConfirmacion: applications.filter((app) => app.mailConfirmacion).length,
      conDocumentacionAdicional: applications.filter((app) => app.documentacionAdicional).length,
    }
    console.log("[API] Calculated stats:", stats)

    return NextResponse.json({ success: true, stats, applications })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ success: false, error: "Error al obtener las aplicaciones" }, { status: 500 })
  }
}
