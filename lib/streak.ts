import { HabitRecord } from '@/types'

// 特定habitの連続達成日数を計算するutil関数（今日から遡って数える）
export function calcStreak(habitId: number, records: HabitRecord[]): number {
  const today = new Date()
  let streak = 0

  for (let i = 0; i < 365; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    const hasRecord = records.some((r) => r.habitId === habitId && r.date === dateStr)
    if (hasRecord) {
      streak++
    } else {
      break
    }
  }

  return streak
}
