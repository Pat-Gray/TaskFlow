'use client'

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { revalidateDashboard } from "@/app/actions/revalidate"
import { CheckCircle, Circle, Loader2 } from "lucide-react"
import { Task } from "@/types/Types"


export default function MarkCompleted({ task }: { task: Task }) {
  const [isCompleted, setIsCompleted] = useState(task.status === 'completed')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleMarkCompleted = async () => {
    setIsLoading(true)
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('tasks')
      .update({ status: 'completed' })
      .eq('id', task.id)

    if (error) {
      setError(error.message)
    } else {
      setIsCompleted(true)
      setError(null)
      await revalidateDashboard()
    }
    setIsLoading(false)
  }

  if (isCompleted) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-full">
        <CheckCircle className="w-4 h-4" />
        Completed
      </div>
    )
  }

  return (
    <div className="inline-flex flex-col items-start">
      <Button
        onClick={handleMarkCompleted}
        disabled={isLoading}
        size="sm"
        className="relative group hover:bg-emerald-50 text-emerald-600 border-emerald-200 hover:border-emerald-300"
        variant="outline"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Circle className="w-4 h-4 mr-2 group-hover:hidden" />
        )}
        <CheckCircle className="w-4 h-4 mr-2 hidden group-hover:block" />
        {isLoading ? "Completing..." : "Complete Task"}
      </Button>
      {error && (
        <div className="mt-2 text-sm text-red-500 bg-red-50 px-3 py-1 rounded-md flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
          {error}
        </div>
      )}
    </div>
  )
}