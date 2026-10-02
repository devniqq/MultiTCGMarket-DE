import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { seller: true },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        title: body.title,
        category: body.category,
        rarity: body.rarity ?? 'Rare',
        condition: body.condition ?? 'Sehr gut',
        price: Number(body.price ?? 0),
        stock: Number(body.stock ?? 1),
        image: body.image ?? '🃏',
        summary: body.summary ?? '',
        description: body.description ?? body.summary ?? '',
        rating: Number(body.rating ?? 4.8),
        seller: {
          connect: {
            email: 'admin@multitcgmarket.de',
          },
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
