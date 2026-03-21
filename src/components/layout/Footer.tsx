'use client'

import { Github, Star, Info, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Instrucciones de uso */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-primary-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              📖 Instrucciones de uso
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold">1</span>
              <p className="text-gray-600 dark:text-gray-400">
                Busca cualquier usuario de GitHub en el campo de búsqueda
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold">2</span>
              <p className="text-gray-600 dark:text-gray-400">
                Selecciona un usuario de las sugerencias o presiona Enter
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold">3</span>
              <p className="text-gray-600 dark:text-gray-400">
                Explora el perfil, repositorios y estadísticas del desarrollador
              </p>
            </div>
          </div>
        </div>

        {/* Firma y créditos */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">DA</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Desarrollado con{' '}
                <span className="text-red-500 animate-pulse">❤️</span>{' '}
                por <span className="font-semibold text-primary-600 dark:text-primary-400">Erik Manuel </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Dev Analytics Dashboard &copy; {currentYear} - GitHub Developer Analytics
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
              {mounted && (
                <>
                  {theme === 'dark' ? (
                    <Moon className="w-3.5 h-3.5 text-primary-500" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-yellow-500" />
                  )}
                  <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                    {theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
                  </span>
                </>
              )}
            </div>
            <a
              href="https://github.com/ErikManuel/dev-analytics-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://github.com/ErikManuel/dev-analytics-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Star en GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}