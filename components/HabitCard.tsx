'use client'

import { Habit } from '@/types'
import { Card } from '@/components/ui/card'


type Props = {
  habit: Habit
  isDone: boolean
  streak: number
  onCheck: () => void
}

export default function HabitCard({ habit, isDone, streak, onCheck }: Props) {
  return (
    <Card className="flex-row items-center gap-3 px-3">
      <button
        onClick={onCheck}
        className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center ${isDone ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'}`}
      >
        {isDone && <span className="text-xs leading-none">✓</span>}
      </button>
      <span className="text-xl">{habit.emoji}</span>
      <span className={isDone ? 'line-through text-muted-foreground' : ''}>{habit.name}</span>
      <span className="ml-auto text-xs text-muted-foreground">
        🔥 {streak}日
      </span>
    </Card>
  )
}
