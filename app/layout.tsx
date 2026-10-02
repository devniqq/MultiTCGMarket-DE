const featuredProducts = [
  { id: 'p1', title: 'Charizard EX', price: 24.99, condition: 'Sehr gut', seller: 'N64Cards', rating: 4.9, rarity: 'Holo', category: 'Pokémon', emoji: '🔴', summary: 'Scarlet & Violet • NM' },
  { id: 'p2', title: 'Blue-Eyes White Dragon', price: 89.99, condition: 'Mint', seller: 'DuelVault', rating: 5.0, rarity: 'Ultra Rare', category: 'Yu-Gi-Oh!', emoji: '⚡', summary: '1st Edition • Mint' },
  { id: 'p3', title: 'Monkey D. Luffy', price: 32.0, condition: 'Mint', seller: 'StrawHatStore', rating: 4.8, rarity: 'Secret', category: 'One Piece', emoji: '🏴‍☠️', summary: 'Starter Deck • PSA 10' },
  { id: 'p4', title: 'Pikachu VMAX', price: 18.5, condition: 'Gut', seller: 'SparkMarket', rating: 4.7, rarity: 'Holo', category: 'Pokémon', emoji: '⚡', summary: 'Crown Zenith • EX' },
  { id: 'p5', title: 'Roronoa Zoro', price: 15.5, condition: 'Sehr gut', seller: 'SkyDeck', rating: 4.9, rarity: 'Rare', category: 'One Piece', emoji: '🗡️', summary: 'Promo Pack • NM' },
  { id: 'p6', title: 'Dark Magician', price: 75.5, condition: 'Mint', seller: 'MagicWave', rating: 5.0, rarity: 'Ultra Rare', category: 'Yu-Gi-Oh!', emoji: '🔮', summary: '1st Edition • Mint' },
];

const reviews = [
  { name: 'Luca M.', title: 'Charizard EX', rating: 5, text: 'Perfekte Verpackung und schnell versendet.' },
  { name: 'Mara K.', title: 'Dark Magician', rating: 5, text: 'Zustand entsprach 1:1 der Beschreibung.' },
  { name: 'Noah B.', title: 'Pikachu VMAX', rating: 4, text: 'Sehr gutes Preis-Leistungs-Verhältnis.' },
];

