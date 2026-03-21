'use client'

import { useState } from 'react'
import { SearchBar } from '@/components/search/SearchBar'
import { useGithubUser } from '@/hooks/useGithubUser'
import { useGithubRepos } from '@/hooks/useGithubRepos'
import { Card } from '@/components/common/Card'
import { Skeleton } from '@/components/common/Skeleton'
import { formatNumber, formatDate } from '@/utils/formatters'
import { calculateLanguageStats, calculateRepoStats } from '@/utils/analytics'
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, AreaChart, Area
} from 'recharts'
import { Calendar, TrendingUp, Code2, Users, Star, GitFork } from 'lucide-react'

const COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec489a', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
]

export default function StatsPage() {
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

  const languageStats = repos ? calculateLanguageStats(repos) : {}
  const repoStats = repos ? calculateRepoStats(repos) : null
  
  const languageData = Object.entries(languageStats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)

  // Datos para gráfico de actividad (simulado con repositorios ordenados por fecha)
  const activityData = repos
    ? [...repos]
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .slice(-7)
        .map(repo => ({
          name: repo.name.length > 10 ? repo.name.slice(0, 8) + '...' : repo.name,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        }))
    : []

  if (userError || reposError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center max-w-md">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Error al cargar estadísticas
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
          {/* Header */}
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
                    Estadísticas de {user.name || user.login}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Miembro desde {formatDate(user.created_at)}
                  </p>
                </div>
              </div>
            )
          )}

          {/* Métricas principales */}
          {user && !isLoadingUser && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(user.followers)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Seguidores</p>
              </Card>
              <Card className="p-4 text-center">
                <Code2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.public_repos}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Repositorios</p>
              </Card>
              <Card className="p-4 text-center">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {repoStats ? formatNumber(repoStats.totalStars) : '0'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Stars</p>
              </Card>
              <Card className="p-4 text-center">
                <GitFork className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {repoStats ? formatNumber(repoStats.totalForks) : '0'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Forks</p>
              </Card>
            </div>
          )}

          {/* Gráfico de lenguajes */}
          {!isLoadingRepos && languageData.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Distribución de Lenguajes
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {languageData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {/* Gráfico de actividad */}
          {!isLoadingRepos && activityData.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Actividad Reciente
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                      }}
                    />
                    <Area type="monotone" dataKey="stars" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="forks" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {/* Top repositorios */}
          {repoStats?.mostStarred && !isLoadingRepos && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  ⭐ Repositorio más destacado
                </h3>
                <a
                  href={repoStats.mostStarred.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors"
                >
                  <p className="font-medium text-primary-600 dark:text-primary-400 text-lg">
                    {repoStats.mostStarred.name}
                  </p>
                  {repoStats.mostStarred.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {repoStats.mostStarred.description}
                    </p>
                  )}
                  <div className="flex gap-4 mt-3 text-sm">
                    <span>⭐ {formatNumber(repoStats.mostStarred.stargazers_count)}</span>
                    <span>🍴 {formatNumber(repoStats.mostStarred.forks_count)}</span>
                    {repoStats.mostStarred.language && (
                      <span>💻 {repoStats.mostStarred.language}</span>
                    )}
                  </div>
                </a>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  📈 Estadísticas generales
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Promedio de Stars por repo</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {formatNumber(Math.round(repoStats.averageStars))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Ratio Stars/Forks</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {(repoStats.totalStars / (repoStats.totalForks || 1)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Watchers</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {formatNumber(repoStats.totalWatchers)}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {!isLoadingRepos && languageData.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No hay datos de estadísticas disponibles para este usuario
              </p>
            </Card>
          )}
        </div>
      )}

      {!username && (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Análisis Detallado
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Busca un usuario para ver estadísticas completas, gráficas y métricas de su actividad
          </p>
        </div>
      )}
    </div>
  )
}