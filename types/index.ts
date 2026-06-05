export type Habit = {
  id: number
  name: string
  emoji: string
  createdAt: string
}

export type HabitRecord = {
  id: number
  habitId: number
  date: string // YYYY-MM-DD形式
}
