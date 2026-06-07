# HabitLog — 習慣トラッカー

毎日の習慣を記録・管理するアプリを実装する研修課題です。  
詳細な仕様は `SPEC.md` を読んで確認してください。

---

## 進め方

### Step 1: セットアップ

- [ ] リポジトリをクローンする
- [ ] `npm install` で依存パッケージをインストールする
- [ ] `.gitignore` に `db/*.json` を追加する
- [ ] `db/habits.example.json` を `db/habits.json` にコピーする
- [ ] `db/records.example.json` を `db/records.json` にコピーする
- [ ] `npm run dev` で起動し、画面が表示されることを確認する

---

### Step 2: 機能実装

shadcn/ui のコンポーネント（Card・Checkbox・Dialog・Button・Input・その他）を積極的に使う。  
細かいスタイリングは Step 3 でまとめてやる。

#### Sidebar（ナビゲーション）

- [ ] `usePathname` で現在のパスを取得する
- [ ] 3つのナビアイテム（今日・習慣管理・履歴）を `Link` で表示する
- [ ] 現在のパスと一致するアイテムにアクティブスタイルを当てる

#### 習慣管理（`/habits`）

- [ ] 習慣一覧を取得して表示する
- [ ] 「＋ 習慣を追加」ボタンを押すと Dialog（モーダル）が開く
- [ ] モーダルのフォームから習慣を追加できる
- [ ] 編集ボタンを押すと、現在の値がセットされたモーダルが開く
- [ ] モーダルのフォームから習慣を更新できる
- [ ] 削除ボタンで習慣を削除できる

#### HabitCard コンポーネント

- [ ] props を定義する（habit・isDone・streak・onCheck）
- [ ] Card を使って絵文字・習慣名・連続日数（streak）を表示する
- [ ] isDone のとき習慣名に取り消し線を表示する
- [ ] isDone のときチェックサークルの見た目を変える

#### 今日のページ（`/`）

- [ ] 習慣一覧と達成記録を `Promise.all` で同時に取得する
- [ ] 今日の達成済み habitId を絞り込む
- [ ] HabitCard を並べてチェックのON/OFFができる
- [ ] `calcStreak` で各 habit の連続日数を計算する
- [ ] statsカード3枚（達成数・達成率・最長streak）を表示する

#### 達成履歴（`/history`）

- [ ] Server Component として `fs.readFileSync` で習慣・記録を取得する（`'use client'` を書かない）
- [ ] 過去28日分の日付配列を作る
- [ ] 28日前の日付が正しい曜日に来るよう先頭に空セルを入れる
- [ ] 各セルを達成率（0% / 1〜49% / 50〜99% / 100%）で色分けして表示する

---

### Step 3: デザイン仕上げ

- [ ] `SPEC.md` と照らし合わせて、未実装の仕様がないか確認する
- [ ] モックのデザインに合わせてスタイルを調整する

---

## ファイル構成

```
app/
├── api/              # 講師が用意済みのモックAPI（触らなくてOK）
├── habits/page.tsx   # 習慣管理ページ
├── history/page.tsx  # 達成履歴ページ
└── page.tsx          # 今日の習慣ページ
components/
├── HabitCard.tsx     # 習慣カードコンポーネント
├── Sidebar.tsx       # サイドバーナビゲーション
└── ui/               # shadcn/ui（触らなくてOK）
lib/
└── streak.ts         # 連続日数計算util（触らなくてOK）
store/
└── habitStore.ts     # Zustandストア
types/
└── index.ts          # 型定義（触らなくてOK）
db/
├── habits.example.json
└── records.example.json
```
