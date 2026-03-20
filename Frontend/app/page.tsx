"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/hooks/useAuth"

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/dashboard")
      } else {
        router.replace("/login")
      }
    }
  }, [isAuthenticated, isLoading, router])

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🧠</div>
        <p className="text-gray-400 text-sm">Loading Second Brain...</p>
      </div>
    </div>
  )
}
