const toggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-navigation');
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
document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });

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

const contactDialog = document.getElementById('contact-dialog');
document.querySelector('.contact-trigger').addEventListener('click', () => {
  closeMenu();
  contactDialog.showModal();
  document.body.classList.add('contact-is-open');
});
document.querySelector('.contact-close').addEventListener('click', () => contactDialog.close());
contactDialog.addEventListener('close', () => document.body.classList.remove('contact-is-open'));
contactDialog.addEventListener('click', event => {
  if (event.target !== contactDialog) return;
  const bounds = contactDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) contactDialog.close();
});
document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const body = `Hello Colorclouds,\n\nName: ${values.get('name').trim()}\nEmail: ${values.get('email').trim()}\n\n${values.get('message').trim()}`;
  window.location.href = `mailto:hello.colorcloudslearning@gmail.com?subject=${encodeURIComponent('Colorclouds contact enquiry')}&body=${encodeURIComponent(body)}`;
  document.getElementById('contact-status').textContent = 'Your email draft is ready. Please send it from your email app.';
});
