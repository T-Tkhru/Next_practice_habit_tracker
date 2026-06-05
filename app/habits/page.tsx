'use client'

// TODO 1: useState で習慣一覧(habits)を管理するstateを作る
// TODO 2: useState でフォームの入力値（名前・絵文字）を管理するstateを作る
// TODO 3: useEffect でページ読み込み時に GET /api/habits を叩いてstateに入れる
// TODO 4: 追加ボタンを押したとき POST /api/habits を叩く関数を作る
// TODO 5: 追加成功後、stateを更新してフォームをリセットする
// TODO 6: 削除ボタンを押したとき DELETE /api/habits/[id] を叩く関数を作る
// TODO 7: 削除成功後、stateから該当の習慣を取り除く

export default function HabitsPage() {
  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">習慣を管理する</h1>
    </main>
  )
}
