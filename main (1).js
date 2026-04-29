// Carolina Santos Studios — main.js

// Nav scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', false);
  nav.classList.toggle('solid', window.scrollY > 50);
}, { passive: true });

// Hamburger
const burger = document.querySelector('.burger');
const drawer = document.querySelector('.drawer');
if (burger) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    drawer.classList.toggle('open');
  });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    drawer.classList.remove('open');
  }));
}

// Active nav link
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a, .drawer a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// Fade-in on scroll
const fis = document.querySelectorAll('.fi');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
fis.forEach(el => io.observe(el));

// Gallery filters
document.querySelectorAll('.g-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.g-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.masonry__item').forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.cat === filter) ? 'block' : 'none';
    });
  });
});

// Lightbox
const lb = document.querySelector('.lightbox');
const lbImg = document.querySelector('.lightbox img');
const lbClose = document.querySelector('.lightbox__close');
document.querySelectorAll('.masonry__item').forEach(item => {
  item.addEventListener('click', () => {
    if (!lb) return;
    lbImg.src = item.querySelector('img').src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
function closeLb() { if (lb) { lb.classList.remove('open'); document.body.style.overflow = ''; } }
if (lbClose) lbClose.addEventListener('click', closeLb);
if (lb) lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

// Contact form
const form = document.getElementById('contactForm');
const msg  = document.getElementById('formMsg');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Sending…'; btn.disabled = true;
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) { msg.textContent = '✓ Message sent! We\'ll be in touch soon.'; msg.className = 'form-msg ok'; form.reset(); }
      else throw new Error();
    } catch { msg.textContent = 'Something went wrong. Please email us directly.'; msg.className = 'form-msg err'; }
    btn.textContent = 'Send Message'; btn.disabled = false;
  });
}
