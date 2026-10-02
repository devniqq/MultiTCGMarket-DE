import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = session.user.id as string;

    // If seller, return seller-specific orders, otherwise return buyer orders
    let orders: any[] = [];
    try {
      orders = await prisma.order.findMany({ where: { sellerId: userId }, orderBy: { createdAt: 'desc' } });
    } catch (err) {
      console.warn('Order model missing or query failed:', (err as any).message || err);
      return NextResponse.json({ error: 'Order model not found' }, { status: 500 });
    }

    return NextResponse.json(orders);
  } catch (err) {
    console.error('Orders fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
