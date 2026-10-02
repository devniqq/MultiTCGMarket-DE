const $ = (selector) => document.querySelector(selector);

const showToast = (message) => {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
};

const loader = $('.loader');
if (loader) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1400);
  });
}

const openModal = (tab = 'login') => {
  const modal = $('#authModal');
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');

  const loginTab = document.querySelector('[data-auth-tab="login"]');
  const registerTab = document.querySelector('[data-auth-tab="register"]');
  const loginForm = $('#loginForm');
  const registerForm = $('#registerForm');

  if (tab === 'register') {
    loginTab?.classList.remove('active');
    registerTab?.classList.add('active');
    loginForm?.classList.remove('active');
    registerForm?.classList.add('active');
  } else {
    registerTab?.classList.remove('active');
    loginTab?.classList.add('active');
    registerForm?.classList.remove('active');
    loginForm?.classList.add('active');
  }
};

const closeModal = () => {
  const modal = $('#authModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
};

const bindAuthButtons = () => {
  document.querySelectorAll('[data-open-auth]').forEach((button) => {
    button.addEventListener('click', () => {
      openModal(button.dataset.openAuth || 'login');
    });
  });

  document.querySelectorAll('[data-close="authModal"]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  $('.modal-close')?.addEventListener('click', closeModal);

  document.querySelectorAll('.auth-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      openModal(tab.dataset.authTab || 'login');
    });
  });

  $('#loginForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      email: form.email.value.trim(),
      password: form.password.value.trim()
    };

    if (!data.email || !data.password) {
      showToast('Bitte E-Mail und Passwort eingeben.');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Login fehlgeschlagen');
      localStorage.setItem('mtcgUser', JSON.stringify(result.user));
      showToast('Login erfolgreich');
      closeModal();
    } catch (error) {
      showToast(error.message || 'Login fehlgeschlagen');
    }
  });

  $('#registerForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim()
    };

    if (!data.name || !data.email || data.password.length < 6) {
      showToast('Bitte gültige Angaben mit mindestens 6 Zeichen Passwort eingeben.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Registrierung fehlgeschlagen');
      localStorage.setItem('mtcgUser', JSON.stringify(result.user));
      showToast('Registrierung erfolgreich');
      closeModal();
    } catch (error) {
      showToast(error.message || 'Registrierung fehlgeschlagen');
    }
  });
};

const renderProductCard = (product) => `
  <article class="product-card" data-search="${(product.title + ' ' + product.category + ' ' + product.rarity + ' ' + product.summary).toLowerCase()}">
    <div class="thumb thumb-${(product.id % 6) + 1}">
      <span class="badge">${product.rarity}</span>
      <div class="thumb-emoji">${product.image}</div>
    </div>
    <div class="card-body">
      <div class="card-topline">
        <span class="vendor">Von: ${product.seller}</span>
        <span class="rating">★ ${Number(product.rating).toFixed(1)}</span>
      </div>
      <h3>${product.title}</h3>
      <p>${product.summary}</p>
      <div class="meta-row">
        <span class="price">€${Number(product.price).toFixed(2)}</span>
        <span class="condition">${product.condition}</span>
      </div>
      <button type="button" class="product-btn" data-product-id="${product.id}">In den Warenkorb</button>
    </div>
  </article>
`;

const renderProducts = (products) => {
  const productGrid = $('#productGrid');
  if (!productGrid) return;

  if (!products || !products.length) {
    productGrid.innerHTML = '<div class="empty-state">Keine Produkte gefunden.</div>';
    return;
  }

  productGrid.innerHTML = products.map(renderProductCard).join('');

  productGrid.querySelectorAll('.product-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const productId = button.dataset.productId;
      const product = products.find((entry) => String(entry.id) === String(productId));
      if (!product) return;

      const buyer = JSON.parse(localStorage.getItem('mtcgUser') || 'null')?.name || 'Gast';
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, buyer, amount: Number(product.price).toFixed(2) })
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Bestellung fehlgeschlagen');
        showToast(result.message || 'Erfolgreich bestellt');
      } catch (error) {
        showToast(error.message || 'Bestellung fehlgeschlagen');
      }
    });
  });
};

const renderSellerDashboard = (dashboard) => {
  const sellerStats = $('#sellerStats');
  if (!sellerStats) return;

  sellerStats.innerHTML = `
    <div>
      <small>Verkäufe</small>
      <strong>${dashboard.totalProducts || 1.482}</strong>
    </div>
    <div>
      <small>Revenue</small>
      <strong>${dashboard.revenue || '€45.2k'}</strong>
    </div>
  `;
};

