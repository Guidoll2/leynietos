"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { useToast } from "../hooks/use-toast"
import { Copy, Eye, EyeOff } from "lucide-react"

export function ApplicationForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaTramite: "",
    mailConfirmacion: false,
    documentacionAdicional: false,
    resolucionRecibida: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editToken, setEditToken] = useState<string | null>(null)
  const [showToken, setShowToken] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setEditToken(result.editToken)
        toast({
          title: "¡Registro exitoso!",
          description: "Tu información ha sido guardada correctamente. Guarda tu token de edición.",
        })
        setFormData({
          nombre: "",
          apellido: "",
          fechaTramite: "",
          mailConfirmacion: false,
          documentacionAdicional: false,
          resolucionRecibida: false,
        })
        onSubmit()
      } else {
        throw new Error(result.error || "Error al enviar el formulario")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu información. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToken = async () => {
    if (editToken) {
      try {
        await navigator.clipboard.writeText(editToken)
        toast({
          title: "Token copiado",
          description: "El token ha sido copiado al portapapeles.",
        })
      } catch {
        toast({
          title: "Error al copiar",
          description: "No se pudo copiar el token. Cópialo manualmente.",
          variant: "destructive",
        })
      }
    }
  }

  const resetForm = () => {
    setEditToken(null)
    setShowToken(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {editToken && (
        <Card className="border-green-300/50 bg-green-100/60 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2 font-poppins">
              🎉 ¡Registro exitoso!
            </CardTitle>
            <CardDescription className="text-green-700 font-poppins">
              Tu trámite ha sido registrado. Guarda este token para poder editarlo más tarde:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="token">Token de edición:</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowToken(!showToken)}
                  className="h-6 w-6 p-0"
                >
                  {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  id="token"
                  value={editToken}
                  type={showToken ? "text" : "password"}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  type="button"
                  onClick={copyToken}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copiar
                </Button>
              </div>
              <div className="text-sm text-green-700 bg-green-100 p-3 rounded">
                <strong>⚠️ Importante:</strong> Guarda este token en un lugar seguro. Lo necesitarás para editar 
                o eliminar tu registro más tarde. Sin este token, no podrás modificar tu información.
              </div>
              <Button
                type="button"
                onClick={resetForm}
                variant="outline"
                className="w-full"
              >
                Registrar otro trámite
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className={`bg-white/40 border-white/30 backdrop-blur-lg ${editToken ? "opacity-50" : ""}`}>
        <CardHeader>
          <CardTitle className="font-poppins text-xl text-slate-800">Registrar mi trámite</CardTitle>
          <CardDescription className="font-poppins text-slate-600">Comparte el estado de tu trámite para ayudar a la comunidad</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                  disabled={!!editToken}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido (opcional)</Label>
                <Input
                  id="apellido"
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  disabled={!!editToken}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaTramite">Fecha del trámite *</Label>
              <Input
                id="fechaTramite"
                type="date"
                value={formData.fechaTramite}
                onChange={(e) => setFormData({ ...formData, fechaTramite: e.target.value })}
                required
                disabled={!!editToken}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mailConfirmacion"
                  checked={formData.mailConfirmacion}
                  onChange={(e) => setFormData({ ...formData, mailConfirmacion: e.target.checked })}
                  disabled={!!editToken}
                />
                <Label htmlFor="mailConfirmacion">Recibí mail de confirmación del consulado</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="documentacionAdicional"
                  checked={formData.documentacionAdicional}
                  onChange={(e) => setFormData({ ...formData, documentacionAdicional: e.target.checked })}
                  disabled={!!editToken}
                />
                <Label htmlFor="documentacionAdicional">Tuve que agregar documentación adicional</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="resolucionRecibida"
                  checked={formData.resolucionRecibida}
                  onChange={(e) => setFormData({ ...formData, resolucionRecibida: e.target.checked })}
                  disabled={!!editToken}
                />
                <Label htmlFor="resolucionRecibida">Ya recibí la resolución final</Label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90" 
              disabled={isSubmitting || !!editToken}
            >
              {isSubmitting ? "Enviando..." : "Registrar mi trámite"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
