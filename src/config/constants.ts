export const GITHUB_API_BASE = 'https://api.github.com'

export const QUERY_KEYS = {
  USER: 'github-user',
  REPOS: 'github-repos',
} as const

export const STALE_TIMES = {
  USER: 5 * 60 * 1000, // 5 minutes
  REPOS: 5 * 60 * 1000, // 5 minutes
} as const