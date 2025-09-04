"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Edit2, Save, X, Trash2, User } from "lucide-react"

interface Application {
  _id: string
  nombre: string
  apellido?: string
  fechaTramite: string
  mailConfirmacion: boolean
  documentacionAdicional: boolean
  resolucionRecibida: boolean
  fechaCreacion: string
}

interface ApplicationsListProps {
  applications: Application[]
  onUpdate: (id: string, data: Partial<Application>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function ApplicationsList({ applications, onUpdate, onDelete }: ApplicationsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Application>>({})

  const startEdit = (application: Application) => {
    setEditingId(application._id)
    setEditForm({
      nombre: application.nombre,
      apellido: application.apellido || '',
      fechaTramite: application.fechaTramite.split('T')[0], // Solo la fecha
      mailConfirmacion: application.mailConfirmacion,
      documentacionAdicional: application.documentacionAdicional,
      resolucionRecibida: application.resolucionRecibida,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const saveEdit = async () => {
    if (!editingId) return
    
    try {
      await onUpdate(editingId, editForm)
      setEditingId(null)
      setEditForm({})
    } catch (error) {
      console.error('Error updating application:', error)
    }
  }

  const handleDelete = async (id: string, nombre: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar el trámite de ${nombre}?`)) {
      try {
        await onDelete(id)
      } catch (error) {
        console.error('Error deleting application:', error)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (applications.length === 0) {
    return (
      <Card className="p-8 text-center">
        <User className="mx-auto mb-4 text-muted-foreground h-12 w-12" />
        <h3 className="text-lg font-semibold mb-2">No hay trámites registrados</h3>
        <p className="text-muted-foreground">
          Los trámites que se registren aparecerán aquí.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <User className="text-primary h-5 w-5" />
        <h3 className="text-lg font-semibold">
          Trámites registrados ({applications.length})
        </h3>
      </div>

      {applications.map((app) => (
        <Card key={app._id} className="p-4">
          {editingId === app._id ? (
            // Modo edición
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`nombre-${app._id}`}>Nombre *</Label>
                  <Input
                    id={`nombre-${app._id}`}
                    value={editForm.nombre || ''}
                    onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                    placeholder="Nombre"
                  />
                </div>
                <div>
                  <Label htmlFor={`apellido-${app._id}`}>Apellido</Label>
                  <Input
                    id={`apellido-${app._id}`}
                    value={editForm.apellido || ''}
                    onChange={(e) => setEditForm({ ...editForm, apellido: e.target.value })}
                    placeholder="Apellido"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`fecha-${app._id}`}>Fecha de trámite *</Label>
                <Input
                  id={`fecha-${app._id}`}
                  type="date"
                  value={editForm.fechaTramite || ''}
                  onChange={(e) => setEditForm({ ...editForm, fechaTramite: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`mail-${app._id}`}
                    checked={editForm.mailConfirmacion || false}
                    onCheckedChange={(checked: boolean) => 
                      setEditForm({ ...editForm, mailConfirmacion: checked })
                    }
                  />
                  <Label htmlFor={`mail-${app._id}`}>
                    ¿Recibiste el mail de confirmación?
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`docs-${app._id}`}
                    checked={editForm.documentacionAdicional || false}
                    onCheckedChange={(checked: boolean) => 
                      setEditForm({ ...editForm, documentacionAdicional: checked })
                    }
                  />
                  <Label htmlFor={`docs-${app._id}`}>
                    ¿Te pidieron documentación adicional?
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`resolucion-${app._id}`}
                    checked={editForm.resolucionRecibida || false}
                    onCheckedChange={(checked: boolean) => 
                      setEditForm({ ...editForm, resolucionRecibida: checked })
                    }
                  />
                  <Label htmlFor={`resolucion-${app._id}`}>
                    ¿Ya recibiste la resolución?
                  </Label>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={saveEdit}
                  disabled={!editForm.nombre || !editForm.fechaTramite}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Guardar
                </Button>
                <Button
                  onClick={cancelEdit}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            // Modo vista
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-lg">
                    {app.nombre} {app.apellido}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Trámite: {formatDate(app.fechaTramite)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Registrado: {formatDate(app.fechaCreacion)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => startEdit(app)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Edit2 className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(app._id, app.nombre)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className={`p-2 rounded ${app.mailConfirmacion ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  <span className="font-medium">Mail confirmación:</span> {app.mailConfirmacion ? 'Sí' : 'No'}
                </div>
                <div className={`p-2 rounded ${app.documentacionAdicional ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                  <span className="font-medium">Docs adicionales:</span> {app.documentacionAdicional ? 'Sí' : 'No'}
                </div>
                <div className={`p-2 rounded ${app.resolucionRecibida ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                  <span className="font-medium">Resolución:</span> {app.resolucionRecibida ? 'Recibida' : 'Pendiente'}
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
