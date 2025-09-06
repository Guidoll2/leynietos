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
    const { editToken, ...updateData } = body
    console.log("[API] Received update body:", body)

    // Verificar que se proporcionó el token
    if (!editToken) {
      return NextResponse.json({ 
        success: false, 
        error: "Token de edición requerido" 
      }, { status: 401 })
    }

    // Buscar la aplicación y verificar el token
    const application = await Application.findById(id)
    if (!application) {
      return NextResponse.json({ success: false, error: "Aplicación no encontrada" }, { status: 404 })
    }

    if (application.editToken !== editToken) {
      return NextResponse.json({ 
        success: false, 
        error: "Token de edición inválido" 
      }, { status: 403 })
    }

    // Actualizar la aplicación (sin incluir el editToken en los datos)
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )

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

    const body = await request.json()
    const { editToken } = body

    // Verificar que se proporcionó el token
    if (!editToken) {
      return NextResponse.json({ 
        success: false, 
        error: "Token de edición requerido" 
      }, { status: 401 })
    }

    // Buscar la aplicación y verificar el token
    const application = await Application.findById(id)
    if (!application) {
      return NextResponse.json({ success: false, error: "Aplicación no encontrada" }, { status: 404 })
    }

    if (application.editToken !== editToken) {
      return NextResponse.json({ 
        success: false, 
        error: "Token de edición inválido" 
      }, { status: 403 })
    }

    // Eliminar la aplicación
    const deletedApplication = await Application.findByIdAndDelete(id)

    console.log("[API] Application deleted successfully")
    return NextResponse.json({ success: true, message: "Aplicación eliminada correctamente" })
  } catch (error) {
    console.error("Error deleting application:", error)
    return NextResponse.json({ success: false, error: "Error al eliminar la aplicación" }, { status: 500 })
  }
}
