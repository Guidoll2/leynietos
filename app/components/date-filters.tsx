"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card } from "./ui/card"
import { Calendar, Filter, X } from "lucide-react"
import { IconWrapper } from "./ui/icon"

interface DateFiltersProps {
  onFilterChange: (filters: {
    startDate?: string
    endDate?: string
    month?: string
  }) => void
  onClearFilters: () => void
}

export function DateFilters({ onFilterChange, onClearFilters }: DateFiltersProps) {
  const [filterType, setFilterType] = useState<'range' | 'month'>('range')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [month, setMonth] = useState('')

  const handleApplyFilters = () => {
    if (filterType === 'range' && startDate && endDate) {
      onFilterChange({ startDate, endDate })
    } else if (filterType === 'month' && month) {
      onFilterChange({ month })
    }
  }

  const handleClearFilters = () => {
    setStartDate('')
    setEndDate('')
    setMonth('')
    onClearFilters()
  }

  const getCurrentMonth = () => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  const getLastMonth = () => {
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1)
    return `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`
  }

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="text-primary h-5 w-5" />
        <h3 className="text-lg font-semibold">Filtrar por fecha de trámite</h3>
      </div>

      <div className="space-y-4">
        {/* Selector de tipo de filtro */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="filterType"
              value="range"
              checked={filterType === 'range'}
              onChange={(e) => setFilterType(e.target.value as 'range')}
              className="text-primary"
            />
            <span>Rango de fechas</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="filterType"
              value="month"
              checked={filterType === 'month'}
              onChange={(e) => setFilterType(e.target.value as 'month')}
              className="text-primary"
            />
            <span>Por mes</span>
          </label>
        </div>

        {/* Filtro por rango */}
        {filterType === 'range' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Fecha inicio</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Fecha fin</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
              />
            </div>
          </div>
        )}

        {/* Filtro por mes */}
        {filterType === 'month' && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="month">Seleccionar mes</Label>
              <Input
                id="month"
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
            
            {/* Botones rápidos */}
            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMonth(getCurrentMonth())}
              >
                Este mes
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMonth(getLastMonth())}
              >
                Mes pasado
              </Button>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-2">
          <Button
            onClick={handleApplyFilters}
            disabled={
              (filterType === 'range' && (!startDate || !endDate)) ||
              (filterType === 'month' && !month)
            }
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Aplicar filtros
          </Button>
          <Button
            onClick={handleClearFilters}
            variant="outline"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Limpiar filtros
          </Button>
        </div>
      </div>
    </Card>
  )
}
