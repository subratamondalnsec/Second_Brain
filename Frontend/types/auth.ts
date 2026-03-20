export interface User {
  _id: string
  fullName: string
  email: string
  isActive: boolean
  createdAt: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: User
}

export interface SignupPayload {
  fullName: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface ApiError {
  success: false
  message: string
}
