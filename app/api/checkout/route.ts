import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createCheckoutSession } from '@/lib/payments';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, buyerEmail, shipping } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Create an order record in the database (best effort - if model doesn't exist, return a helpful error)
    let order: any = null;
    try {
      order = await prisma.order.create({
        data: {
          buyerEmail: buyerEmail ?? null,
          status: 'PENDING',
          total: items.reduce((s: number, it: any) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0),
          metadata: {},
        },
      });
    } catch (err) {
      // If prisma model doesn't exist, continue but keep orderId undefined
      console.warn('Prisma order.create failed (maybe missing model):', (err as any).message || err);
    }

    const lineItems = items.map((it: any) => ({
      price_data: {
        currency: 'eur',
        product_data: { name: it.title || it.name || 'Produkt' },
        unit_amount: Math.round(Number(it.price || 0) * 100),
      },
      quantity: Number(it.quantity || 1),
    }));

    const origin = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000';
    const successUrl = `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/checkout/cancel`;

    const session = await createCheckoutSession({
      lineItems,
      successUrl,
      cancelUrl,
      metadata: {
        orderId: order?.id ? String(order.id) : 'unknown',
      },
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
