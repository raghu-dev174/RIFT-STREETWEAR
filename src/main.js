import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  || new URLSearchParams(window.location.search).has('reduce-motion');
const isDesktop = window.matchMedia('(min-width: 761px)').matches;

/** @param {string} selector */
const el = (selector) => document.querySelector(selector);
/** @param {string} selector */
const all = (selector) => gsap.utils.toArray(selector);

if (!reduced) {
  const hero = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '.hero', start: 'top top', end: isDesktop ? '+=180%' : '+=110%',
      pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true
    }
  });
  hero
    .to('.hero-letter--r', { xPercent: -62, scale: .72 }, 0)
    .to('.hero-letter--i', { yPercent: -58, scale: .55 }, 0)
    .to('.hero-letter--f', { yPercent: 55, scale: .68 }, 0)
    .to('.hero-letter--t', { xPercent: 58, scale: .72 }, 0)
    .to('.hero-media', { inset: isDesktop ? '0 0 0 0' : '0 0 0 0' }, 0)
    .to('.hero-media img', { scale: 1, xPercent: isDesktop ? -3 : 0, yPercent: 3 }, 0)
    .to('.hero-grid', { opacity: 0 }, .15)
    .to('.hero-progress i', { scaleX: 1 }, 0)
    .to('.hero-kicker', { xPercent: -130, opacity: 0 }, .58)
    .to('.hero-code', { xPercent: 130, opacity: 0 }, .58)
    .to('.hero-scroll', { opacity: 0 }, .08)
    .to('.hero-title', { opacity: .08 }, .74);

  const film = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '.film', start: 'top top', end: isDesktop ? '+=260%' : '+=145%',
      pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true
    }
  });
  film
    .to('.film-shot--primary', { clipPath: 'inset(0% 0% 0% 0%)' }, 0)
    .to('.film-shot--primary img', { scale: 1, xPercent: -3 }, 0)
    .to('.film-title span:nth-child(1)', { xPercent: 90 }, 0)
    .to('.film-title span:nth-child(2)', { xPercent: -120 }, 0)
    .to('.film-title span:nth-child(3)', { xPercent: 54 }, 0)
    .to('.film-blackout', { xPercent: 101 }, .36)
    .set('.film-title', { color: '#fff' }, .5)
    .to('.film-shot--secondary', { clipPath: 'inset(0% 0% 0% 0%)' }, .45)
    .to('.film-shot--secondary img', { scale: 1.08, xPercent: 4 }, .45)
    .to('.film-title span', { xPercent: 0, color: '#fff' }, .56)
    .to('.film-title', { scale: .44, xPercent: -18, yPercent: 104, transformOrigin: 'left bottom' }, .72)
    .to('.film-caption', { xPercent: -55 }, .72);

  const typeTl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '.type-scene', start: 'top top', end: isDesktop ? '+=190%' : '+=120%',
      pin: true, scrub: .85, anticipatePin: 1, invalidateOnRefresh: true
    }
  });
  typeTl
    .from('.type-word--no', { xPercent: -95, rotate: -6 }, 0)
    .from('.type-word--safe', { xPercent: 105, rotate: 4 }, 0)
    .from('.type-word--form', { yPercent: 110, rotate: -3 }, 0)
    .to('.type-bar', { scaleY: 1 }, .08)
    .to('.type-word--no', { xPercent: isDesktop ? 108 : 68, yPercent: 29, scale: .56 }, .45)
    .to('.type-word--safe', { xPercent: isDesktop ? -40 : -20, yPercent: -43, scale: .7 }, .45)
    .to('.type-word--form', { xPercent: isDesktop ? 10 : 0, yPercent: -102, scale: .78 }, .45)
    .to('.type-bar', { xPercent: isDesktop ? 2400 : 900, scaleY: .25 }, .58)
    .to('.type-note', { opacity: 0 }, .4);

  all('.product').forEach((item, index) => {
    const direction = index % 2 ? 1 : -1;
    gsap.from(item, {
      xPercent: 26 * direction,
      yPercent: 12,
      rotate: 5 * direction,
      ease: 'none',
      scrollTrigger: { trigger: item, start: 'top 95%', end: 'top 40%', scrub: .8 }
    });
    gsap.to(item.querySelector('img'), {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  const statement = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: '.statement', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });
  statement
    .fromTo('.statement-image img', { scale: 1.2, yPercent: -8 }, { scale: 1, yPercent: 8 }, 0)
    .from('.statement h2 span:first-child', { xPercent: -72 }, .12)
    .from('.statement h2 span:last-child', { xPercent: 74 }, .12)
    .to('.statement-wipe', { xPercent: -100 }, .54);

  gsap.fromTo('.finale-media img', { scale: 1.14 }, {
    scale: 1, ease: 'none',
    scrollTrigger: { trigger: '.finale', start: 'top bottom', end: 'bottom bottom', scrub: 1 }
  });
}

const dialog = /** @type {HTMLDialogElement | null} */ (el('#inquiry-dialog'));
all('[data-open-dialog]').forEach((button) => {
  button.addEventListener('click', () => dialog?.showModal());
});
el('[data-close-dialog]')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const form = /** @type {HTMLFormElement | null} */ (el('#inquiry-form'));
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = /** @type {HTMLElement | null} */ (el('.form-status'));
  if (status) status.textContent = 'INQUIRY STAGED — DEMO COMPLETE. NOTHING WAS SENT.';
  form.reset();
});

window.addEventListener('load', () => ScrollTrigger.refresh());
if ('fonts' in document) document.fonts.ready.then(() => ScrollTrigger.refresh());

window.addEventListener('beforeunload', () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
