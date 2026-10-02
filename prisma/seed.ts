import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    title: 'Charizard EX',
    category: 'Pokémon',
    rarity: 'Holo',
    condition: 'Sehr gut',
    price: 24.99,
    seller: 'N64Cards',
    rating: 4.9,
    stock: 8,
    image: '🔴',
    summary: 'Scarlet & Violet • NM',
    description: 'Charizard EX in sehr gutem Zustand mit sauberer Hülle und hochwertigem Schutz.',
  },
  {
    title: 'Blue-Eyes White Dragon',
    category: 'Yu-Gi-Oh!',
    rarity: 'Ultra Rare',
    condition: 'Mint',
    price: 89.99,
    seller: 'DuelVault',
    rating: 5.0,
    stock: 3,
    image: '⚡',
    summary: '1st Edition • Mint',
    description: 'Legendäre Blue-Eyes White Dragon für Sammler mit perfektem Zustand.',
  },
  {
    title: 'Monkey D. Luffy',
    category: 'One Piece',
    rarity: 'Secret Rare',
    condition: 'Mint',
    price: 32.0,
    seller: 'StrawHatStore',
    rating: 4.8,
    stock: 4,
    image: '🏴‍☠️',
    summary: 'Starter Deck • PSA 10',
    description: 'Premium One Piece Karte mit sehr starkem Sammlerwert und sorgfältiger Lagerung.',
  },
  {
    title: 'Pikachu VMAX',
    category: 'Pokémon',
    rarity: 'Holo',
    condition: 'Gut',
    price: 18.5,
    seller: 'SparkMarket',
    rating: 4.7,
    stock: 10,
    image: '⚡',
    summary: 'Crown Zenith • EX',
    description: 'Leichte Gebrauchsspuren, aber sehr gut für Sammelanfänger und fortgeschrittene Sammler.',
  },
  {
    title: 'Roronoa Zoro',
    category: 'One Piece',
    rarity: 'Rare',
    condition: 'Sehr gut',
    price: 15.5,
    seller: 'SkyDeck',
    rating: 4.9,
    stock: 9,
    image: '🗡️',
    summary: 'Promo Pack • NM',
    description: 'Sehr schöne Zoro Karte mit sauberer Oberfläche und hochwertiger Aufbewahrung.',
  },
  {
    title: 'Dark Magician',
    category: 'Yu-Gi-Oh!',
    rarity: 'Ultra Rare',
    condition: 'Mint',
    price: 75.5,
    seller: 'MagicWave',
    rating: 5.0,
    stock: 2,
    image: '🔮',
    summary: '1st Edition • Mint',
    description: 'Dark Magician in perfektem Zustand, sofort für Investoren und Sammler interessant.',
  },
];

async function main() {
  await prisma.user.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.order.deleteMany({});

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@multitcgmarket.de',
      passwordHash: '$2a$10$QmH9fZ7mZl6g7WQwG8l1L.2L9mL9vM9sKQwM5QTdA3Ppqh8E7KcEq',
      role: 'ADMIN',
      isVerified: true,
      phone: '+49123456789',
    },
  });

  for (const product of products) {
    await prisma.product.create({
      data: {
        title: product.title,
        category: product.category,
        rarity: product.rarity,
        condition: product.condition,
        price: product.price,
        stock: product.stock,
        image: product.image,
        summary: product.summary,
        description: product.description,
        rating: product.rating,
        seller: {
          connect: { id: admin.id },
        },
      },
    });
  }

  const listedProducts = await prisma.product.findMany();

  for (const product of listedProducts.slice(0, 3)) {
    await prisma.review.create({
      data: {
        product: { connect: { id: product.id } },
        author: { connect: { id: admin.id } },
        rating: 5,
        text: 'Ausgezeichneter Zustand, schneller Versand und sehr gute Verpackung.',
      },
    });
  }

  await prisma.message.createMany({
    data: [
      {
        senderId: admin.id,
        receiverId: admin.id,
        subject: 'Versand',
        content: 'Dein Paket wird heute noch verschickt.',
      },
      {
        senderId: admin.id,
        receiverId: admin.id,
        subject: 'Rückfrage',
        content: 'Kann ich dir die Karte noch in einer weiteren Qualität liefern?',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
