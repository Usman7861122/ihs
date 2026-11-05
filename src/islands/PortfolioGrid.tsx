import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  specialty: string;
  location: string;
  url: string;
  image: string;
  phoneImage: string;
  embedUrl?: string; // address that allows iframes (when the main site blocks them)
  fullImage?: string; // tall screenshot, used when a site cannot be framed
  tags: string[];
  text: string;
}

// Shows a real website inside a device screen, scaled down from its design width.
function LiveFrame({ url, designWidth, title, poster }: { url: string; designWidth: number; title: string; poster: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const scale = size.w ? size.w / designWidth : 0;

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-black">
      <img src={poster} alt="" className="absolute top-0 left-0 w-full" />
      {scale > 0 && (
        <iframe
          src={url}
          title={title}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          style={{ width: designWidth, height: size.h / scale, transform: `scale(${scale})`, transformOrigin: 'top left', opacity: loaded ? 1 : 0 }}
          className="absolute top-0 left-0 border-0 bg-white transition-opacity duration-700"
        />
      )}
    </div>
  );
}

function Preview({ project, onClose, onStep }: { project: Project; onClose: () => void; onStep: (d: 1 | -1) => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col bg-[#0c0807]/92 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} website preview`}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-4 md:px-8">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold tracking-[3px] text-brand-light uppercase">{project.specialty}</p>
          <h3 className="truncate text-[clamp(18px,2.4vw,28px)] font-medium text-white">{project.name}</h3>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm hidden sm:inline-flex">
            <span className="btn-label">Visit live site</span>
            <span className="btn-icon"><ExternalLink size={16} /></span>
          </a>
          <button type="button" onClick={() => onStep(-1)} aria-label="Previous project" className="btn btn-glass btn-sm"><span className="btn-label"><ChevronLeft size={18} /></span></button>
          <button type="button" onClick={() => onStep(1)} aria-label="Next project" className="btn btn-glass btn-sm"><span className="btn-label"><ChevronRight size={18} /></span></button>
          <button type="button" onClick={onClose} aria-label="Close preview" className="btn btn-glass btn-sm"><span className="btn-label"><X size={18} /></span></button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 md:px-10">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[1120px] pb-6"
        >
          {/* Laptop */}
          <div className={`relative mx-auto w-[92%] md:w-[min(80%,calc((100svh-190px)*1.5))] ${project.fullImage ? '' : 'md:ml-[14%]'}`}>
            <div className="rounded-[8px] border border-white/15 bg-[#0a0a0b] p-[0.9%] pb-[3.4%] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] md:rounded-[14px]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-black md:rounded-md">
                {project.fullImage ? (
                  <div className="absolute inset-0 overflow-y-auto overscroll-contain [scrollbar-width:thin]" data-lenis-prevent>
                    <img src={project.fullImage} alt={`${project.name} website`} className="block w-full" />
                  </div>
                ) : (
                  <LiveFrame url={project.embedUrl ?? project.url} designWidth={1440} title={`${project.name} website`} poster={project.image} />
                )}
              </div>
            </div>
            <div aria-hidden="true" className="mx-auto mt-3 h-5 w-[60%] rounded-[50%] bg-black/60 blur-2xl"></div>
          </div>
          {/* Phone */}
          <div className={`absolute bottom-[4%] left-[0%] z-10 hidden w-[19%] ${project.fullImage ? '' : 'sm:block'} md:left-[1%] md:w-[min(17%,calc((100svh-190px)*0.27))]`}>
            <div className="relative aspect-[9/18.5] rounded-[22px] border border-white/20 bg-[#0a0a0b] p-[3.2%] shadow-[0_50px_90px_-20px_rgba(0,0,0,0.95)] md:rounded-[36px]">
              <div className="relative size-full overflow-hidden rounded-[16px] bg-black md:rounded-[28px]">
                <LiveFrame url={project.embedUrl ?? project.url} designWidth={390} title={`${project.name} mobile website`} poster={project.phoneImage} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <p className="px-4 pb-5 text-center text-[13px] text-white/50">
        {project.fullImage ? 'Scroll inside the screen to explore the page. This site cannot be shown live here, so ' : 'Scroll inside the screens to explore the live site. If it does not load, '}
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-brand-light underline underline-offset-4">{project.fullImage ? 'visit the live site' : 'open it in a new tab'}</a>.
      </p>
    </motion.div>
  );
}

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: 1 | -1) => setOpen((i) => (i === null ? i : (i + d + projects.length) % projects.length)), [projects.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, step]);

  return (
    <>
      <div className="grid gap-7 md:grid-cols-2">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOpen(i)}
            data-reveal
            style={{ ['--reveal-delay' as string]: `${(i % 2) * 120}ms` }}
            className="group block cursor-pointer overflow-hidden rounded-[28px] border border-black/5 bg-white text-left shadow-[0_30px_70px_-40px_rgba(143,66,34,0.6)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_0_2px_#C96F3A,0_36px_70px_-30px_rgba(201,111,58,0.6)]"
          >
            <div className="relative bg-gradient-to-b from-[#f3e3d6] to-[#fbf3ec] px-5 pt-6 md:px-7 md:pt-8">
              <div className="overflow-hidden rounded-t-[14px] border border-b-0 border-black/10 bg-[#0a0a0b] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-1.5 bg-[#1a1411] px-3 py-2">
                  <span className="size-2 rounded-full bg-[#ff5f57]"></span>
                  <span className="size-2 rounded-full bg-[#febc2e]"></span>
                  <span className="size-2 rounded-full bg-[#28c840]"></span>
                  <span className="ml-3 truncate rounded-full bg-white/10 px-3 py-0.5 text-[11px] text-white/60">{p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={`${p.name} website`} loading="lazy" className="absolute inset-0 size-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-105" />
                  <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-[#120d0a]/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
                    <span className="btn btn-primary btn-spin"><span className="btn-label">View live preview</span><span className="btn-icon"><ArrowUpRight size={18} /></span></span>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-7 md:p-9">
              <p className="text-[13px] font-semibold tracking-[3px] text-brand uppercase">{p.specialty} · {p.location}</p>
              <h3 className="mt-3 text-[clamp(24px,2.6vw,32px)] leading-tight font-medium">{p.name}</h3>
              <p className="mt-3 text-[16px] leading-7 text-black/60">{p.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full border border-brand/25 bg-brand/8 px-3.5 py-1 text-[13px] font-medium text-brand-deep transition-colors duration-300 group-hover:border-brand/50 group-hover:bg-brand/15">{t}</li>
                ))}
              </ul>
              <span className="btn btn-outline mt-6"><span className="btn-label">Open live preview</span><span className="btn-icon"><ArrowUpRight size={18} /></span></span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>{open !== null && <Preview key="preview" project={projects[open]} onClose={close} onStep={step} />}</AnimatePresence>
    </>
  );
}
