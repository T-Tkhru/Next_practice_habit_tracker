'use client'

import { useState, useEffect } from 'react'
import { Habit, HabitRecord } from '@/types'

export default function HistoryPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [records, setRecords] = useState<HabitRecord[]>([])

  useEffect(() => {
    fetch('/api/habits').then((r) => r.json()).then(setHabits)
    fetch('/api/records').then((r) => r.json()).then(setRecords)
  }, [])

  const days = Array.from({ length: 28 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - 27 + i)
    return d.toISOString().slice(0, 10)
  })

  const firstDayOfWeek = new Date(days[0]).getDay()
  const emptyCells = Array.from({ length: firstDayOfWeek })

  return (
    <div className="p-6">
      <h1 className="text-lg font-medium mb-5">達成履歴</h1>
      <p className="text-sm text-muted-foreground mb-4">過去4週間</p>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {['日', '月', '火', '水', '木', '金', '土'].map((d) => (
          <div key={d} className="text-center text-xs text-muted-foreground">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyCells.map((_, i) => <div key={`empty-${i}`} />)}
        {days.map((date) => {
          const completedHabits = habits.filter((h) =>
            records.some((r) => r.habitId === h.id && r.date === date)
          )
          const rate = habits.length > 0 ? completedHabits.length / habits.length : 0
          const color =
            rate === 0 ? 'bg-muted' :
            rate < 0.5 ? 'bg-purple-200 text-purple-900' :
            rate < 1   ? 'bg-purple-500 text-white' :
                         'bg-purple-900 text-white'
          return (
            <div key={date} className={`relative group aspect-square rounded flex items-center justify-center text-[10px] md:text-xs ${color}`}>
              {Number(date.slice(8, 10))}
              {completedHabits.length > 0 && (
                <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-10 bg-popover text-popover-foreground text-xs rounded shadow-md px-2 py-1 whitespace-nowrap">
                  {completedHabits.map((h) => (
                    <div key={h.id}>{h.emoji} {h.name}</div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
