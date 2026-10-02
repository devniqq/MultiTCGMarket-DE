import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { seller: true, reviews: { include: { author: true } } },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-dark px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-glow">
        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 text-8xl">
            {product.image}
          </div>

          <div>
            <div className="mb-3 inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-300">
              {product.category}
            </div>
            <h1 className="text-4xl font-black text-white">{product.title}</h1>
            <p className="mt-3 text-slate-300">{product.summary}</p>

            <div className="mt-6 flex items-center gap-3 text-sm text-slate-300">
              <span>Verkäufer: {product.seller.name}</span>
              <span>•</span>
              <span>★ {Number(product.rating).toFixed(1)}</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="text-4xl font-black text-amber-400">€{Number(product.price).toFixed(2)}</div>
              <div className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">{product.condition}</div>
            </div>

            <button className="mt-8 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-400">
              Jetzt kaufen
            </button>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-slate-300">
              {product.description}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-black text-white">Bewertungen</h2>
          <div className="space-y-4">
            {product.reviews.length === 0 ? (
              <p className="text-slate-400">Noch keine Bewertungen vorhanden.</p>
            ) : (
              product.reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <strong className="text-white">{review.author.name}</strong>
                    <span className="text-amber-400">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  </div>
                  <p className="text-slate-300">{review.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
