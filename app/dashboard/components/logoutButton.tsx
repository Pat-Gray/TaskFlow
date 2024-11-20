'use client'

import { LogOut } from 'lucide-react'
import { signOutAction } from '@/app/actions'
import { useState } from 'react'

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <form action={async () => {
      setIsLoading(true)
      await signOutAction()
    }}>
      <button 
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md group transition-colors"
      >
        <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
        <span className="group-hover:text-red-600">
          {isLoading ? 'Signing out...' : 'Logout'}
        </span>
      </button>
    </form>
  )
}