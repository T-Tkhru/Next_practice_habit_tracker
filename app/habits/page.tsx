'use client'

import { useState, useEffect } from 'react'
import { Habit } from '@/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'


export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('')

  useEffect(() => {
    fetch('/api/habits')
      .then((res) => res.json())
      .then((data) => setHabits(data))
  }, [])

  const openAdd = () => {
    setName('')
    setEmoji('')
    setEditingHabit(null)
    setIsOpen(true)
  }

  const handleDelete = async (id: number) => {
    await fetch(`/api/habits/${id}`, { method: 'DELETE' })
    setHabits(habits.filter((h) => h.id !== id))
  }

  const openEdit = (habit: Habit) => {
    setName(habit.name)
    setEmoji(habit.emoji)
    setEditingHabit(habit)
    setIsOpen(true)
  }

  const handleSubmit = async () => {
    if (editingHabit) {
      // 編集モード: PUTで既存の習慣を更新
      const res = await fetch(`/api/habits/${editingHabit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, emoji }),
      })
      const updated = await res.json()
      setHabits(habits.map((h) => (h.id === updated.id ? updated : h)))
    } else {
      // 追加モード: POSTで新しい習慣を追加
      const res = await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, emoji }),
      })
      const newHabit = await res.json()
      setHabits([...habits, newHabit])
    }
    setIsOpen(false)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-medium">習慣管理</h1>
        <Button onClick={openAdd}>+ 習慣を追加</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {habits.map((habit) => (
          <Card key={habit.id} className="flex flex-col gap-2 p-4">
            <span className="text-3xl">{habit.emoji}</span>
            <span className="font-medium text-sm">{habit.name}</span>
            <div className="flex gap-1 mt-auto">
              <Button variant="ghost" size="sm" onClick={() => openEdit(habit)}>編集</Button>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(habit.id)}>削除</Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingHabit ? '習慣を編集' : '習慣を追加'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input placeholder="習慣名" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="絵文字" value={emoji} onChange={(e) => setEmoji(e.target.value)} />
            <Button onClick={handleSubmit}>{editingHabit ? '更新する' : '追加する'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
