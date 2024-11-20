'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { revalidateDashboard } from "@/app/actions/revalidate"

export default  function AddNewTask({ user }: { user: User }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [formCompleted, setFormCompleted] = useState(false)

  const supabase = createClient()

  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          title,
          description,
          due_date: date,
          status: 'pending',
          user_id: user.id
        },
      ])

    if (error) {
      console.error("Error creating task:", error)
    } else {
      console.log("Task created successfully:", data)
      // Optionally, reset the form here
      setTitle("")
      setDescription("")
      setDate(new Date())
      setFormCompleted(true)
      await revalidateDashboard()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:opacity-90 transition-all duration-200 font-medium"
        >
          <span className="mr-2">Add New Task</span>
          <span className="text-xl">📝</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add New Task
          </DialogTitle>
        </DialogHeader>
        {formCompleted && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <p className="font-medium">Task added successfully!</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right text-sm font-medium text-gray-600">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter task title"
                className="col-span-3 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-sm font-medium text-gray-600">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Enter task description"
                className="col-span-3 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="block text-sm font-medium text-gray-600 mb-2">
                Due Date
              </Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-gray-200 p-3 w-full"
                classNames={{
                  head_cell: "text-gray-500 font-medium",
                  cell: "h-9 w-9 text-center text-sm p-0 relative",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                  day_selected: "bg-blue-500 text-white hover:bg-blue-600",
                  day_today: "bg-gray-100",
                }}
              />
            </div>
          </div>
          <DialogFooter className="pt-4 border-t">
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-2 rounded-md hover:opacity-90 transition-all duration-200"
            >
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
