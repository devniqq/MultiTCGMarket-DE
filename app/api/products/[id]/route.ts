"use client";

import { FormEvent, useState } from 'react';

export default function NewProductPage() {
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      title: String(form.get('title') || ''),
      category: String(form.get('category') || ''),
      rarity: String(form.get('rarity') || 'Rare'),
      condition: String(form.get('condition') || 'Sehr gut'),
      price: Number(form.get('price') || 0),
      seller: String(form.get('seller') || 'Seller'),
      rating: Number(form.get('rating') || 4.8),
      stock: Number(form.get('stock') || 1),
      image: String(form.get('image') || '🃏'),
      summary: String(form.get('summary') || ''),
    };

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setMessage('Produkt erfolgreich angelegt.');
      event.currentTarget.reset();
    } else {
      setMessage('Fehler beim Anlegen des Produkts.');
    }
  }

  return (
    <main className="min-h-screen bg-brand-dark px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-glow">
        <h1 className="mb-6 text-3xl font-black text-white">Neues Listing erstellen</h1>

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm text-slate-300">Titel</span>
            <input name="title" required className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Kategorie</span>
            <input name="category" required className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Seltenheit</span>
            <input name="rarity" defaultValue="Rare" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Zustand</span>
            <input name="condition" defaultValue="Sehr gut" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Preis</span>
            <input type="number" name="price" required min="0" step="0.01" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Verkäufer</span>
            <input name="seller" required className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Bewertung</span>
            <input type="number" name="rating" step="0.1" min="0" max="5" defaultValue={4.8} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Lagerbestand</span>
            <input type="number" name="stock" min="1" defaultValue={1} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Emoji / Symbol</span>
            <input name="image" defaultValue="🃏" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          </label>

          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm text-slate-300">Kurzbeschreibung</span>
            <input name="summary" required className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          </label>

          <button type="submit" className="md:col-span-2 rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 hover:bg-amber-400">
            Listing speichern
          </button>
        </form>

        {message && <p className="mt-6 text-sm text-emerald-400">{message}</p>}
      </div>
    </main>
  );
}
