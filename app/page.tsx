"use client"

import { useState, useEffect } from "react"
import { StatsCard } from "./components/stats-card"
import { ApplicationForm } from "./components/application-form"
import { DateFilters } from "./components/date-filters"
import { ApplicationsList } from "./components/applications-list"
import { Clock, CheckCircle, Mail, FileText, Users } from "lucide-react"
import { IconWrapper } from "./components/ui/_icon"

interface Stats {
  total: number
  enEspera: number
  resueltos: number
  conConfirmacion: number
  conDocumentacionAdicional: number
}

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

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    enEspera: 0,
    resueltos: 0,
    conConfirmacion: 0,
    conDocumentacionAdicional: 0,
  })
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredPeriod, setFilteredPeriod] = useState<string>("")

  const fetchData = async (filters?: { startDate?: string; endDate?: string; month?: string }) => {
    try {
      let url = "/api/applications"
      
      if (filters) {
        const params = new URLSearchParams()
        if (filters.startDate && filters.endDate) {
          params.append('startDate', filters.startDate)
          params.append('endDate', filters.endDate)
          setFilteredPeriod(`${filters.startDate} a ${filters.endDate}`)
        } else if (filters.month) {
          params.append('month', filters.month)
          const [year, month] = filters.month.split('-')
          const monthNames = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
          ]
          setFilteredPeriod(`${monthNames[parseInt(month) - 1]} ${year}`)
        }
        url += `?${params.toString()}`
      } else {
        setFilteredPeriod("")
      }

      const response = await fetch(url)
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
        setApplications(data.applications || [])
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const updateApplication = async (id: string, updateData: Partial<Application>, token: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updateData, editToken: token }),
      })

      const data = await response.json()
      if (data.success) {
        // Refrescar los datos después de actualizar
        fetchData()
      } else {
        alert('Error al actualizar el trámite: ' + data.error)
      }
    } catch (error) {
      console.error("Error updating application:", error)
      alert('Error al actualizar el trámite')
    }
  }

  const deleteApplication = async (id: string, token: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ editToken: token }),
      })

      const data = await response.json()
      if (data.success) {
        // Refrescar los datos después de eliminar
        fetchData()
      } else {
        alert('Error al eliminar el trámite: ' + data.error)
      }
    } catch (error) {
      console.error("Error deleting application:", error)
      alert('Error al eliminar el trámite')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-slate-800 mb-2">
            Ciudadanía Española - Ley de Nietos
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto font-poppins">
            Compartamos información sobre los tiempos de procesamiento de la ciudadanía española para ayudarnos mutuamente en este proceso.
          </p>
        </div>

        {/* Filtros de fecha */}
        <div className="animate-slide-up animate-delay-100">
          <DateFilters 
            onFilterChange={fetchData}
            onClearFilters={() => fetchData()}
          />
        </div>

        {/* Stats Header */}
        <div className="text-center mb-6 animate-slide-up animate-delay-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 font-poppins">
            Estadísticas {filteredPeriod && <span className="text-blue-600">({filteredPeriod})</span>}
          </h2>
          <p className="text-slate-600 font-poppins">
            {filteredPeriod 
              ? `Datos filtrados para el período seleccionado`
              : "Datos generales de todos los trámites registrados"
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 animate-slide-up animate-delay-300">
          <div className="animate-scale-in">
            <StatsCard
              title="Total"
              value={stats.total}
              description="Trámites registrados"
              icon={<IconWrapper color="blue"><Users className="h-4 w-4" /></IconWrapper>}
            />
          </div>
          <div className="animate-scale-in animate-delay-100">
            <StatsCard
              title="En espera"
              value={stats.enEspera}
              description="Esperando resolución"
              icon={<IconWrapper color="amber"><Clock className="h-4 w-4" /></IconWrapper>}
            />
          </div>
          <div className="animate-scale-in animate-delay-200">
            <StatsCard
              title="Resueltos"
              value={stats.resueltos}
              description="Con resolución recibida"
              icon={<IconWrapper color="green"><CheckCircle className="h-4 w-4" /></IconWrapper>}
            />
          </div>
          <div className="animate-scale-in animate-delay-300">
            <StatsCard
              title="Con confirmación"
              value={stats.conConfirmacion}
              description="Recibieron mail"
              icon={<IconWrapper color="pink"><Mail className="h-4 w-4" /></IconWrapper>}
            />
          </div>
          <div className="animate-scale-in animate-delay-300">
            <StatsCard
              title="Doc. adicional"
              value={stats.conDocumentacionAdicional}
              description="Requirieron más documentos"
              icon={<IconWrapper color="amber"><FileText className="h-4 w-4" /></IconWrapper>}
            />
          </div>
        </div>

        {/* Form */}
        <div className="animate-slide-up animate-delay-300">
          <ApplicationForm onSubmit={() => fetchData()} />
        </div>

        {/* Applications List */}
        <div className="mt-8 animate-slide-up animate-delay-300">
          <ApplicationsList 
            applications={applications}
            onUpdate={updateApplication}
            onDelete={deleteApplication}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-slate-500 animate-fade-in animate-delay-300">
          <p className="font-poppins">
            Esta plataforma es una iniciativa comunitaria para compartir información sobre los tiempos de procesamiento
            de la ciudadanía española.
          </p>
          <p className="mt-2 font-poppins">Los datos son proporcionados voluntariamente por la comunidad argentina.</p>
        </div>
      </div>
    </div>
  )
}
