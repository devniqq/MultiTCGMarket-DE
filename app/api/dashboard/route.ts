import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const stats = await prisma.user.count();
    const productCount = await prisma.product.count();
    const avgPrice = await prisma.product.aggregate({
      _avg: { price: true },
    });

    return NextResponse.json({
      totalUsers: stats,
      totalProducts: productCount,
      averagePrice: avgPrice._avg.price ?? 0,
      revenue: '€45.2k',
      featuredSeller: 'Monarch Store',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
