'use client'

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { revalidateDashboard } from "@/app/actions/revalidate"
import { CheckCircle, Circle } from "lucide-react" // Add this import

export default function MarkCompleted({ task }: { task: Task }) {
  const [isCompleted, setIsCompleted] = useState(task.status === 'completed')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleMarkCompleted = async () => {
    setIsLoading(true)
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('tasks')
      .update({ status: 'completed' })
      .eq('id', task.id)

    if (error) {
      console.error("Error updating task:", error)
      setError(error.message)
    } else {
      console.log("Task updated successfully:", data)
      setIsCompleted(true)
      setError(null)
      await revalidateDashboard()
    }
    setIsLoading(false)
  }

  return (
    <div className="inline-flex flex-col items-center">
      <Button
        onClick={handleMarkCompleted}
        disabled={isCompleted || isLoading}
        variant="ghost"
        className={`
          px-4 py-2 transition-all duration-200
          ${isCompleted 
            ? 'bg-green-50 text-green-600 hover:bg-green-100' 
            : 'hover:bg-gray-100 text-gray-700'}
          ${isLoading ? 'opacity-50 cursor-wait' : ''}
        `}
      >
        <span className="flex items-center gap-2">
          {isCompleted ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Circle className="w-4 h-4" />
          )}
          {isLoading ? "Updating..." : isCompleted ? "Completed" : "Mark Complete"}
        </span>
      </Button>
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}