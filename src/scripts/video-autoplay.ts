// Makes background videos autoplay on iPhone Safari.
// React does not always write the "muted" attribute into the HTML, and Safari only
// autoplays videos that are muted. So we set it ourselves, then call play().
// Low Power Mode can still block autoplay; in that case the poster image stays visible.

function prepare(v: HTMLVideoElement) {
  if (v.dataset.autoplayReady) return;
  v.dataset.autoplayReady = '1';
  v.muted = true;
  v.defaultMuted = true;
  v.setAttribute('muted', '');
  v.setAttribute('playsinline', '');
  v.setAttribute('webkit-playsinline', '');
  v.removeAttribute('controls');
}

function tryPlay(v: HTMLVideoElement) {
  if (!v.paused || v.ended) return;
  v.muted = true;
  const p = v.play();
  if (p && typeof p.catch === 'function') p.catch(() => {});
}

function setup() {
  const videos = () => Array.from(document.querySelectorAll<HTMLVideoElement>('video[autoplay]'));

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) tryPlay(v);
          else if (!v.paused) v.pause();
        });
      }, { threshold: 0.15 })
    : null;

  const init = (v: HTMLVideoElement) => {
    prepare(v);
    tryPlay(v);
    io?.observe(v);
    v.addEventListener('loadeddata', () => tryPlay(v));
    v.addEventListener('canplay', () => tryPlay(v));
  };

  videos().forEach(init);

  // Videos rendered later by React islands
  new MutationObserver(() => {
    videos().forEach((v) => {
      if (!v.dataset.autoplayReady) init(v);
    });
  }).observe(document.body, { childList: true, subtree: true });

  // Retry on the first touch or scroll (allowed by Safari after user interaction)
  const retry = () => videos().forEach(tryPlay);
  ['touchstart', 'scroll', 'click'].forEach((t) => window.addEventListener(t, retry, { once: true, passive: true }));
  document.addEventListener('visibilitychange', () => !document.hidden && retry());
  window.addEventListener('pageshow', retry);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
else setup();
