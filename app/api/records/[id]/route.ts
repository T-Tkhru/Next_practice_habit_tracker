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

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const recordId = parseInt(id)

  const records = readDB()
  const updated = records.filter((r: { id: number }) => r.id !== recordId)
  writeDB(updated)

  return NextResponse.json({ success: true })
}
