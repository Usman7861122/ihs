import { useEffect, useState } from 'react';

type Prefs = { necessary: true; preferences: boolean; analytics: boolean; marketing: boolean };
const KEY = 'ihs-cookie-consent';
const DEFAULT: Prefs = { necessary: true, preferences: false, analytics: false, marketing: false };

const CATEGORIES: { id: keyof Prefs; title: string; text: string; locked?: boolean }[] = [
  { id: 'necessary', title: 'Strictly necessary', text: 'Needed to run the site, keep it secure and remember your cookie choice. These are always on.', locked: true },
  { id: 'preferences', title: 'Preferences', text: 'Remember choices such as language or form details, so the site feels easier to use.' },
  { id: 'analytics', title: 'Analytics', text: 'Help us see which pages are used and how fast they load, so we can improve the site. Data is grouped, not personal.' },
  { id: 'marketing', title: 'Marketing', text: 'Used to show you relevant ads and to measure how well our ads work on other websites.' },
];

function read(): Prefs | null {
  try {
    const v = localStorage.getItem(KEY);
    return v ? { ...DEFAULT, ...JSON.parse(v), necessary: true } : null;
  } catch {
    return null;
  }
}

function save(p: Prefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
    document.cookie = `${KEY}=${encodeURIComponent(JSON.stringify(p))}; max-age=15552000; path=/; SameSite=Lax`;
  } catch {}
  (window as any).ihsConsent = p;
  window.dispatchEvent(new CustomEvent('ihs:consent', { detail: p }));
}

export default function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [banner, setBanner] = useState(false);
  const [modal, setModal] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT);

  useEffect(() => {
    const saved = read();
    if (saved) {
      setPrefs(saved);
      (window as any).ihsConsent = saved;
    } else setBanner(true);
    setReady(true);
    const open = () => {
      setPrefs(read() ?? DEFAULT);
      setBanner(false);
      setModal(true);
    };
    window.addEventListener('ihs:open-cookie-settings', open);
    return () => window.removeEventListener('ihs:open-cookie-settings', open);
  }, []);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setModal(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modal]);

  const finish = (p: Prefs) => {
    save(p);
    setPrefs(p);
    setBanner(false);
    setModal(false);
  };
  const all: Prefs = { necessary: true, preferences: true, analytics: true, marketing: true };

  if (!ready) return null;

  return (
    <>
      {banner && !modal && (
        <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-[250] max-w-[460px] rounded-[24px] border border-white/10 bg-[#181310]/95 p-6 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:left-5">
          <p className="text-[13px] font-semibold tracking-[2.5px] text-brand-light uppercase">Your privacy</p>
          <h2 className="mt-2 text-[22px] font-medium">We use cookies</h2>
          <p className="mt-2 text-[15px] leading-6 text-white/70">
            We use cookies to run our site and, with your OK, to measure traffic and show relevant ads. You choose what to allow. Read our{' '}
            <a href="/cookie-policy/" className="text-brand-light underline underline-offset-4 hover:text-white">Cookie Policy</a>.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button type="button" onClick={() => finish(all)} className="btn btn-primary btn-sm"><span className="btn-label">Accept all</span></button>
            <button type="button" onClick={() => finish(DEFAULT)} className="btn btn-glass btn-sm"><span className="btn-label">Reject non-essential</span></button>
            <button type="button" onClick={() => setModal(true)} className="btn btn-glass btn-sm"><span className="btn-label">Customize</span></button>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-[320] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <div role="dialog" aria-modal="true" aria-label="Cookie settings" className="flex max-h-[92vh] w-full max-w-[620px] flex-col overflow-hidden rounded-[28px] bg-[#fffaf5] text-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6 md:p-8">
              <div>
                <h2 className="text-[26px] font-medium">Cookie settings</h2>
                <p className="mt-1.5 text-[15px] leading-6 text-black/60">Choose which cookies you allow. You can change this any time from the footer.</p>
              </div>
              <button type="button" aria-label="Close" onClick={() => setModal(false)} className="flex size-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-xl transition-colors hover:border-brand hover:text-brand">×</button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-6 md:p-8">
              {CATEGORIES.map((c) => (
                <div key={c.id} className="flex items-start justify-between gap-4 rounded-[18px] border border-black/10 bg-white p-5 transition-all duration-300 hover:border-brand/50 hover:shadow-[0_16px_40px_-26px_rgba(201,111,58,0.7)]">
                  <div>
                    <h3 className="text-[17px] font-medium">{c.title}</h3>
                    <p className="mt-1 text-[14.5px] leading-6 text-black/60">{c.text}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs[c.id]}
                    aria-label={c.title}
                    disabled={c.locked}
                    onClick={() => setPrefs((p) => ({ ...p, [c.id]: !p[c.id] }))}
                    className={`relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${prefs[c.id] ? 'bg-brand' : 'bg-black/20'} ${c.locked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    <span className={`absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform duration-300 ${prefs[c.id] ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2.5 border-t border-black/10 bg-white p-5 md:px-8">
              <button type="button" onClick={() => finish(prefs)} className="btn btn-outline btn-sm"><span className="btn-label">Save my choices</span></button>
              <button type="button" onClick={() => finish(all)} className="btn btn-outline btn-sm"><span className="btn-label">Accept all</span></button>
              <button type="button" onClick={() => finish(DEFAULT)} className="btn btn-outline btn-sm"><span className="btn-label">Reject non-essential</span></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
