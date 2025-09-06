import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

interface StatsCardProps {
  title: string
  value: number
  description?: string
  icon?: React.ReactNode
}

export function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <Card className="bg-white/30 border-white/20 backdrop-blur-lg animate-scale-in hover:bg-white/40 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 font-poppins">{title}</CardTitle>
        {icon && <div className="text-blue-500">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-800 font-poppins">{value}</div>
        {description && <p className="text-xs text-slate-500 mt-1 font-poppins">{description}</p>}
      </CardContent>
    </Card>
  )
}
