import { useQuery } from '@tanstack/react-query'
import { githubService } from '@/services/github.service'
import { QUERY_KEYS, STALE_TIMES } from '@/config/constants'

export function useGithubRepos(username: string | null) {
  return useQuery({
    queryKey: [QUERY_KEYS.REPOS, username],
    queryFn: () => {
      if (!username || username.trim().length === 0) {
        throw new Error('Username is required')
      }
      return githubService.getUserRepos(username)
    },
    enabled: !!username && username.trim().length > 0,
    retry: false,
    staleTime: STALE_TIMES.REPOS,
  })
}