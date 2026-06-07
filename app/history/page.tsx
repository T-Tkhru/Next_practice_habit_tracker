// Server Component（'use client' は書かない）

// TODO 1: fetch で GET /api/habits を叩いて習慣一覧を取得する非同期関数を作る
// TODO 2: fetch で GET /api/records を叩いて達成記録を取得する非同期関数を作る
// TODO 3: 今日から過去28日分の日付配列を作る（新しい日が後ろ）
// TODO 4: 28日分の最初のセルが正しい曜日に来るよう、先頭に空セルを入れる
//         ヒント: 28日前の日付が何曜日か調べて、その分だけ空セルを追加する
// TODO 5: 各日付について「達成数 / 全habit数」の比率を計算し、色を決める
//         - 0%:     色なし（背景: bg-secondary）
//         - 1〜49%: 薄紫（例: bg-violet-200）
//         - 50〜99%: 紫（例: bg-violet-400）
//         - 100%:   濃紫（例: bg-violet-600 text-white）
// TODO 6: 曜日ラベル（日〜土）を7列で表示する
// TODO 7: 各日付のセルを表示する（日付の数字 + 色分け）

export default async function HistoryPage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-medium mb-5">達成履歴</h1>
      <p className="text-sm text-muted-foreground mb-4">過去4週間</p>

      {/* TODO: 曜日ラベル + 日付グリッドをここに表示する */}
      <div className="grid grid-cols-7 gap-1">
      </div>
    </div>
  )
}
