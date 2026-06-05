# 習慣トラッカー 仕様書

> **受講者へ**: このファイルはあなたが実装する機能の仕様をまとめたものです。  
> AIに読ませず、自分でしっかり読んで理解してから実装を進めてください。

---

## アプリ概要

毎日の習慣（読書・運動など）を登録し、達成チェックと履歴を管理するアプリ。

---

## ページ仕様

### `/` 今日の習慣チェック（メイン実装）

**表示内容**
- 登録されている習慣の一覧をカード形式で表示する
- 各カードに: 絵文字・習慣名・チェックボタンを表示する
- 今日すでに達成済みの習慣は、見た目を変えて区別できるようにする（例: 取り消し線、背景色変更など）

**操作**
- チェックボタンを押すと「達成済み」になる
- 達成済みのものを再度押すと「未達成」に戻る（トグル動作）

**使用するAPI**
- `GET /api/habits` — ページ表示時に習慣一覧を取得
- `GET /api/records` — ページ表示時に達成記録を取得
- `POST /api/records` — チェックON時に達成記録を追加（body: `{ habitId, date }`）
- `DELETE /api/records/[id]` — チェックOFF時に達成記録を削除

---

### `/habits` 習慣管理（メイン実装）

**表示内容**
- 登録済みの習慣一覧を表示する
- 各習慣に削除ボタンを表示する
- 新しい習慣を追加するフォームを表示する（絵文字・習慣名の入力欄）

**操作**
- フォームに入力して送信すると習慣が追加される
- 習慣名が空のときは送信しない
- 削除ボタンを押すと習慣が削除される

**使用するAPI**
- `GET /api/habits` — 一覧取得
- `POST /api/habits` — 追加（body: `{ name, emoji }`）
- `DELETE /api/habits/[id]` — 削除

---

### `/history` 達成履歴（サブ実装）

**表示内容**
- 過去の達成記録を日付ごとにグループ化して表示する
- 各日付の下に、その日に達成した習慣の絵文字と名前を表示する
- 新しい日付が上に来るよう降順で表示する

**実装上のポイント**
- このページは **Server Component** として実装する（`'use client'` を書かない）
- データの取得はサーバーサイドで `fetch` を使って行う

**使用するAPI**
- `GET /api/habits` — 習慣名を引くために使用
- `GET /api/records` — 達成記録の一覧を取得

---

## コンポーネント仕様

### `components/HabitCard.tsx`

**props**

| prop | 型 | 説明 |
|---|---|---|
| `habit` | `Habit` | 習慣データ |
| `isDone` | `boolean` | 今日達成済みかどうか |
| `onCheck` | `() => void` | チェック操作時に呼ぶ関数 |

**表示**
- `habit.emoji` と `habit.name` を表示する
- `isDone` が `true` のときと `false` のときで見た目を変える
- shadcn/ui の `Checkbox` と `Card` を使う

---

## グローバルステート仕様

### `store/habitStore.ts`（Zustand）

今日の達成済み habitId をグローバルで管理する。

**ステート**

| 名前 | 型 | 説明 |
|---|---|---|
| `doneIds` | `number[]` | 今日達成済みの habitId の配列 |

**アクション**

| 名前 | 説明 |
|---|---|
| `addDoneId(id)` | 達成済みIDを追加する |
| `removeDoneId(id)` | 達成済みIDを除外する |

---

## 型定義（実装済み）

```typescript
// types/index.ts

type Habit = {
  id: number
  name: string
  emoji: string
  createdAt: string
}

type HabitRecord = {
  id: number
  habitId: number
  date: string // YYYY-MM-DD形式
}
```

---

## 実装の進め方（推奨順）

1. `GET /api/habits` を叩いて習慣一覧を画面に表示する
2. `HabitCard` コンポーネントを作ってカード表示に切り替える
3. 習慣の追加・削除（`/habits` ページ）を実装する
4. `/` ページでチェックのON/OFFを実装する
5. Zustandストアを使って達成状態をグローバル管理に切り替える
6. `/history` ページで履歴を日付グループで表示する

---

## APIリクエスト/レスポンス例

### `POST /api/habits`
```json
// リクエストbody
{ "name": "朝のストレッチ", "emoji": "🤸" }

// レスポンス（201）
{ "id": 4, "name": "朝のストレッチ", "emoji": "🤸", "createdAt": "2024-06-05" }
```

### `POST /api/records`
```json
// リクエストbody
{ "habitId": 1, "date": "2024-06-05" }

// レスポンス（201）
{ "id": 3, "habitId": 1, "date": "2024-06-05" }

// すでに記録済みの場合（409）
{ "error": "すでに記録済みです" }
```
