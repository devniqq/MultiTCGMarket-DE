import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const [products, userCount, avgPrice, messageCount] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.user.count(),
    prisma.product.aggregate({ _avg: { price: true } }),
    prisma.message.count(),
  ]);

  return (
    <main className="min-h-screen bg-brand-dark px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-400">Seller Dashboard</p>
            <h1 className="mt-2 text-3xl font-black text-white">Hallo, {session.user.name}</h1>
          </div>
          <a href="/" className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-amber-400">Zurück zur Startseite</a>
        </header>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="text-sm text-slate-400">Gesamtprodukte</div>
            <div className="mt-3 text-3xl font-black text-white">{products.length}</div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="text-sm text-slate-400">Nutzer</div>
            <div className="mt-3 text-3xl font-black text-white">{userCount}</div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="text-sm text-slate-400">Ø. Preis</div>
            <div className="mt-3 text-3xl font-black text-white">€{Number(avgPrice._avg.price ?? 0).toFixed(2)}</div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="text-sm text-slate-400">Nachrichten</div>
            <div className="mt-3 text-3xl font-black text-white">{messageCount}</div>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glow">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black text-white">Produkte</h2>
            <a href="/products/new" className="rounded-xl bg-amber-500 px-4 py-2 font-semibold text-slate-950 hover:bg-amber-400">Neues Listing</a>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-3xl">{product.image}</span>
                  <span className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">{product.rarity}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{product.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{product.summary}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                  <span>{product.condition}</span>
                  <strong className="text-amber-400">€{Number(product.price).toFixed(2)}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
