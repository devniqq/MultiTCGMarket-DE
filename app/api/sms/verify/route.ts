import { NextRequest, NextResponse } from 'next/server';

const codes = new Map<string, { code: string; expires: number }>();
const CODE_TTL_MS = 1000 * 60 * 5; // 5 minutes

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();
    if (!phone || !code) return NextResponse.json({ error: 'Missing phone or code' }, { status: 400 });

    const entry = codes.get(phone);
    if (!entry) return NextResponse.json({ error: 'Code not found or expired' }, { status: 404 });
    if (entry.expires < Date.now()) {
      codes.delete(phone);
      return NextResponse.json({ error: 'Code expired' }, { status: 410 });
    }

    if (entry.code !== String(code)) return NextResponse.json({ error: 'Invalid code' }, { status: 401 });

    codes.delete(phone);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('SMS verify error:', err);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
