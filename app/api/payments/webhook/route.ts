import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') || '';
  const body = await req.text();

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // If no webhook secret is configured, try to parse the JSON directly (not recommended for production)
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId && orderId !== 'unknown') {
        try {
          await prisma.order.update({ where: { id: orderId }, data: { status: 'PAID' } });
        } catch (err) {
          console.warn('Failed to update order status. Does Order model exist?', (err as any).message || err);
        }
      }

      // Additional fulfillment logic (send emails, create shipments) goes here.
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
