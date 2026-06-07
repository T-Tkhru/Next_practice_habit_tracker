'use client'

// TODO 1: useState で習慣一覧(habits)を管理するstateを作る
// TODO 2: useState でモーダルの開閉（isOpen）を管理するstateを作る
// TODO 3: useState でフォームの入力値（name・emoji）を管理するstateを作る
// TODO 4: useState で編集中の habit を管理するstateを作る（nullなら追加モード）
// TODO 5: useEffect でGET /api/habits を叩いてstateに入れる
// TODO 6: 「習慣を追加」ボタンを押したとき、editingHabitをnullにしてモーダルを開く
// TODO 7: 編集ボタンを押したとき、該当habitをeditingHabitにセットしてモーダルを開く
// TODO 8: モーダルのフォームを送信したとき
//         - editingHabitがnullなら POST /api/habits を叩いて習慣を追加する
//         - editingHabitがあれば PUT /api/habits/[id] を叩いて習慣を更新する
// TODO 9: 追加・更新成功後、stateを更新してモーダルを閉じ、フォームをリセットする
// TODO 10: 削除ボタンを押したとき DELETE /api/habits/[id] を叩いてstateから除外する
// TODO 11: shadcn/ui の Dialog を使ってモーダルを実装する

export default function HabitsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-medium">習慣管理</h1>
        {/* TODO: 「+ 習慣を追加」ボタンをここに置く */}
      </div>

      {/* TODO: 習慣一覧をここに表示する（各アイテムに編集・削除ボタン） */}
      <div className="flex flex-col gap-2">
      </div>

      {/* TODO: Dialog コンポーネントでモーダルを実装する（追加・編集で共用） */}
    </div>
  )
}
