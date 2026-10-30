import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MoveHorizontal } from 'lucide-react';

interface Img {
  src: string;
  alt: string;
}

interface Case {
  name: string;
  before: Img;
  after: Img;
  stats: { value: string; label: string }[];
}

interface Props {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  text: string;
  beforeLabel: string;
  afterLabel: string;
  cases: Case[];
  cta: { label: string; href: string };
}

export default function Results({ eyebrow, titleStart, titleAccent, titleEnd, text, beforeLabel, afterLabel, cases, cta }: Props) {
  const [pos, setPos] = useState(50);
  const [idx, setIdx] = useState(0);
  const { before, after, stats } = cases[idx];
  const box = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section
      id="results"
      className="relative z-[105] -mt-12 overflow-clip rounded-t-[44px] bg-[#f6ebe0] text-ink"
    >
      <div className="relative bg-[#181310] px-2.5 pb-[170px] pt-[88px] text-white md:pb-[240px] md:pt-[120px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_50%_0%,rgba(201,111,58,0.22),transparent_70%)]" />
        <div className="relative mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[640px] text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-light">{eyebrow}</p>
          <h2 className="mt-4 text-4xl font-medium leading-[1.1] md:text-6xl">
            {titleStart}{' '}
            <span className="font-(family-name:--font-accent) italic text-brand-light">{titleAccent}</span> {titleEnd}
          </h2>
          <p className="mt-5 text-base text-white/65 md:text-lg">{text}</p>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {cases.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => {
                setIdx(i);
                setPos(50);
              }}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                i === idx ? 'border-brand bg-brand text-white' : 'border-white/20 bg-white/5 text-white/75 hover:border-brand-light'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        </div>
      </div>

      <div className="relative mx-auto -mt-[130px] max-w-[1100px] px-2.5 pb-[88px] md:-mt-[190px] md:pb-[120px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="rounded-[28px] border border-black/5 bg-white p-2 shadow-[0_30px_80px_-30px_rgba(143,66,34,0.35)] md:p-3"
        >
          <div
            ref={box}
            className="relative aspect-[2/1] w-full select-none overflow-hidden rounded-[20px] bg-[#f1e9e0] touch-pan-y"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              move(e.clientX);
            }}
            onPointerMove={(e) => e.buttons && move(e.clientX)}
          >
            <img src={after.src} alt={after.alt} draggable={false} className="absolute inset-0 h-full w-full object-cover object-top" />
            <img
              src={before.src}
              alt={before.alt}
              draggable={false}
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />

            <span className="absolute left-4 top-4 rounded-full bg-[#181310]/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md ring-1 ring-white/30 backdrop-blur">
              {beforeLabel}
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-brand px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white shadow-sm">
              {afterLabel}
            </span>

            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.25)]" style={{ left: `${pos}%` }}>
              <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-lg ring-4 ring-brand/20">
                <MoveHorizontal size={20} />
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Compare before and after"
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
              style={{ pointerEvents: 'none' }}
            />
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="rounded-2xl border border-brand/15 bg-white/70 px-6 py-6 text-center"
            >
              <p className="font-(family-name:--font-accent) text-4xl font-semibold text-brand md:text-5xl">{s.value}</p>
              <p className="mt-1 text-sm text-ink/65">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href={cta.href} className="btn btn-outline btn-lg">
            <span className="btn-label">{cta.label}</span>
            <span className="btn-icon">
              <ArrowRight aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
