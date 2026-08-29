// ============================================================
// F&S Designs — sample site interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu after tapping a link (mobile UX)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Portfolio filter ----
  const filterButtons = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');
  const emptyState = document.getElementById('work-empty');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state / aria-selected
      filterButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      // Show/hide matching cards
      let visibleCount = 0;
      workCards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.hidden = !matches;
        if (matches) visibleCount++;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });

  // ---- Contact form (placeholder — no backend wired up yet) ----
  // NOTE FOR DEV: connect this to a real form handler (e.g. Formspree,
  // Netlify Forms, or a mailto fallback) before this site goes live.
  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  if (form && formNote) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = 'This form is a placeholder for the demo — connect it to email/Netlify Forms before launch.';
    });
  }

  // ---- Sticky header shadow on scroll ----
  const header = document.getElementById('site-header');
  if (header) {
    const toggleHeaderShadow = () => {
      header.style.boxShadow = window.scrollY > 8
        ? '0 6px 20px rgba(0,0,0,0.35)'
        : 'none';
    };
    toggleHeaderShadow();
    window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
  }

});