const renderSellerListing = (products) => {
  const sellerListing = $('#sellerListing');
  if (!sellerListing) return;

  sellerListing.innerHTML = products.slice(0, 3).map((product) => `
    <div class="listing-row">
      <span>${product.title}</span>
      <strong>€${Number(product.price).toFixed(2)}</strong>
    </div>
  `).join('');
};

const renderReviews = (products) => {
  const reviewsList = $('#reviewsList');
  if (!reviewsList) return;

  const reviews = [
    { name: 'Luca M.', title: 'Charizard EX', rating: 5, text: 'Sehr hochwertige Karte, perfekte Verpackung und super schneller Versand.' },
    { name: 'Mara K.', title: 'Dark Magician', rating: 5, text: 'Zustand war wie beschrieben, genau das, was ich gesucht habe.' },
    { name: 'Noah B.', title: 'Pikachu VMAX', rating: 4, text: 'Preis-Leistung sehr gut. Händler war freundlich und schnell.' }
  ];

  reviewsList.innerHTML = reviews.map((review) => `
    <div class="review-item">
      <div class="review-top">
        <strong>${review.name}</strong>
        <span>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
      </div>
      <p class="review-title">${review.title}</p>
      <p>${review.text}</p>
    </div>
  `).join('');
};

const renderMessages = (messages) => {
  const messageList = $('#messageList');
  if (!messageList) return;

  messageList.innerHTML = messages.slice(0, 4).map((message) => `
    <div class="message-item">
      <div class="message-head">
        <strong>${message.sender}</strong>
        <small>${message.subject}</small>
      </div>
      <p>${message.content}</p>
    </div>
  `).join('');
};

const fetchProducts = async () => {
  const response = await fetch('/api/products');
  if (!response.ok) throw new Error('Produkte konnten nicht geladen werden');
  return response.json();
};

const fetchDashboard = async () => {
  const response = await fetch('/api/dashboard');
  if (!response.ok) throw new Error('Dashboard konnte nicht geladen werden');
  return response.json();
};

const fetchMessages = async () => {
  const response = await fetch('/api/messages');
  if (!response.ok) throw new Error('Nachrichten konnten nicht geladen werden');
  return response.json();
};

const bindSearch = () => {
  const searchInput = $('#searchInput');
  const searchButton = $('#searchButton');

  const applySearch = () => {
    const value = searchInput?.value.trim().toLowerCase() || '';
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => {
      const matches = !value || (card.dataset.search || '').includes(value);
      card.style.display = matches ? '' : 'none';
    });
  };

  searchButton?.addEventListener('click', applySearch);
  searchInput?.addEventListener('input', applySearch);
};

const bindNewsletter = () => {
  $('.newsletter-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    const email = input?.value.trim();
    if (!email || !email.includes('@')) {
      showToast('Bitte gültige E-Mail-Adresse eingeben.');
      return;
    }
    showToast('Danke! Du bist für den Newsletter angemeldet.');
    event.currentTarget.reset();
  });
};

const bindPrimaryButtons = () => {
  document.querySelectorAll('.primary-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.getElementById('featured');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  bindAuthButtons();
  bindNewsletter();
  bindSearch();
  bindPrimaryButtons();

  try {
    const [products, dashboard, messages] = await Promise.all([
      fetchProducts(),
      fetchDashboard(),
      fetchMessages()
    ]);

    renderProducts(products);
    renderSellerDashboard(dashboard);
    renderSellerListing(products);
    renderReviews(products);
    renderMessages(messages);

    const heroListings = document.getElementById('heroListings');
    if (heroListings) {
      heroListings.textContent = `${products.length + 3}.0${products.length >= 6 ? '80' : '80'}+`;
    }
  } catch (error) {
    showToast(error.message || 'Laden fehlgeschlagen');
    renderProducts([]);
    renderSellerDashboard({ totalProducts: 1482, revenue: '€45.2k' });
    renderMessages([
      { sender: 'N64Cards', subject: 'Versand', content: 'Dein Paket wird heute noch verschickt.' },
      { sender: 'DuelVault', subject: 'Rückfrage', content: 'Kann ich dir die Karte noch in einer weiteren Qualität liefern?' }
    ]);
    renderReviews([]);
  }
});
