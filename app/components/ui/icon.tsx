import * as React from "react"

export type IconColor = "amber" | "blue" | "green" | "pink" | "yellow"
export type IconSize = "sm" | "md" | "lg"

interface IconWrapperProps {
  children?: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  color?: IconColor
  size?: IconSize
  className?: string
}

export function IconWrapper({ children, icon: Icon, color = "amber", size = "md", className = "" }: IconWrapperProps) {
  const bg = {
    amber: "bg-[color:rgb(var(--pastel-amber)/0.18)]",
    blue: "bg-[color:rgb(var(--pastel-blue)/0.18)]",
    green: "bg-[color:rgb(var(--pastel-green)/0.18)]",
    pink: "bg-[color:rgb(var(--pastel-pink)/0.18)]",
    yellow: "bg-[color:rgb(var(--pastel-amber)/0.18)]", // Usar amber para yellow
  }[color]

  const stroke = {
    amber: "text-[color:rgb(var(--primary))]",
    blue: "text-[color:rgb(var(--chart-4))]",
    green: "text-[color:rgb(var(--chart-3))]",
    pink: "text-[color:rgb(var(--chart-5))]",
    yellow: "text-[color:rgb(var(--primary))]", // Usar primary para yellow
  }[color]

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-8 h-8"
  }[size]

  const iconClasses = `${sizeClasses} ${stroke} ${className}`

  return (
    <span className={`icon-bg ${bg} ${stroke} p-0.5 inline-flex items-center justify-center rounded`}>
      {Icon ? <Icon className={iconClasses} /> : children}
    </span>
  )
}
