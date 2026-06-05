'use client'

// TODO 1: useState を使って習慣一覧(habits)を管理するstateを作る
// TODO 2: useState を使って達成記録(records)を管理するstateを作る
// TODO 3: useEffect でページ読み込み時に GET /api/habits を叩いてstateに入れる
// TODO 4: useEffect でページ読み込み時に GET /api/records を叩いてstateに入れる
// TODO 5: records から「今日」の達成済み habitId 一覧を作る
// TODO 6: habits をマップして HabitCard コンポーネントを並べる
// TODO 7: HabitCard がチェックされたとき、未達成なら POST /api/records を叩く
// TODO 8: HabitCard がチェックされたとき、達成済みなら DELETE /api/records/[id] を叩く

export default function HomePage() {
  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">今日の習慣</h1>
    </main>
  )
}
