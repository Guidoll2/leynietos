import React from "react"
import { ExternalLink, Linkedin, Mail } from "lucide-react"

function IconCircle({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <span
      className="icon-bg"
      style={{ backgroundColor: `hsl(var(${bg}))`, color: "hsl(var(--primary-foreground))" }}
    >
      {children}
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-6">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center space-x-3">
          <div>© {new Date().getFullYear()} Guido Llaurado</div>
        </div>

        <div className="flex items-center space-x-4 mt-3 md:mt-0">
          <a
            href="https://guidollaurado.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:underline"
          >
            <IconCircle bg="--pastel-blue">
              <ExternalLink size={14} />
            </IconCircle>
            <span className="text-primary">guidollaurado.vercel.app</span>
          </a>

          <a
            href="https://www.linkedin.com/in/guido-llaurado-381316118/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:underline"
          >
            <IconCircle bg="--pastel-amber">
              <Linkedin size={14} />
            </IconCircle>
            <span className="text-primary">LinkedIn</span>
          </a>

          <a href="mailto:guido.llaurado@gmail.com" className="flex items-center space-x-2 hover:underline">
            <IconCircle bg="--pastel-pink">
              <Mail size={14} />
            </IconCircle>
            <span className="text-primary">guido.llaurado@gmail.com</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
