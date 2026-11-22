// Gentle motion for the home page:
// 1. Chinar leaves blow across each threshold once, when it scrolls into view.
// 2. Rooms rise in softly as you reach them.
// Both are skipped entirely for visitors who prefer reduced motion.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce && 'IntersectionObserver' in window) {
  // 1. the autumn breeze, once per threshold
  const breezeIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-breezing');
        breezeIO.unobserve(e.target);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll('[data-breeze]').forEach((el) => breezeIO.observe(el));

  // 2. rooms rise in: only blocks that start below the screen, so nothing visible flickers
  const blocks = document.querySelectorAll<HTMLElement>('main > section:not(#courtyard) > :not(dialog)');
  const riseIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-risen');
        riseIO.unobserve(e.target);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
  );
  const fold = window.innerHeight;
  blocks.forEach((el) => {
    if (el.getBoundingClientRect().top > fold) {
      el.classList.add('rise');
      riseIO.observe(el);
    }
  });
}
