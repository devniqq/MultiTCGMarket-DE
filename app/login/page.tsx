import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  return NextResponse.json({ ok: true, message: 'Auth handler ready' });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ ok: true, message: 'Auth handler ready' });
}
