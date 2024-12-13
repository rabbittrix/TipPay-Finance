'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/services/api'

interface User {
  id: string
  email: string
  fullName: string
  businessName: string
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  register: (userData: RegisterData) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  fullName: string
  businessName: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (token) {
        // Verify token and get user data
        const userData = await authApi.getProfile()
        setUser(userData)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { token, user } = await authApi.login(email, password)
      localStorage.setItem('auth_token', token)
      setUser(user)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await authApi.logout()
      localStorage.removeItem('auth_token')
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      const { token, user } = await authApi.register(userData)
      localStorage.setItem('auth_token', token)
      setUser(user)
      router.push('/dashboard')
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 