'use client'

import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
 
  return (
    <Calendar
      mode="range"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}

