# 習慣トラッカー 仕様書

> **受講者へ**: このファイルはあなたが実装する機能の仕様をまとめたものです。  
> AIに読ませず、自分でしっかり読んで理解してから実装を進めてください。

---

## アプリ概要

毎日の習慣（読書・運動など）を登録し、達成チェックと履歴を管理するアプリ。

---

## レイアウト（`app/layout.tsx` + `components/Sidebar.tsx`）

- 左側にサイドバー（固定幅）、右側にページコンテンツという横並びレイアウト
- サイドバーには「HabitLog」ロゴと3つのナビアイテムを表示する
- 現在のページに対応するナビアイテムをアクティブ状態にする（`usePathname` を使う）

**ナビアイテム**

| ラベル | パス |
|---|---|
| 今日 | `/` |
| 習慣管理 | `/habits` |
| 履歴 | `/history` |

---

## ページ仕様

### `/` 今日の習慣（メイン実装）

**statsカード（3枚）**

| カード | 表示内容 |
|---|---|
| 達成 | `達成数 / 全習慣数`（例: `2 / 5`） |
| 達成率 | `Math.round(達成数 / 全習慣数 * 100)%` |
| 最長連続 | 全habitの中で最も長いstreak日数 |

**習慣リスト**

- 習慣をカード形式で一覧表示する
- 各カードに: チェックサークル・絵文字・習慣名・連続日数（streak）を表示する
- チェックサークルをクリックすると達成済み↔未達成がトグルする
- 達成済みのとき: 習慣名に取り消し線、チェックサークルを塗りつぶし

**使用するAPI**

- `GET /api/habits` — 習慣一覧取得
- `GET /api/records` — 達成記録取得
- `POST /api/records` — 達成記録追加（body: `{ habitId, date }`）
- `DELETE /api/records/[id]` — 達成記録削除

**streak の計算**

`lib/streak.ts` に `calcStreak(habitId, records)` という関数が用意済み。  
今日から遡って連続して記録がある日数を返す。

---

### `/habits` 習慣管理（メイン実装）

**習慣一覧**

- 登録済みの習慣を一覧表示する（絵文字・習慣名）
- 各習慣に編集ボタンと削除ボタンを表示する

**習慣の追加（モーダル）**

- 「+ 習慣を追加」ボタンを押すと shadcn/ui の Dialog（モーダル）が開く
- フォームに習慣名・絵文字を入力して送信
- 送信後: stateを更新してモーダルを閉じる

**習慣の編集（モーダル）**

- 編集ボタンを押すと、同じモーダルに現在の値がセットされた状態で開く
- 送信後: stateを更新してモーダルを閉じる
- 追加と編集で同じモーダルコンポーネントを使い回す

**習慣の削除**

- 削除ボタンを押すと即座に削除（確認なし）
- stateから該当の習慣を取り除く

**使用するAPI**

- `GET /api/habits` — 一覧取得
- `POST /api/habits` — 追加（body: `{ name, emoji }`）
- `PUT /api/habits/[id]` — 更新（body: `{ name, emoji }`）
- `DELETE /api/habits/[id]` — 削除

---

### `/history` 達成履歴（サブ実装）

**過去4週間グリッド**

- 曜日ラベル（日〜土）を7列で表示する
- 過去28日分の日付を7列のグリッドで表示する
- 28日前の日付が正しい曜日の列に来るよう、先頭に空セルを入れる
- 各セルに日付の数字を表示する

**色分け（達成率）**

| 達成率 | 色 |
|---|---|
| 0% | 色なし（背景: muted） |
| 1〜49% | 薄紫 |
| 50〜99% | 紫 |
| 100% | 濃紫（白文字） |

**実装上のポイント**

- このページは **Server Component** として実装する（`'use client'` を書かない）
- データの取得はサーバーサイドで `fetch` を使って行う

**使用するAPI**

- `GET /api/habits` — 習慣数を取得（達成率の分母）
- `GET /api/records` — 達成記録を取得

---

## コンポーネント仕様

### `components/Sidebar.tsx`

- `'use client'` を使う（`usePathname` が必要なため）
- `usePathname` で現在のパスを取得してアクティブ状態を管理する

### `components/HabitCard.tsx`

**props**

| prop | 型 | 説明 |
|---|---|---|
| `habit` | `Habit` | 習慣データ |
| `isDone` | `boolean` | 今日達成済みか |
| `streak` | `number` | 連続達成日数 |
| `onCheck` | `() => void` | チェック操作時に呼ぶ関数 |

---

## 型定義（実装済み: `types/index.ts`）

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
  date: string // YYYY-MM-DD形式
}
```

---

## 用意済みのutil（`lib/streak.ts`）

```typescript
// 特定habitの連続達成日数を計算する（今日から遡って数える）
calcStreak(habitId: number, records: HabitRecord[]): number
```

---

## APIリクエスト/レスポンス例

### `POST /api/habits`
```json
// リクエストbody
{ "name": "朝のストレッチ", "emoji": "🤸" }

// レスポンス（201）
{ "id": 4, "name": "朝のストレッチ", "emoji": "🤸", "createdAt": "2024-06-05" }
```

### `PUT /api/habits/[id]`
```json
// リクエストbody
{ "name": "夜のストレッチ", "emoji": "🧘" }

// レスポンス（200）
{ "id": 4, "name": "夜のストレッチ", "emoji": "🧘", "createdAt": "2024-06-05" }
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

---

## 実装の推奨順

1. `components/Sidebar.tsx` — ナビゲーションを作る
2. `app/habits/page.tsx` — 習慣の追加・削除・編集を実装する
3. `app/page.tsx` — 習慣一覧の表示・チェックON/OFF・statsカードを実装する（この時点ではdivで表示してよい）
4. `components/HabitCard.tsx` — page.tsx のカード部分をコンポーネントに切り出す
5. `app/history/page.tsx` — 過去4週間グリッドを実装する
