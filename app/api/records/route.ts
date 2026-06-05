import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'db/records.json')

function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(raw)
}

function writeDB(data: unknown) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export async function GET() {
  const records = readDB()
  return NextResponse.json(records)
}

export async function POST(request: Request) {
  const body = await request.json()
  const records = readDB()

  // 同じ日・同じ習慣の重複チェック
  const duplicate = records.find(
    (r: { habitId: number; date: string }) => r.habitId === body.habitId && r.date === body.date
  )
  if (duplicate) {
    return NextResponse.json({ error: 'すでに記録済みです' }, { status: 409 })
  }

  const newRecord = {
    id: records.length > 0 ? Math.max(...records.map((r: { id: number }) => r.id)) + 1 : 1,
    habitId: body.habitId,
    date: body.date,
  }

  records.push(newRecord)
  writeDB(records)

  return NextResponse.json(newRecord, { status: 201 })
}
