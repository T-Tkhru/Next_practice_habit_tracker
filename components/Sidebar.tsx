'use client'

// TODO 1: usePathname を使って現在のパスを取得する
// TODO 2: ナビアイテムの配列を定義する（ラベル・パス・アイコン絵文字）
// TODO 3: 各アイテムを Link コンポーネントで表示する
// TODO 4: 現在のパスと一致するアイテムにアクティブスタイルを当てる（文字色・左ボーダー・背景色）

export default function Sidebar() {
  return (
    <aside className="w-48 border-r flex flex-col">
      <div className="px-5 py-4 border-b font-medium text-sm">HabitLog</div>
      {/* TODO: ナビアイテムをここに並べる */}
    </aside>
  )
}
