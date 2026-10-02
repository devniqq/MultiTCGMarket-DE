"use client";

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Login fehlgeschlagen. Bitte prüfe deine Daten.');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-dark px-6 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-glow">
        <div className="mb-8 text-center">
          <div className="mb-3 text-3xl">🃏</div>
          <h1 className="text-3xl font-black text-white">Einloggen</h1>
          <p className="mt-2 text-sm text-slate-400">Willkommen zurück bei MultiTCGMarket</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">E-Mail</span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
              placeholder="name@email.de"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Passwort</span>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
              placeholder="••••••••"
            />
          </label>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-70"
          >
            {loading ? 'Anmeldung...' : 'Einloggen'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Noch kein Konto?{' '}
          <Link href="/register" className="font-semibold text-amber-400 hover:text-amber-300">
            Jetzt registrieren
          </Link>
        </p>
      </div>
    </main>
  );
}
