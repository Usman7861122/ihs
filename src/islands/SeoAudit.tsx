import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { ArrowRight, ClipboardCheck, Globe, MapPin, Sparkles, Star } from 'lucide-react';

const CHECK_ICONS = { Website: Globe, 'Local SEO': MapPin, Reviews: Star, 'AI search': Sparkles } as const;

/** Counts from 0 to `value` once `play` is true */
function CountUp({
  value,
  play,
  delay,
  duration,
}: {
  value: number;
  play: boolean;
  delay: number;
  duration: number;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!play) return;
    setN(0);
    const c = animate(0, value, { duration, ease: 'easeOut', delay, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [play, value, delay, duration]);
  return <>{n}</>;
}

function status(v: number) {
  if (v >= 85) return { text: 'Great', cls: 'bg-emerald-400/15 text-emerald-300' };
  if (v >= 70) return { text: 'Good', cls: 'bg-brand/20 text-brand-light' };
  return { text: 'Needs work', cls: 'bg-amber-400/15 text-amber-300' };
}

interface Check {
  label: string;
  value: number;
}

interface Props {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
  text: string;
  cta: { label: string; href: string };
  sampleLabel: string;
  score: number;
  checks: Check[];
}

const EASE = [0.22, 1, 0.36, 1] as const;
const R = 54;
const CIRC = 2 * Math.PI * R;

export default function SeoAudit({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  subtitle,
  text,
  cta,
  sampleLabel,
  score,
  checks,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-80px' });
  return (
    <section
      id="seo-audit"
      className="relative z-[75] -mt-12 scroll-mt-(--header-h) overflow-clip rounded-t-[44px] bg-[#120d0a] px-2.5 py-[88px] text-white md:py-[120px]"
    >
      {/* warm glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-[28%] size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(201,111,58,0.18)_1.2px,transparent_1.2px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_50%_70%_at_28%_50%,black,transparent_75%)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* LEFT: sample scorecard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto w-full max-w-[520px] lg:mx-0"
        >
          <div
            ref={cardRef}
            className="overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-b from-white/[0.09] to-white/[0.03] shadow-[0_40px_90px_-30px_rgba(201,111,58,0.55)] backdrop-blur-sm"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-8">
              <span className="flex items-center gap-2 text-[15px] font-medium text-white/90">
                <ClipboardCheck className="size-5 text-brand-light" strokeWidth={1.8} aria-hidden="true" />
                Local SEO scorecard
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-[1.5px] text-white/60 uppercase">
                {sampleLabel}
              </span>
            </div>

            {/* overall score */}
            <div className="flex flex-col items-center px-6 pt-8 pb-6 md:px-8">
              <div className="relative size-[168px] cursor-default transition-transform duration-500 ease-out hover:scale-[1.06] md:size-[188px]">
                <div aria-hidden="true" className="absolute inset-2 rounded-full bg-brand/25 blur-2xl" />
                <svg viewBox="0 0 128 128" className="relative size-full -rotate-90" aria-hidden="true">
                  <defs>
                    <linearGradient id="seoRing" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#E4A269" />
                      <stop offset="100%" stopColor="#C96F3A" />
                    </linearGradient>
                  </defs>
                  <circle cx="64" cy="64" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="9" />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r={R}
                    fill="none"
                    stroke="url(#seoRing)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    initial={{ strokeDashoffset: CIRC }}
                    animate={inView ? { strokeDashoffset: CIRC * (1 - score / 100) } : undefined}
                    transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[54px] leading-none font-semibold tabular-nums md:text-[62px]"><CountUp value={score} play={inView} delay={0.3} duration={1.6} /></span>
                  <span className="mt-1 text-[13px] text-white/55">out of 100</span>
                </div>
              </div>
            </div>

            {/* checks */}
            <ul className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2">
              {checks.map((c, i) => {
                const Icon = CHECK_ICONS[c.label as keyof typeof CHECK_ICONS] ?? Globe;
                const st = status(c.value);
                return (
                  <li
                    key={c.label}
                    className="relative cursor-default bg-[#1a120d] px-5 py-4 transition-[transform,background-color] duration-300 ease-out hover:z-10 hover:scale-[1.05] hover:bg-[#261811] md:px-6"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-[15px] text-white/85">
                        <Icon className="size-[18px] text-brand-light" strokeWidth={1.8} aria-hidden="true" />
                        {c.label}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${st.cls}`}>{st.text}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-linear-to-r from-brand to-brand-light"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${c.value}%` } : undefined}
                          transition={{ duration: 1.1, ease: EASE, delay: 0.5 + i * 0.12 }}
                        />
                      </div>
                      <span className="w-7 text-right text-[14px] text-white/60 tabular-nums"><CountUp value={c.value} play={inView} delay={0.5 + i * 0.12} duration={1.1} /></span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>

        {/* RIGHT: text */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-3 text-[14px] leading-none font-semibold tracking-[3px] text-brand-light uppercase"
          >
            <span aria-hidden="true" className="h-0.5 w-10 bg-brand" />
            {eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="mt-6 italic"
          >
            <span className="font-medium">{titleStart}</span>{' '}
            <span className="font-(family-name:--font-accent) font-normal text-brand">{titleAccent}</span>{' '}
            <span className="font-medium">{titleEnd}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="mt-6 text-[22px] leading-8 font-medium text-white/90"
          >
            {subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
            className="mt-3 max-w-[480px] text-lead text-white/65"
          >
            {text}
          </motion.p>

          <div className="mt-9">
            <a href={cta.href} className="btn btn-glass btn-lg">
              <span className="btn-label">{cta.label}</span>
              <span className="btn-icon">
                <ArrowRight aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
