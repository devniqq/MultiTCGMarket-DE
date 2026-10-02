const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'mtcg.db');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('DB connection failed', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname));

const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('hex');

const run = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });

const get = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });

const all = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

async function initializeDb() {
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'buyer',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      rarity TEXT NOT NULL,
      condition TEXT NOT NULL,
      price REAL NOT NULL,
      seller TEXT NOT NULL,
      rating REAL DEFAULT 0,
      stock INTEGER DEFAULT 1,
      image TEXT NOT NULL,
      summary TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender TEXT NOT NULL,
      receiver TEXT NOT NULL,
      subject TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const count = await get('SELECT COUNT(*) AS total FROM products');
  if (!count || count.total === 0) {
    const products = [
      {
        title: 'Charizard EX', category: 'Pokémon', rarity: 'Holo', condition: 'Sehr gut',
        price: 24.99, seller: 'N64Cards', rating: 4.9, stock: 8,
        image: '🔴', summary: 'Scarlet & Violet • NM'
      },
      {
        title: 'Blue-Eyes White Dragon', category: 'Yu-Gi-Oh!', rarity: 'Ultra Rare', condition: 'Mint',
        price: 89.99, seller: 'DuelVault', rating: 5.0, stock: 3,
        image: '⚡', summary: '1st Edition • Mint'
      },
      {
        title: 'Monkey D. Luffy', category: 'One Piece', rarity: 'Secret Rare', condition: 'Mint',
        price: 32.0, seller: 'StrawHatStore', rating: 4.8, stock: 4,
        image: '🏴‍☠️', summary: 'Starter Deck • PSA 10'
      },
      {
        title: 'Pikachu VMAX', category: 'Pokémon', rarity: 'Holo', condition: 'Gut',
        price: 18.5, seller: 'SparkMarket', rating: 4.7, stock: 10,
        image: '⚡', summary: 'Crown Zenith • EX'
      },
      {
        title: 'Roronoa Zoro', category: 'One Piece', rarity: 'Rare', condition: 'Sehr gut',
        price: 15.5, seller: 'SkyDeck', rating: 4.9, stock: 9,
        image: '🗡️', summary: 'Promo Pack • NM'
      },
      {
        title: 'Dark Magician', category: 'Yu-Gi-Oh!', rarity: 'Ultra Rare', condition: 'Mint',
        price: 75.5, seller: 'MagicWave', rating: 5.0, stock: 2,
        image: '🔮', summary: '1st Edition • Mint'
      }
    ];

    for (const product of products) {
      await run(
        `INSERT INTO products (title, category, rarity, condition, price, seller, rating, stock, image, summary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [product.title, product.category, product.rarity, product.condition, product.price, product.seller, product.rating, product.stock, product.image, product.summary]
      );
    }
  }

  const messageCount = await get('SELECT COUNT(*) AS total FROM messages');
  if (!messageCount || messageCount.total === 0) {
    const seedMessages = [
      { sender: 'N64Cards', receiver: 'You', subject: 'Versand', content: 'Dein Paket wird heute noch verschickt.' },
      { sender: 'DuelVault', receiver: 'You', subject: 'Rückfrage', content: 'Kann ich dir die Karte noch in einer weiteren Qualität liefern?' },
      { sender: 'MagicWave', receiver: 'You', subject: 'Preis', content: 'Ich kann den Preis für größere Pakete noch anpassen.' }
    ];

    for (const message of seedMessages) {
      await run(
        `INSERT INTO messages (sender, receiver, subject, content) VALUES (?, ?, ?, ?)`,
        [message.sender, message.receiver, message.subject, message.content]
      );
    }
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/products', async (req, res) => {
  try {
    const rows = await all('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await get('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!product) return res.status(404).json({ error: 'Produkt nicht gefunden' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/listings', async (req, res) => {
  const { title, category, rarity, condition, price, seller, rating = 4.8, stock = 1, image = '🃏', summary = '' } = req.body || {};

  if (!title || !category || !price || !seller) {
    return res.status(400).json({ error: 'Bitte Titel, Kategorie, Preis und Verkäufer angeben.' });
  }

  try {
    const result = await run(
      `INSERT INTO products (title, category, rarity, condition, price, seller, rating, stock, image, summary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, category, rarity || 'Rare', condition || 'Sehr gut', Number(price), seller, rating, Number(stock), image, summary]
    );
    const product = await get('SELECT * FROM products WHERE id = ?', [result.id]);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, E-Mail und Passwort sind erforderlich.' });
  }

  const existing = await get('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
  if (existing) {
    return res.status(409).json({ error: 'Ein Konto mit dieser E-Mail existiert bereits.' });
  }

  try {
    const result = await run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email.toLowerCase(), hashPassword(password), 'buyer']
    );

    const user = await get('SELECT id, name, email, role FROM users WHERE id = ?', [result.id]);
    return res.status(201).json({ message: 'Registrierung erfolgreich.', user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'E-Mail und Passwort erforderlich.' });
  }

  try {
    const user = await get('SELECT id, name, email, role FROM users WHERE email = ?', [email.toLowerCase()]);
    if (!user) return res.status(401).json({ error: 'Benutzer nicht gefunden.' });

    const dbPasswordHash = await get('SELECT password FROM users WHERE email = ?', [email.toLowerCase()]);
    if (!dbPasswordHash || dbPasswordHash.password !== hashPassword(password)) {
      return res.status(401).json({ error: 'Falsches Passwort.' });
    }

    return res.json({ message: 'Login erfolgreich.', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/dashboard', async (req, res) => {
  try {
    const products = await all('SELECT * FROM products');
    const userCount = await get('SELECT COUNT(*) AS total FROM users');
    const averagePrice = await get('SELECT AVG(price) AS value FROM products');
    const messageCount = await get('SELECT COUNT(*) AS total FROM messages');

    res.json({
      totalUsers: userCount.total,
      totalProducts: products.length,
      averagePrice: Number(averagePrice.value || 0).toFixed(2),
      totalMessages: messageCount.total,
      featuredSeller: 'Monarch Store',
      revenue: '€45.2k'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const rows = await all('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  const { productId, buyer, amount } = req.body || {};
  if (!productId || !buyer || !amount) {
    return res.status(400).json({ error: 'Produkt, Käufer und Betrag sind erforderlich.' });
  }

  return res.status(201).json({
    status: 'paid',
    message: 'Zahlung erfolgreich verarbeitet. Der Händler wurde benachrichtigt.',
    orderId: `MTG-${Date.now()}`,
    productId,
    buyer,
    amount
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

initializeDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MultiTCGMarket server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });

process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});
