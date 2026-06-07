'use client'

// TODO 1: 必要なstateを定義する
// TODO 2: ページ読み込み時に必要なデータを取得する
// TODO 3: 今日の達成状況を判定する
// TODO 4: 習慣一覧を表示する（まずはdivで書いてよい）
// TODO 5: チェック操作でAPIを叩いて達成状態をトグルする
// TODO 6: 各habitのstreakを計算して表示する
// TODO 7: statsカード3枚（達成数・達成率・最長streak）を表示する
// TODO 8: 習慣の表示をHabitCardコンポーネントに差し替える（HabitCard実装後）

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-medium mb-5">今日の習慣</h1>

      <div className="grid grid-cols-3 gap-3 mb-6">
      </div>

      <div className="flex flex-col gap-2">
      </div>
    </div>
  )
}
