'use client'

import { useState } from 'react'
import { SearchBar } from '@/components/search/SearchBar'
import { UserProfile } from '@/components/dashboard/UserProfile'
import { RepoList } from '@/components/dashboard/RepoList'
import { LanguageChart } from '@/components/dashboard/LanguageChart'
import { PopularReposChart } from '@/components/dashboard/PopularReposChart'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { useGithubUser } from '@/hooks/useGithubUser'
import { useGithubRepos } from '@/hooks/useGithubRepos'
import { Card } from '@/components/common/Card'
import { Skeleton } from '@/components/common/Skeleton'

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null)

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useGithubUser(username)

  const {
    data: repos,
    isLoading: isLoadingRepos,
    error: reposError,
  } = useGithubRepos(username)

  const handleSearch = (searchUsername: string) => {
    setUsername(searchUsername)
  }

  if (userError || reposError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Error al cargar datos
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {userError?.message || reposError?.message || 'No se pudo encontrar el usuario'}
          </p>
          <button
            onClick={() => setUsername(null)}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="max-w-md mx-auto">
        <SearchBar onSearch={handleSearch} isLoading={isLoadingUser} />
      </div>

      {username && (
        <div className="space-y-8 animate-fade-in">
          {isLoadingUser ? (
            <Skeleton className="h-64 rounded-2xl" />
          ) : (
            user && <UserProfile user={user} />
          )}

          {user && (
            <StatsCards
              followers={user.followers}
              following={user.following}
              publicRepos={user.public_repos}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoadingRepos ? (
              <>
                <Skeleton className="h-96 rounded-2xl" />
                <Skeleton className="h-96 rounded-2xl" />
              </>
            ) : (
              repos && (
                <>
                  <LanguageChart repos={repos} />
                  <PopularReposChart repos={repos} />
                </>
              )
            )}
          </div>

          <RepoList repos={repos || []} isLoading={isLoadingRepos} />
        </div>
      )}

      {!username && (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-8xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-4">
            Dev Analytics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 max-w-md mx-auto">
            Explora estadísticas, repositorios y métricas de cualquier desarrollador de GitHub
          </p>
          
          <div className="max-w-lg mx-auto mt-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl text-left">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🎯 ¿Cómo empezar?
            </p>
            <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
              <li>Escribe el nombre de usuario de GitHub</li>
              <li>Selecciona de las sugerencias o presiona Enter</li>
              <li>Explora el perfil, gráficas y repositorios</li>
            </ol>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              💡 Tip: Prueba con "vercel", "nextjs", "tailwindlabs" o "facebook"
            </p>
          </div>
        </div>
      )}
    </div>
  )
}