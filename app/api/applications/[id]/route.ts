import { type NextRequest, NextResponse } from "next/server"
import connectDB from "../../../lib/connect-db"
import Application from "../../../models/application"
import mongoose from "mongoose"

// Actualizar una aplicación específica
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log("[API] PUT /api/applications/[id] called with ID:", id)
  try {
    await connectDB()

    // Validar que el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "ID de aplicación inválido" }, { status: 400 })
    }

    const body = await request.json()
    console.log("[API] Received update body:", body)

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )

    if (!updatedApplication) {
      return NextResponse.json({ success: false, error: "Aplicación no encontrada" }, { status: 404 })
    }

    console.log("[API] Application updated successfully")
    return NextResponse.json({ success: true, data: updatedApplication })
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ success: false, error: "Error al actualizar la aplicación" }, { status: 500 })
  }
}

// Obtener una aplicación específica
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log("[API] GET /api/applications/[id] called with ID:", id)
  try {
    await connectDB()

    // Validar que el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "ID de aplicación inválido" }, { status: 400 })
    }

    const application = await Application.findById(id)

    if (!application) {
      return NextResponse.json({ success: false, error: "Aplicación no encontrada" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: application })
  } catch (error) {
    console.error("Error fetching application:", error)
    return NextResponse.json({ success: false, error: "Error al obtener la aplicación" }, { status: 500 })
  }
}

// Eliminar una aplicación específica
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log("[API] DELETE /api/applications/[id] called with ID:", id)
  try {
    await connectDB()

    // Validar que el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "ID de aplicación inválido" }, { status: 400 })
    }

    const deletedApplication = await Application.findByIdAndDelete(id)

    if (!deletedApplication) {
      return NextResponse.json({ success: false, error: "Aplicación no encontrada" }, { status: 404 })
    }

    console.log("[API] Application deleted successfully")
    return NextResponse.json({ success: true, message: "Aplicación eliminada correctamente" })
  } catch (error) {
    console.error("Error deleting application:", error)
    return NextResponse.json({ success: false, error: "Error al eliminar la aplicación" }, { status: 500 })
  }
}
