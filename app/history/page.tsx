// Server Component（'use client' は書かない）

// TODO 1: 必要なデータを取得する
// TODO 2: 過去28日分のグリッドを表示する
// TODO 3: 各日付の達成率に応じてセルを色分けする

export default async function HistoryPage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-medium mb-5">達成履歴</h1>
      <p className="text-sm text-muted-foreground mb-4">過去4週間</p>

      <div className="grid grid-cols-7 gap-1">
      </div>
    </div>
  )
}