const messages = [
  { sender: 'N64Cards', subject: 'Versand', content: 'Dein Paket wird heute noch verschickt.' },
  { sender: 'DuelVault', subject: 'Rückfrage', content: 'Ich kann dir die Karte noch in einer anderen Quali liefern.' },
  { sender: 'MagicWave', subject: 'Preis', content: 'Ich habe den Preis für größere Bestellungen angepasst.' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-dark text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3 text-xl font-black tracking-tight text-amber-400">
            <span className="text-2xl">🃏</span>
            <span>MultiTCGMarket</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#categories" className="hover:text-white">Kategorien</a>
            <a href="#featured" className="hover:text-white">Featured</a>
            <a href="#seller" className="hover:text-white">Seller</a>
            <a href="#app" className="hover:text-white">App</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-amber-400 hover:text-white">Anmelden</a>
            <a href="/register" className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400">Registrieren</a>
          </div>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Europas Premium Marketplace
            </div>
            <h1 className="max-w-xl text-5xl font-black tracking-tight text-white md:text-6xl">
              Mehr Auswahl. Mehr Vertrauen. Mehr Sammelglück.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-300">
              Entdecke exklusive Pokémon-, One Piece- und Yu-Gi-Oh!-Karten mit echtem Shop-Look, sicheren Transaktionen,
              Bewertungen, Seller-Portal und einer echten E-Commerce-Architektur.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#featured" className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-slate-950 shadow-glow hover:bg-amber-400">Jetzt entdecken</a>
              <a href="/register" className="rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-white hover:border-sky-400">Verkaufen</a>
            </div>

            <div className="mt-10 flex flex-wrap gap-10 text-left">
              <div>
                <div className="text-3xl font-black text-white">3.080+</div>
                <div className="text-slate-400">Listings</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">1.250+</div>
                <div className="text-slate-400">Verkäufer</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">95.000+</div>
                <div className="text-slate-400">Käufer</div>
              </div>
            </div>
          </div>

          <div className="relative h-[420px]">
            <div className="absolute -left-4 top-10 animate-float rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-300 to-yellow-600 p-5 shadow-glow">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-950/80">Holo</div>
              <div className="text-xl font-bold text-slate-950">Charizard EX</div>
              <div className="mt-6 text-lg font-black text-slate-950">€24,99</div>
            </div>

            <div className="absolute right-6 top-20 animate-float rounded-2xl border border-rose-400/30 bg-gradient-to-br from-pink-500 to-rose-600 p-5 shadow-glow">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Ultra Rare</div>
              <div className="text-xl font-bold text-white">Blue-Eyes</div>
              <div className="mt-6 text-lg font-black text-white">€89,99</div>
            </div>

            <div className="absolute bottom-0 right-8 w-[300px] rounded-2xl border border-slate-700 bg-slate-900/80 p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-400">
                <span>Live Market</span>
                <span className="text-emerald-400">●</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Top Preis</div>
                  <div className="mt-2 text-2xl font-black text-white">€118,50</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Verkäufe</div>
                  <div className="mt-2 text-2xl font-black text-white">1.482</div>
                </div>
              </div>
              <div className="mt-6 flex items-end gap-2">
                <span className="h-10 w-2 rounded bg-emerald-400"></span>
                <span className="h-16 w-2 rounded bg-emerald-300"></span>
                <span className="h-20 w-2 rounded bg-amber-400"></span>
                <span className="h-12 w-2 rounded bg-sky-400"></span>
                <span className="h-24 w-2 rounded bg-amber-500"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-950/80">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-5 text-sm text-slate-300 md:grid-cols-4">
          <div className="text-center">✅ 100% sichere Käuferschutz</div>
          <div className="text-center">🚚 Europäischer Versand</div>
          <div className="text-center">🔒 Verifizierte Händler</div>
          <div className="text-center">💬 Bewertungen & Messaging</div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Top Kategorien</p>
          <h2 className="text-4xl font-black tracking-tight text-white">Pokémon, One Piece und Yu-Gi-Oh! – alles an einem Ort.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: 'Pokémon', subtitle: 'Gotta Catch ’em All', emoji: '🔴', label: '1.250+ Angebote', tone: 'from-red-500 to-orange-400' },
            { name: 'One Piece', subtitle: 'Auf dem Weg zur Grand Line', emoji: '🏴‍☠️', label: '850+ Angebote', tone: 'from-amber-400 to-yellow-500' },
            { name: 'Yu-Gi-Oh!', subtitle: 'Zeit zum Duel', emoji: '⚡', label: '980+ Angebote', tone: 'from-violet-500 to-indigo-500' },
          ].map((item) => (
            <article key={item.name} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <div className={`flex h-56 items-center justify-center bg-gradient-to-br ${item.tone} text-7xl`}>
                {item.emoji}
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold text-white">{item.name}</h3>
                <p className="mt-2 text-slate-300">{item.subtitle}</p>
              </div>
              <div className="border-t border-slate-800 bg-slate-950 px-6 py-4 text-sm font-medium text-slate-300">{item.label}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="featured" className="bg-slate-950/80 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Beliebte Listings</p>
              <h2 className="text-4xl font-black tracking-tight text-white">Neu und top bewertet</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Alle', 'Pokémon', 'One Piece', 'Yu-Gi-Oh!'].map((chip, index) => (
                <button key={chip} className={`rounded-full border px-4 py-2 text-sm ${index === 0 ? 'border-amber-400 bg-amber-500 text-slate-950' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'}`}>
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-glow">
                <div className={`flex h-52 items-center justify-center bg-gradient-to-br ${product.category === 'Pokémon' ? 'from-red-400 to-orange-500' : product.category === 'One Piece' ? 'from-amber-400 to-yellow-500' : 'from-violet-500 to-indigo-500'} text-7xl`}>
                  {product.emoji}
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                    <span>Von: {product.seller}</span>
                    <span>★ {product.rating}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                  <p className="mt-2 text-slate-300">{product.summary}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-2xl font-black text-amber-400">€{product.price.toFixed(2)}</div>
                    <div className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">{product.condition}</div>
                  </div>
                  <button className="mt-5 w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 hover:bg-amber-400">In den Warenkorb</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="seller" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Für Sammler & Verkäufer</p>
            <h2 className="text-4xl font-black tracking-tight text-white">Mehr als ein Marktplatz — ein komplettes TCG-Ökosystem.</h2>
            <ul className="mt-8 space-y-4 text-lg text-slate-300">
              <li>• Verkauf von Karten, Booster und Produkten mit Premium-Displays</li>
              <li>• Seller-Portal mit Bestellungen, Verkäufen und Statistiken</li>
              <li>• Authentifizierung mit Login/Register und SMS-Verifizierung</li>
              <li>• Stripe / PayPal / Krypto-Checkout-Flow für echte Transaktionen</li>
            </ul>
            <a href="/register" className="mt-8 inline-block rounded-xl bg-amber-500 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-400">Jetzt Händler werden</a>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glow">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 font-black text-slate-950">MS</div>
              <div>
                <div className="text-xl font-bold text-white">Monarch Store</div>
                <div className="text-sm text-slate-400">Top Händler • 4.9/5</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Verkäufe</div>
                <div className="mt-2 text-3xl font-black text-white">1.482</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Revenue</div>
                <div className="mt-2 text-3xl font-black text-white">€45.2k</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {['Charizard EX', 'Dark Magician', 'Pikachu VMAX'].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-200">
                  <span>{item}</span>
                  <strong className="text-amber-400">€{[24.99, 75.5, 18.5][index].toFixed(2)}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950/80 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glow">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Produktbewertungen</h3>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">Live</span>
            </div>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.name} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <strong className="text-white">{review.name}</strong>
                    <span className="text-amber-400">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  </div>
                  <div className="mb-1 text-sm font-semibold text-slate-300">{review.title}</div>
                  <p className="text-slate-400">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-glow">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Nachrichten</h3>
              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">System</span>
            </div>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.sender} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <strong className="text-white">{message.sender}</strong>
                    <small className="text-slate-500">{message.subject}</small>
                  </div>
                  <p className="text-slate-400">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="app" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Mobile App</p>
            <h2 className="text-4xl font-black tracking-tight text-white">Das Marketplace-Erlebnis auch unterwegs.</h2>
            <ul className="mt-8 space-y-4 text-lg text-slate-300">
              <li>• Einfaches Scannen von Karten und Sets</li>
              <li>• Realtime-Alerts für neue Angebote</li>
              <li>• Verläufe, Nachrichten und Status im Mobilgerät</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <div className="relative h-[520px] w-[260px] rounded-[36px] border-[10px] border-slate-700 bg-slate-950 p-3 shadow-glow">
              <div className="flex h-full flex-col rounded-[28px] bg-gradient-to-b from-slate-900 to-slate-950 p-4">
                <div className="mb-4 text-right text-sm text-slate-300">9:41</div>
                <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white shadow-lg">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-100/80">🔥 Top Deal</div>
                  <div className="mt-4 text-xl font-black">Blue-Eyes</div>
                  <div className="mt-2 text-sm">€89,99</div>
                </div>
                <div className="mt-6 space-y-3 text-sm text-slate-200">
                  <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">Charizard EX</div>
                  <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">Dark Magician</div>
                  <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">Pikachu VMAX</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[32px] border border-slate-800 bg-slate-900/80 px-6 py-8 shadow-glow md:flex md:items-center md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Exklusive Deals</div>
            <h2 className="mt-2 text-3xl font-black text-white">Bleib auf dem Laufenden.</h2>
          </div>
          <form className="mt-6 flex w-full max-w-xl gap-3 md:mt-0">
            <input type="email" placeholder="Deine E-Mail-Adresse" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 outline-none ring-0 placeholder:text-slate-500 focus:border-amber-400" />
            <button className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-400">Abonnieren</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950/90">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xl font-black text-amber-400">
              <span>🃏</span>
              <span>MultiTCGMarket</span>
            </div>
            <p className="text-slate-400">Der europäische Premium-Marketplace für TCG-Sammler und Händler.</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-400">Top-Kategorien</h4>
            <ul className="space-y-2 text-slate-300">
              <li>Pokémon</li>
              <li>One Piece</li>
              <li>Yu-Gi-Oh!</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-400">Unternehmen</h4>
            <ul className="space-y-2 text-slate-300">
              <li>Über uns</li>
              <li>Kontakt</li>
              <li>Hilfe</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-400">Rechtliches</h4>
            <ul className="space-y-2 text-slate-300">
              <li>Datenschutz</li>
              <li>AGB</li>
              <li>Impressum</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
