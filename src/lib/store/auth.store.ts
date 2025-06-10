import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getToken, setToken as setTokenCookie, removeToken } from '../services/token.service'
import type { User } from '@/types/auth.types'

interface AuthState {
  user: Omit<User, "password" | "tokenVersion"> | null
  isAuthenticated: boolean
  token: string | null
  setUser: (user: Omit<User, "password" | "tokenVersion">) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: getToken() || null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => {
        if (token) {
          setTokenCookie(token)
        } else {
          removeToken()
        }
        set({ token })
      },
      logout: () => {
        removeToken()
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
) 