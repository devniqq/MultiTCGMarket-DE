"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '');
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(result.error ?? 'Registrierung fehlgeschlagen');
      return;
    }

    router.push('/login');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-dark px-6 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-glow">
        <div className="mb-8 text-center">
          <div className="mb-3 text-3xl">🃏</div>
          <h1 className="text-3xl font-black text-white">Konto erstellen</h1>
          <p className="mt-2 text-sm text-slate-400">Registriere dich für den Premium-Marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Name</span>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
              placeholder="Dein Name"
            />
          </label>

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
              minLength={6}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-400"
              placeholder="Mindestens 6 Zeichen"
            />
          </label>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-70"
          >
            {loading ? 'Registrierung...' : 'Registrieren'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Bereits registriert?{' '}
          <Link href="/login" className="font-semibold text-amber-400 hover:text-amber-300">
            Jetzt einloggen
          </Link>
        </p>
      </div>
    </main>
  );
}
