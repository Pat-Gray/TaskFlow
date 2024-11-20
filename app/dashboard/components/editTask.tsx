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
import { useState } from 'react'
import { createClient } from "@/utils/supabase/client"
import { revalidateDashboard } from "@/app/actions/revalidate"

export default function EditTask({ task, user }: { task: Task, user: User }) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [date, setDate] = useState(task.due_date)
  const [formCompleted, setFormCompleted] = useState(false)


  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase
    .from('tasks')
    .update([
      {
        title,
        description,
        due_date: date,
        status: 'pending',
        user_id: user.id
      },
    ])
    .eq('id', task.id);

  if (error) {
    console.error("Error updating task:", error)
  } else {
    console.log("Task updated successfully:", data)
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
        <Button variant="outline">Edit Task 📒</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        {formCompleted && <p>Form updated successfully!</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  )
}

