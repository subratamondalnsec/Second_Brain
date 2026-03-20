"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react"
import { User, SignupPayload, LoginPayload, AuthResponse } from "@/types/auth"
import api from "@/lib/api"
import { saveAuth, getUser, clearAuth } from "@/lib/auth"
import { extractErrorMessage } from "@/lib/utils"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
  signup: (payload: SignupPayload) => Promise<void>
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isAuthenticated = user !== null

  useEffect(() => {
    const storedUser = getUser()
    if (storedUser) {
      setUser(storedUser)
    }
    setIsLoading(false)
  }, [])

  const signup = useCallback(async (payload: SignupPayload) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await api.post<AuthResponse>("/auth/signup", payload)
      if (data.token && data.user) {
        saveAuth(data.token, data.user)
        setUser(data.user)
      }
    } catch (err) {
      setError(extractErrorMessage(err, "Signup failed. Please try again."))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", payload)
      if (data.token && data.user) {
        saveAuth(data.token, data.user)
        setUser(data.user)
      }
    } catch (err) {
      setError(extractErrorMessage(err, "Invalid email or password."))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    clearAuth()
    setUser(null)
    window.location.href = "/login"
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        error,
        signup,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
