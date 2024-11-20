import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Home, CheckSquare, Calendar, Settings, LogOut } from 'lucide-react'
import LogoutButton from './components/logoutButton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - made narrower */}
      <aside className="w-48 bg-white border-r border-gray-200 fixed h-screen">
        <div className="flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md group transition-colors"
                >
                  <Home className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  <span className="group-hover:text-blue-600">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard/tasks" 
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md group transition-colors"
                >
                  <CheckSquare className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  <span className="group-hover:text-blue-600">Tasks</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard/calendar" 
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md group transition-colors"
                >
                  <Calendar className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  <span className="group-hover:text-blue-600">Calendar</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="p-2 border-t">
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/dashboard/settings" 
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md group transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  <span className="group-hover:text-blue-600">Settings</span>
                </Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content - adjusted margin */}
      <main className="flex-1 ml-48">
        {children}
      </main>
    </div>
  )
} 