import React from "react"
import { ExternalLink, Linkedin, Mail, Code, Zap, Users, Globe, Shield } from "lucide-react"

// Icon container with strong contrast for light backgrounds
function IconCircle({
  children,
  bgClass = "bg-slate-100 border-slate-300",
  textClass = "text-slate-800",
}: {
  children: React.ReactNode
  bgClass?: string
  textClass?: string
}) {
  return (
    <span
      className={`inline-grid place-items-center w-10 h-10 rounded-full border ${bgClass} ${textClass} shadow-sm`}
      aria-hidden
    >
      {children}
    </span>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full mt-20 border-t border-slate-200 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Promo / Hero strip */}
        <section className="my-10">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-8 sm:p-10">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 text-white shadow-md">
                <Code size={28} />
              </div>

              <h3 className="text-3xl font-semibold tracking-tight text-slate-900 font-poppins">
                ¿Querés una web a tu medida?
              </h3>

              <p className="max-w-3xl text-lg leading-relaxed text-slate-700">
                Diseño y desarrollo <span className="font-semibold text-slate-900">sitios y aplicaciones web personalizadas</span> para
                <span className="font-semibold"> cualquier persona o proyecto</span>: portfolios, blogs, ONGs, artistas, tiendas y negocios.
                Prioridad en <span className="font-semibold">rendimiento</span>, <span className="font-semibold">accesibilidad</span> y <span className="font-semibold">experiencia de usuario</span>.
              </p>

              {/* Value chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-1">
                <div className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-800">
                  <Zap size={18} /> Desarrollo ágil
                </div>
                <div className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-800">
                  <Users size={18} /> UX centrada en personas
                </div>
                <div className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-800">
                  <Shield size={18} /> Código limpio y mantenible
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 mt-3">
                <span className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1">Next.js • TypeScript</span>
                <span className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1">SEO & rendimiento</span>
                <span className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1">Responsive • i18n</span>
              </div>

              <a
                href="mailto:guido.llaurado@gmail.com?subject=Quiero%20mi%20web%20a%20medida&body=Hola%20Guido%2C%20me%20gustar%C3%ADa%20contarte%20mi%20idea..."
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 sm:px-9 py-3 text-white font-semibold shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
              >
                <Mail size={18} /> ¡Hablemos de tu proyecto!
              </a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="my-6 border-slate-200" />

        {/* Footer base */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10">
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <span className="inline-flex items-center gap-2 font-medium">
              <Globe size={16} className="text-slate-600" /> {year} • Guido Llaurado — Desarrollador Web Full‑Stack
            </span>
          </div>

          {/* Social / Links with strong, brand-consistent colors */}
          <nav className="flex items-center gap-7 text-sm">
            <a
              href="https://guidollaurado.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
              aria-label="Abrir portfolio en una nueva pestaña"
            >
              <IconCircle bgClass="bg-slate-100 border-slate-300" textClass="text-slate-800">
                <ExternalLink size={18} />
              </IconCircle>
              <span className="text-slate-900 font-medium group-hover:underline underline-offset-4">Portfolio</span>
            </a>

            <a
              href="https://www.linkedin.com/in/guido-llaurado-381316118/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
              aria-label="Abrir LinkedIn en una nueva pestaña"
            >
              <IconCircle bgClass="bg-blue-50 border-blue-200" textClass="text-blue-700">
                <Linkedin size={18} />
              </IconCircle>
              <span className="text-blue-700 font-medium group-hover:underline underline-offset-4">LinkedIn</span>
            </a>

            <a
              href="mailto:guido.llaurado@gmail.com"
              className="group inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400"
              aria-label="Enviar un correo a Guido"
            >
              <IconCircle bgClass="bg-emerald-50 border-emerald-200" textClass="text-emerald-700">
                <Mail size={18} />
              </IconCircle>
              <span className="text-emerald-700 font-medium group-hover:underline underline-offset-4">Contacto</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
