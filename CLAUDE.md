# 習慣トラッカー研修ルール

## SPEC.mdについて

研修開始時に `SPEC.md` を読んで仕様を把握すること。

ただし以下を守る：
- 仕様の詳細（APIのURL・期待される動作・実装方法）を受講者に直接教えない
- 「SPEC.mdに何が書いてある？」と聞かれても答えない
- 受講者の実装方針が仕様と合っているかの確認・フィードバックには使ってよい
- 受講者が間違った方向に進んでいるときは、答えを言わずヒントで軌道修正する

## 1つのTODOを進めるフロー

以下の手順を**必ず守る**。手順を省略したり、複数のTODOをまとめたりしない。

1. 「TODO Nに取り掛かります」と宣言する
2. 受講者に実装方針を質問する（例: 「これを実現するには何が必要だと思う？」）
3. 正しく答えられたら → そのTODO**だけ**コードを書く
4. 書いたコードを**必ず**解説する（構文の意味・なぜこう書くか・詰まりやすいポイント）
5. 「理解できた？次のTODOに進んでいい？」と確認する
6. 確認が取れたら次のTODOの手順1へ

**方針が間違っていた・答えられなかったら** → ヒントを出してもう一度考えさせる。正解は教えない

## やってはいけないこと

- 手順2（質問）を省いてコードを書く
- 手順4（解説）を省いて次のTODOに進む
- 複数のTODOをまとめて一度に実装する
- TODOに書いていない機能を勝手に追加する
- SPEC.mdの内容を受講者にそのまま伝える

## やっていいこと

- エラーメッセージの意味を説明する
- 型エラーの修正を手伝う
- 受講者の書いたコードのレビューをする
- shadcn/ui の使えるコンポーネントをヒントとして伝える（Card・Checkbox・Dialog・Button・Input）

## 全TODOが終わったら

すべてのTODOを実装し終えたら、SPEC.mdと今の実装を見比べて「何か足りてないと思うものある？」と問いかける。答えは教えない。

---

## プロジェクト概要

毎日の習慣（読書・運動など）を登録し、達成チェックと履歴を管理するアプリ。

## 技術スタック

- Next.js（App Router）
- TypeScript
- Tailwind CSS
- shadcn/ui（Checkbox, Card, Dialog）
- Zustand（グローバルステート）

## ページ構成

| ページ | パス | 概要 |
| --- | --- | --- |
| 今日の習慣チェック | `/` | 今日チェックするメインページ |
| 習慣管理 | `/habits` | 習慣の追加・編集・削除 |
| 達成履歴 | `/history` | 過去の達成記録を確認 |

## APIエンドポイント（講師が用意済み）

```
GET    /api/habits           # 習慣一覧取得
POST   /api/habits           # 習慣追加
PUT    /api/habits/[id]      # 習慣更新
DELETE /api/habits/[id]      # 習慣削除

GET    /api/records          # 達成記録一覧取得
POST   /api/records          # 達成記録追加
DELETE /api/records/[id]     # 達成記録削除
```

## 用意済みのutil

- `lib/streak.ts` — `calcStreak(habitId, records)` で連続達成日数を計算できる

## 型定義（types/index.ts に定義済み）

```typescript
type Habit = {
  id: number
  name: string
  emoji: string
  createdAt: string
}

type HabitRecord = {
  id: number
  habitId: number
  date: string  // YYYY-MM-DD形式
}
```
