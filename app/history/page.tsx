// Server Component（'use client' は書かない）

// TODO 1: fetch で GET /api/habits を叩いて習慣一覧を取得する非同期関数を作る
// TODO 2: fetch で GET /api/records を叩いて達成記録を取得する非同期関数を作る
// TODO 3: records を日付ごとにグループ化する（新しい日付が上に来るよう降順にする）
// TODO 4: 日付ごとにカードを表示し、その日達成した習慣の絵文字と名前を表示する

export default async function HistoryPage() {
  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">達成履歴</h1>
    </main>
  )
}
