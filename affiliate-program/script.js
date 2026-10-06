(() => {
  function initializeAffiliatePage() {
    document.querySelectorAll('#year, .footer-year').forEach(element => {
      element.textContent = new Date().getFullYear();
    });

    const header = document.querySelector('.site-header');
    const toggle = header?.querySelector('.nav-toggle');
    const navigation = header?.querySelector('#main-nav');
    if (toggle && navigation) {
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
      document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
      window.addEventListener('resize', () => { if (window.innerWidth > 950) closeMenu(); });
    }

    const faqExpand = document.querySelector('.faq-expand-button');
    const faqItems = [...document.querySelectorAll('details.affiliate-faq-item')];
    if (faqExpand && faqItems.length) {
      function updateFaqControl() {
        const allOpen = faqItems.every(item => item.open);
        faqExpand.setAttribute('aria-expanded', String(allOpen));
        faqExpand.replaceChildren(document.createTextNode(allOpen ? 'Close All FAQs ' : 'View All FAQs '));
        const arrow = document.createElement('span');
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '\u2192';
        faqExpand.append(arrow);
      }
      faqExpand.addEventListener('click', () => {
        const open = faqItems.some(item => !item.open);
        faqItems.forEach(item => { item.open = open; });
        updateFaqControl();
      });
      faqItems.forEach(item => item.addEventListener('toggle', updateFaqControl));
      updateFaqControl();
    }

    if (header) {
      function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 20); }
      window.addEventListener('scroll', updateHeader, { passive: true });
      updateHeader();
    }

    // Map labels to the artwork's book centers, accounting for cover cropping.
    const bookHero = document.querySelector('.affiliate-hero');
    const bookLabels = [...document.querySelectorAll('.hero-book-labels span')];
    const bookCenters = [[1430,716],[1430,761],[1430,804],[1430,850],[1430,893]];
    if (bookHero && bookLabels.length) {
      function alignBookLabels() {
        const width = bookHero.clientWidth;
        const height = bookHero.clientHeight;
        const scale = Math.max(width / 1639, height / 960);
        const offsetX = (width - 1639 * scale) / 2;
        const offsetY = (height - 960 * scale) / 2;
        bookLabels.forEach((label, index) => {
          const center = bookCenters[index];
          if (!center) return;
          label.style.left = (offsetX + center[0] * scale) + 'px';
          label.style.top = (offsetY + center[1] * scale) + 'px';
          label.style.fontSize = Math.max(12, Math.min(26, 24 * scale)) + 'px';
        });
      }
      if ('ResizeObserver' in window) new ResizeObserver(alignBookLabels).observe(bookHero);
      window.addEventListener('resize', alignBookLabels);
      window.addEventListener('load', alignBookLabels);
      alignBookLabels();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAffiliatePage, { once: true });
  } else {
    initializeAffiliatePage();
  }
})();
