'use client'

import { LogOut } from 'lucide-react'

interface SignOutButtonProps {
  className?: string
  onSignOut?: () => void
}

export default function SignOutButton({ className = '', onSignOut }: SignOutButtonProps) {
  const handleSignOut = async () => {
    try {
      // Add your sign out logic here
      // Example: await signOut()
      if (onSignOut) {
        onSignOut()
      }
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <button
      onClick={handleSignOut}
      className={`flex items-center gap-2 px-4 py-2 text-[#666666] hover:text-[#333333] transition-colors ${className}`}
    >
      <LogOut className="w-5 h-5" />
      <span>Sign Out</span>
    </button>
  )
} 