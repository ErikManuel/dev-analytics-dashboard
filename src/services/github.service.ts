import { GitHubUser, GitHubRepo, GitHubSearchResponse } from '@/types/github'
import { GITHUB_API_BASE } from '@/config/constants'

class GitHubService {
  private async fetchWithError<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      }),
      ...options?.headers,
    }

    const response = await fetch(url, { ...options, headers })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Usuario no encontrado')
      }
      if (response.status === 403) {
        throw new Error('Límite de API alcanzado. Intenta más tarde.')
      }
      throw new Error(`Error: ${response.status}`)
    }

    return response.json()
  }

  async getUser(username: string): Promise<GitHubUser> {
    if (!username || username.trim().length === 0) {
      throw new Error('Username es requerido')
    }
    return this.fetchWithError(`${GITHUB_API_BASE}/users/${username.toLowerCase()}`)
  }

  async getUserRepos(username: string): Promise<GitHubRepo[]> {
    return this.fetchWithError(
      `${GITHUB_API_BASE}/users/${username.toLowerCase()}/repos?sort=updated&per_page=100&type=owner`
    )
  }

  async searchUsers(query: string): Promise<GitHubSearchResponse> {
    if (!query || query.trim().length < 2) {
      return { total_count: 0, incomplete_results: false, items: [] }
    }
    return this.fetchWithError(
      `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=5`
    )
  }
}

export const githubService = new GitHubService()