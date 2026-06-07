'use client'

// TODO 1: useState で習慣一覧(habits)を管理するstateを作る
// TODO 2: useState で達成記録(records)を管理するstateを作る
// TODO 3: useEffect でGET /api/habits と GET /api/records を同時に取得する（Promise.all を使う）
// TODO 4: 今日の達成済み habitId 一覧を records から作る
// TODO 5: habits をマップして習慣を一覧表示する（divで書いてよい）
// TODO 6: チェック操作で未達成なら POST /api/records、達成済みなら DELETE /api/records/[id] を叩く
// TODO 7: calcStreak を使って各 habit の連続日数を計算する（lib/streak.ts を使う）
// TODO 8: statsカード3枚（達成数・達成率・最長streak）を表示する
// TODO 9: 習慣の表示を HabitCard コンポーネントに差し替える（HabitCard実装後）

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-medium mb-5">今日の習慣</h1>

      {/* TODO: statsカード3枚をここに表示する */}
      <div className="grid grid-cols-3 gap-3 mb-6">
      </div>

      {/* TODO: 習慣の一覧をここに表示する */}
      <div className="flex flex-col gap-2">
      </div>
    </div>
  )
}
