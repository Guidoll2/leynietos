import mongoose from "mongoose"

const ApplicationSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    trim: true,
  },
  fechaTramite: {
    type: Date,
    required: true,
  },
  mailConfirmacion: {
    type: Boolean,
    default: false,
  },
  documentacionAdicional: {
    type: Boolean,
    default: false,
  },
  resolucionRecibida: {
    type: Boolean,
    default: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema)
