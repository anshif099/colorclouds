document.documentElement.classList.add('js');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); }
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!e.target.closest('.nav-wrap')) closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();
const revealElements = document.querySelectorAll('.section-heading, .two-col > div, .eco-card, .philosophy-copy, .journey-panel, .cap, .flagship-box, .partner-card, .future-grid > div, .faq-grid > div, .contact-box > *');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('shown'); observer.unobserve(entry.target); } }), { threshold: .08 });
  revealElements.forEach(el => { el.classList.add('reveal'); observer.observe(el); });
}
const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress');
const backTop = document.querySelector('.back-top');
let pending = false;
function updateScroll() { const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%'; header.classList.toggle('scrolled', scrollY > 20); backTop.classList.toggle('visible', scrollY > 600); pending = false; }
window.addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(updateScroll); } }, { passive: true });
updateScroll();
if ('IntersectionObserver' in window) {
  const sections = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)); } }), { rootMargin: '-20% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sections.observe(section));
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => { const selected = b === button; b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected)); });
  document.querySelectorAll('.eco-card').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) card.classList.add('shown'); });
  updateScroll();
}));
document.querySelectorAll('.eco-card a').forEach(link => link.addEventListener('click', () => {
  const category = link.closest('.eco-card').dataset.category;
  document.getElementById('interest').value = ({ books: 'Books & publishing', stories: 'Content & licensing', create: 'Creative workshops', play: 'School & preschool programs', academy: 'School & preschool programs' })[category];
}));
document.getElementById('partnership-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const body = `Hello Colorclouds,\n\nName: ${values.get('name').trim()}\nEmail: ${values.get('email')}\nInterest: ${values.get('interest')}\n\n${values.get('message').trim()}\n\nLooking forward to connecting.`;
  window.location.href = `mailto:hello.colorcloudslearning@gmail.com?subject=${encodeURIComponent('Partnership enquiry — ' + values.get('interest'))}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-status').textContent = 'Your email draft is ready. Please send it from your email app. You can also contact us using the email link below.';
});
