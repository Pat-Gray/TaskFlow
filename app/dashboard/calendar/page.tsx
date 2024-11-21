'use client'

import { Calendar } from '@/components/ui/calendar'
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import EditTask from '../components/editTask'
import MarkCompleted from '../components/markCompleted'
import DeleteButton from '../components/deleteButton'
import { User } from '@supabase/supabase-js'
import { Task } from '@/types/Types'

export default function CalendarPage() {
  const supabase = createClient()
  const [user, setUser] =  useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]> ([])
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  })

  // Handle user authentication
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        redirect("/sign-in")
      }
      setUser(user)
    }
    getUser()
  }, [])

  // Fetch tasks when date range changes
  useEffect(() => {
    const fetchTasks = async () => {
      if (date?.from && date?.to) {
        const { data } = await supabase
          .from('tasks')
          .select()
          .gte('due_date', date.from.toISOString())
          .lte('due_date', date.to.toISOString())
        console.log(data)
        setTasks(data || [])
      }
    }
    fetchTasks()
  }, [date])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Calendar View
      </h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Calendar column (1fr) */}
        <div className="md:col-span-1 flex flex-col items-center">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            className="rounded-md border  p-3 shadow-sm"
            style={{ '--day-size': '40px' } as React.CSSProperties}
          />
        </div>

        {/* Tasks column (2fr) */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            {date?.from && date?.to
              ? `Tasks from ${date.from.toLocaleDateString()} to ${date.to.toLocaleDateString()}`
              : 'Select a date range'}
          </h2>
          {tasks.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center border shadow-sm">
              <p className="text-gray-500">No tasks found for selected dates</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`
                      px-3 py-1 rounded-full font-medium
                      ${task.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'}
                    `}>
                      {task.status}
                    </span>
                    <span className="text-gray-400">
                      Due Date: {new Date(task.due_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    {user && <EditTask task={task} user={user}/>}
                    <MarkCompleted task={task}/>
                    <DeleteButton task={task}/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

