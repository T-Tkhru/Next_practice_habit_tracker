import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const HABITS_PATH = path.join(process.cwd(), 'db/habits.json')
const RECORDS_PATH = path.join(process.cwd(), 'db/records.json')

function readDB(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

function writeDB(filePath: string, data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const habitId = parseInt(id)
  const body = await request.json()

  const habits = readDB(HABITS_PATH)
  const updated = habits.map((h: { id: number }) =>
    h.id === habitId ? { ...h, ...body } : h
  )
  writeDB(HABITS_PATH, updated)

  return NextResponse.json(updated.find((h: { id: number }) => h.id === habitId))
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const habitId = parseInt(id)

  const habits = readDB(HABITS_PATH)
  const updated = habits.filter((h: { id: number }) => h.id !== habitId)
  writeDB(HABITS_PATH, updated)

  // 関連する達成記録も削除
  const records = readDB(RECORDS_PATH)
  const updatedRecords = records.filter((r: { habitId: number }) => r.habitId !== habitId)
  writeDB(RECORDS_PATH, updatedRecords)

  return NextResponse.json({ success: true })
}
