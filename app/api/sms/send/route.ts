import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

// Simple in-memory store for verification codes. Replace with a persistent DB in production.
const CODE_TTL_MS = 1000 * 60 * 5; // 5 minutes
const codes = new Map<string, { code: string; expires: number }>();

function genCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();
    if (!phone) return NextResponse.json({ error: 'Phone required' }, { status: 400 });

    const code = genCode();
    codes.set(phone, { code, expires: Date.now() + CODE_TTL_MS });

    // If Twilio is configured, send the SMS. Otherwise just log it (dev mode).
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM) {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      await client.messages.create({ from: process.env.TWILIO_FROM, to: phone, body: `Dein MultiTCGMarket Code: ${code}` });
    } else {
      console.log(`SMS to ${phone}: ${code}`);
    }

    return NextResponse.json({ ok: true, message: 'Code sent' });
  } catch (err) {
    console.error('SMS send error:', err);
    return NextResponse.json({ error: 'Failed to send code' }, { status: 500 });
  }
}
