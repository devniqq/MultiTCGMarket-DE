document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const searchButton = document.querySelector('.search-box button');
  const searchInput = document.querySelector('.search-box input');
  const newsletterForm = document.querySelector('.newsletter-form');
  const productButtons = document.querySelectorAll('.product-card button');

  searchButton?.addEventListener('click', () => {
    const value = searchInput.value.trim();
    if (!value) {
      alert('Bitte geben Sie einen Suchbegriff ein.');
      return;
    }
    alert(`Suche nach: ${value}`);
  });

  newsletterForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = newsletterForm.querySelector('input');
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    alert('Danke! Sie haben sich für den Newsletter angemeldet.');
    newsletterForm.reset();
  });

  productButtons.forEach((button) => {
    button.addEventListener('click', () => {
      alert('Produkt wurde in den Warenkorb gelegt.');
    });
  });

  document.querySelector('.primary-btn')?.addEventListener('click', () => {
    document.getElementById('marktplatz')?.scrollIntoView({ behavior: 'smooth' });
  });
});
