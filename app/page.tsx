'use client'

import { useState, useEffect } from 'react'
import { Habit, HabitRecord } from '@/types'
import { calcStreak } from '@/lib/streak'
import { Card, CardContent } from '@/components/ui/card'
import HabitCard from '@/components/HabitCard'


export default function HomePage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [records, setRecords] = useState<HabitRecord[]>([])

  useEffect(() => {
    fetch('/api/habits').then((res) => res.json()).then((data) => setHabits(data))
    fetch('/api/records').then((res) => res.json()).then((data) => setRecords(data))
  }, [])

  const today = new Date().toISOString().slice(0, 10)
  const isDone = (habitId: number) =>
    records.some((r) => r.habitId === habitId && r.date === today)

  const doneCount = habits.filter((h) => isDone(h.id)).length
  const doneRate = habits.length > 0 ? Math.round(doneCount / habits.length * 100) : 0
  const maxStreak = habits.length > 0 ? Math.max(...habits.map((h) => calcStreak(h.id, records))) : 0

  const handleCheck = async (habitId: number) => {
    if (isDone(habitId)) {
      // チェックON → OFF: レコードを削除
      const record = records.find((r) => r.habitId === habitId && r.date === today)!
      await fetch(`/api/records/${record.id}`, { method: 'DELETE' })
      setRecords(records.filter((r) => r.id !== record.id))
    } else {
      // チェックOFF → ON: レコードを追加
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitId, date: today }),
      })
      const newRecord = await res.json()
      setRecords([...records, newRecord])
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-lg font-medium mb-5">今日の習慣</h1>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">達成</p>
            <p className="text-2xl font-bold">{doneCount} / {habits.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">達成率</p>
            <p className="text-2xl font-bold">{doneRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">最長連続</p>
            <p className="text-2xl font-bold">{maxStreak}日</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-2">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            isDone={isDone(habit.id)}
            streak={calcStreak(habit.id, records)}
            onCheck={() => handleCheck(habit.id)}
          />
        ))}
      </div>
    </div>
  )
}
