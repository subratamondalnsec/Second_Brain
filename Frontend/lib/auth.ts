import { User } from "@/types/auth"

export function saveAuth(token: string, user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem("sb_token", token)
  localStorage.setItem("sb_user", JSON.stringify(user))
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("sb_token")
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem("sb_user")
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function clearAuth(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("sb_token")
  localStorage.removeItem("sb_user")
}

export function isAuthenticated(): boolean {
  return getToken() !== null
}
