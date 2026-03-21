'use client'

import { useState } from 'react'
import { SearchBar } from '@/components/search/SearchBar'
import { RepoList } from '@/components/dashboard/RepoList'
import { useGithubUser } from '@/hooks/useGithubUser'
import { useGithubRepos } from '@/hooks/useGithubRepos'
import { Card } from '@/components/common/Card'
import { Skeleton } from '@/components/common/Skeleton'
import { formatNumber } from '@/utils/formatters'
import { calculateRepoStats } from '@/utils/analytics'
import { GitFork, Star, Eye, ArrowUp } from 'lucide-react'

export default function ReposPage() {
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

  const stats = repos ? calculateRepoStats(repos) : null

  if (userError || reposError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center max-w-md">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Error al cargar repositorios
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
          {/* Header con info del usuario */}
          {isLoadingUser ? (
            <Skeleton className="h-32 rounded-2xl" />
          ) : (
            user && (
              <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full ring-2 ring-primary-500/20"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Repositorios de {user.name || user.login}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    @{user.login} • {user.public_repos} repositorios públicos
                  </p>
                </div>
              </div>
            )
          )}

          {/* Estadísticas de repositorios */}
          {stats && !isLoadingRepos && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Stars</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(stats.totalStars)}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Forks</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(stats.totalForks)}
                    </p>
                  </div>
                  <GitFork className="w-8 h-8 text-blue-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Watchers</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(stats.totalWatchers)}
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-green-500" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Promedio Stars</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(Math.round(stats.averageStars))}
                    </p>
                  </div>
                  <ArrowUp className="w-8 h-8 text-purple-500" />
                </div>
              </Card>
            </div>
          )}

          {/* Top repositorios destacados */}
          {stats?.mostStarred && !isLoadingRepos && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ⭐ Más estrellado
                </h3>
                <a
                  href={stats.mostStarred.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors"
                >
                  <p className="font-medium text-primary-600 dark:text-primary-400">
                    {stats.mostStarred.name}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>⭐ {formatNumber(stats.mostStarred.stargazers_count)}</span>
                    <span>🍴 {formatNumber(stats.mostStarred.forks_count)}</span>
                  </div>
                </a>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  🍴 Más forkeado
                </h3>
                <a
                  href={stats.mostForked?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors"
                >
                  <p className="font-medium text-primary-600 dark:text-primary-400">
                    {stats.mostForked?.name}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>⭐ {formatNumber(stats.mostForked?.stargazers_count || 0)}</span>
                    <span>🍴 {formatNumber(stats.mostForked?.forks_count || 0)}</span>
                  </div>
                </a>
              </Card>
            </div>
          )}

          {/* Lista completa de repositorios */}
          <RepoList repos={repos || []} isLoading={isLoadingRepos} />
        </div>
      )}

      {!username && (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-6xl mb-4">📁</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Explora Repositorios
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Busca un usuario para ver todos sus repositorios y estadísticas
          </p>
        </div>
      )}
    </div>
  )
}