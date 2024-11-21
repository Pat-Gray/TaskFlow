'use client'
  
  import {useEffect } from 'react'
  import { Task } from '@/types/Types'

  export default function DashboardComponents({tasks}: {tasks: Task[]}){

  const statsForDateRange = () => {
    if (!tasks.length) return { completion: 0, onTime: 0, upcoming: 0 }
    
    const completedTasks = tasks.filter(task => task.status === 'completed').length
    const completionRate = Math.round((completedTasks / tasks.length) * 100)
    
    const now = new Date()
    const onTimeTasks = tasks.filter(task => {
      const dueDate = new Date(task.due_date)
      return task.status === 'completed' && dueDate >= now
    }).length
    const onTimeRate = Math.round((onTimeTasks / completedTasks) * 100) || 0
    
    const upcomingTasks = tasks.filter(task => {
      const dueDate = new Date(task.due_date)
      const threeDaysFromNow = new Date(now.setDate(now.getDate() + 3))
      return dueDate <= threeDaysFromNow && task.status !== 'completed'
    }).length

    return { completion: completionRate, onTime: onTimeRate, upcoming: upcomingTasks }
  }

useEffect(() => {
  statsForDateRange()
}, [tasks])
 

return (
 
 
<div className="md:col-span-2">
  <div className="grid grid-cols-3 gap-4 mb-6">
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="text-2xl font-bold text-blue-600">
        {statsForDateRange().completion}%
      </div>
      <div className="text-sm text-gray-600">Completion Rate</div>
    </div>
    
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="text-2xl font-bold text-green-600">
        {statsForDateRange().onTime}%
      </div>
      <div className="text-sm text-gray-600">On-Time Completion</div>
    </div>
    
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="text-2xl font-bold text-yellow-600">
        {statsForDateRange().upcoming}
      </div>
      <div className="text-sm text-gray-600">Due in 3 Days</div>
    </div>
 </div>
 </div>
)
 }