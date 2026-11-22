// Motion for the home page:
// 1. The autumn breeze: at each threshold, a slow full-screen gust of mist and
//    swirling chinar leaves plays once, then the next room rises into view.
// 2. Rooms rise in softly as you reach them.
// 3. The "Reduce motion" button in the top bar turns both off (remembered on
//    this device). Until someone presses it, the device's own setting decides.

const root = document.documentElement;
const readStored = () => { try { return localStorage.getItem('motion'); } catch { return null; } };
const store = (v: string) => { try { localStorage.setItem('motion', v); } catch { /* private mode */ } };

const stored = readStored();
let motionOn = stored ? stored === 'on' : !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const toggles = document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]');
const gust = document.querySelector<HTMLElement>('[data-gust]');
let gustTimer = 0;
let playing = false;
let nextSet = 0;

const applyMotion = () => {
  root.dataset.motion = motionOn ? 'on' : 'off';
  toggles.forEach((b) => b.setAttribute('aria-pressed', String(!motionOn)));
  if (!motionOn) {
    // stop any gust and show every room straight away
    gust?.classList.remove('is-playing');
    playing = false;
    window.clearTimeout(gustTimer);
    document.querySelectorAll('.rise').forEach((el) => el.classList.remove('rise', 'is-risen'));
  }
};
applyMotion();

toggles.forEach((b) =>
  b.addEventListener('click', () => {
    motionOn = !motionOn;
    store(motionOn ? 'on' : 'off');
    applyMotion();
  })
);

if ('IntersectionObserver' in window) {
  // rooms rise in: only blocks that start below the screen, so nothing visible flickers
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
  if (motionOn) {
    const fold = window.innerHeight;
    document.querySelectorAll<HTMLElement>('main > section:not(#courtyard) > :not(dialog)').forEach((el) => {
      if (el.getBoundingClientRect().top > fold) {
        el.classList.add('rise');
        riseIO.observe(el);
      }
    });
  }

  // the breeze: once per threshold, when it reaches the lower part of the screen
  const playGust = (threshold: Element) => {
    if (!motionOn || !gust || playing) return;
    playing = true;
    gust.classList.remove('is-playing');
    void gust.offsetWidth; // restart the animations
    gust.dataset.play = String(nextSet);
    nextSet = (nextSet + 1) % 3;
    gust.classList.add('is-playing');

    // the next room's heading rises as the mist clears
    const head = threshold.nextElementSibling?.querySelector<HTMLElement>(':scope > .rise:not(.is-risen)');
    if (head) {
      head.style.transitionDelay = '1100ms';
      head.classList.add('is-risen');
      riseIO.unobserve(head);
      window.setTimeout(() => (head.style.transitionDelay = ''), 2200);
    }

    window.clearTimeout(gustTimer);
    gustTimer = window.setTimeout(() => {
      gust.classList.remove('is-playing');
      playing = false;
    }, 3900);
  };

  const breezeIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        breezeIO.unobserve(e.target);
        playGust(e.target);
      });
    },
    { threshold: 0, rootMargin: '0px 0px -40% 0px' }
  );
  document.querySelectorAll('[data-breeze]').forEach((el) => breezeIO.observe(el));
}
