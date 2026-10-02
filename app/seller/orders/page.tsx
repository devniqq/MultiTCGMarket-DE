import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function SellerOrdersPage() {
  const session = await auth();
  if (!session?.user) return redirect('/login');

  const sellerId = session.user.id as string;

  let orders = [] as any[];
  try {
    orders = await prisma.order.findMany({ where: { sellerId }, orderBy: { createdAt: 'desc' } });
  } catch (err) {
    console.warn('Unable to fetch orders (maybe Order model missing):', (err as any).message || err);
  }

  return (
    <main className="min-h-screen bg-brand-dark px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-black">Bestellungen</h1>
        </header>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">Keine Bestellungen gefunden.</div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">{new Date(o.createdAt).toLocaleString()}</div>
                  <div className="mt-1 font-bold">Bestellung #{o.id}</div>
                  <div className="text-sm text-slate-300">{o.buyerEmail}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-amber-400">€{Number(o.total ?? 0).toFixed(2)}</div>
                  <div className="text-sm text-slate-400">{o.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
