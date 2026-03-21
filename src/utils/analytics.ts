import { GitHubRepo, LanguageStats, RepoStats } from '@/types/github'

export const calculateLanguageStats = (repos: GitHubRepo[]): LanguageStats => {
  return repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1
    }
    return acc
  }, {} as LanguageStats)
}

export const calculateRepoStats = (repos: GitHubRepo[]): RepoStats => {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)
  const totalWatchers = repos.reduce((sum, repo) => sum + repo.watchers_count, 0)

  const sortedByStars = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)
  const sortedByForks = [...repos].sort((a, b) => b.forks_count - a.forks_count)

  return {
    totalStars,
    totalForks,
    totalWatchers,
    averageStars: repos.length ? totalStars / repos.length : 0,
    mostStarred: sortedByStars[0] || null,
    mostForked: sortedByForks[0] || null,
  }
}