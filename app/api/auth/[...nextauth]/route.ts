import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    features: ['Auth', 'Prisma', 'Stripe', 'PayPal', 'Crypto', 'Seller Portal']
  });
}
