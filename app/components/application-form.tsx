"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { useToast } from "../hooks/use-toast"

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

      if (response.ok) {
        toast({
          title: "¡Registro exitoso!",
          description: "Tu información ha sido guardada correctamente.",
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
        throw new Error("Error al enviar el formulario")
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-serif text-xl">Registrar mi trámite</CardTitle>
        <CardDescription>Comparte el estado de tu trámite para ayudar a la comunidad</CardDescription>
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido (opcional)</Label>
              <Input
                id="apellido"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
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
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mailConfirmacion"
                checked={formData.mailConfirmacion}
                onChange={(e) => setFormData({ ...formData, mailConfirmacion: e.target.checked })}
              />
              <Label htmlFor="mailConfirmacion">Recibí mail de confirmación del consulado</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="documentacionAdicional"
                checked={formData.documentacionAdicional}
                onChange={(e) => setFormData({ ...formData, documentacionAdicional: e.target.checked })}
              />
              <Label htmlFor="documentacionAdicional">Tuve que agregar documentación adicional</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="resolucionRecibida"
                checked={formData.resolucionRecibida}
                onChange={(e) => setFormData({ ...formData, resolucionRecibida: e.target.checked })}
              />
              <Label htmlFor="resolucionRecibida">Ya recibí la resolución final</Label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Registrar mi trámite"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
