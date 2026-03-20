"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/hooks/useAuth"
import { formatDate, getInitials } from "@/lib/utils"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🧠</div>
          <p className="text-gray-400 text-sm">Loading your brain...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* ── NAVBAR ── */}
      <nav className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <span className="text-white font-semibold">Second Brain</span>
          </div>

          {/* Right: Avatar + name + logout */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-medium text-white">
              {getInitials(user.fullName)}
            </div>
            <span className="text-gray-300 text-sm hidden sm:block">{user.fullName}</span>
            <button
              onClick={logout}
              className="text-sm text-rose-400 hover:text-rose-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* 1. Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-white">
            Good to see you, {user.fullName.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-400 mt-2">
            Your second brain is ready. Start capturing memories.
          </p>
        </div>

        {/* 2. Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="card">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-3xl font-bold text-white">0</div>
            <div className="text-gray-400 text-sm mt-1">Tasks captured</div>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">💡</div>
            <div className="text-3xl font-bold text-white">0</div>
            <div className="text-gray-400 text-sm mt-1">Notes saved</div>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-3xl font-bold text-white">0</div>
            <div className="text-gray-400 text-sm mt-1">Events logged</div>
          </div>
        </div>

        {/* 3. Quick Actions */}
        <div className="mb-10">
          <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              disabled
              title="Coming soon"
              className="btn-primary opacity-50 cursor-not-allowed sm:w-auto px-6 flex items-center justify-center gap-2"
            >
              <span>🎤</span> Start Recording
            </button>
            <button
              disabled
              title="Coming soon"
              className="btn-secondary sm:w-auto px-6 flex items-center justify-center gap-2"
            >
              <span>🔍</span> Search Memory
            </button>
          </div>
          <p className="text-gray-600 text-xs mt-3">
            Voice capture and search are coming in the next phase.
          </p>
        </div>

        {/* 4. Account Card */}
        <div className="card">
          <h2 className="text-lg font-medium text-white mb-6">Account Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Email</span>
              <span className="text-white text-sm">{user.email}</span>
            </div>

            <hr className="border-gray-800" />

            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Member since</span>
              <span className="text-white text-sm">{formatDate(user.createdAt)}</span>
            </div>

            <hr className="border-gray-800" />

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Account status</span>
              <span className="inline-flex items-center gap-1.5 bg-green-950 text-green-400 border border-green-800 text-xs px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                Active
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
