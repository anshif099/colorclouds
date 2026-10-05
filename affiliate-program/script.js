const toggle = document.querySelector('.nav-toggle');
const navigation = document.getElementById('main-nav');
function closeMenu() {
  navigation.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
}
toggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 950) closeMenu(); });

const faqExpand = document.querySelector('.faq-expand-button');
const faqItems = [...document.querySelectorAll('.affiliate-faq-item')];
function updateFaqControl() {
  const allOpen = faqItems.every(item => item.open);
  faqExpand.setAttribute('aria-expanded', String(allOpen));
  faqExpand.replaceChildren(document.createTextNode(allOpen ? 'Close All FAQs ' : 'View All FAQs '));
  const arrow = document.createElement('span');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '→';
  faqExpand.append(arrow);
}
faqExpand.addEventListener('click', () => {
  const open = faqItems.some(item => !item.open);
  faqItems.forEach(item => { item.open = open; });
  updateFaqControl();
});
faqItems.forEach(item => item.addEventListener('toggle', updateFaqControl));

const header = document.querySelector('.site-header');
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 20); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
