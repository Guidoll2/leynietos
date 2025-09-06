import mongoose from "mongoose"
import crypto from "crypto"

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
  editToken: {
    type: String,
    required: true,
    default: () => crypto.randomBytes(16).toString('hex'), // Token único de 32 caracteres
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema)
