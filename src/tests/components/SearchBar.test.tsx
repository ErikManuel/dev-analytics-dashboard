import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchBar } from '@/components/search/SearchBar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('SearchBar', () => {
  it('should render search input', () => {
    render(<SearchBar onSearch={() => {}} />, { wrapper: createWrapper() })
    expect(screen.getByPlaceholderText(/Buscar usuario de GitHub/i)).toBeDefined()
  })

  it('should call onSearch when form is submitted', async () => {
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />, { wrapper: createWrapper() })

    const input = screen.getByPlaceholderText(/Buscar usuario de GitHub/i)
    fireEvent.change(input, { target: { value: 'testuser' } })
    fireEvent.submit(input.closest('form')!)

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('testuser')
    })
  })
})