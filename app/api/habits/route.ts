import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'db/habits.json')

function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(raw)
}

function writeDB(data: unknown) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export async function GET() {
  const habits = readDB()
  return NextResponse.json(habits)
}

export async function POST(request: Request) {
  const body = await request.json()
  const habits = readDB()

  const newHabit = {
    id: habits.length > 0 ? Math.max(...habits.map((h: { id: number }) => h.id)) + 1 : 1,
    name: body.name,
    emoji: body.emoji ?? '✅',
    createdAt: new Date().toISOString().split('T')[0],
  }

  habits.push(newHabit)
  writeDB(habits)

  return NextResponse.json(newHabit, { status: 201 })
}
