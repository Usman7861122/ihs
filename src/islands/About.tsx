import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

interface Props {
  eyebrow: string;
  title: { word: string; accent?: boolean }[];
  paragraphs: string[];
  stats: { value: number; suffix: string; label: string }[];
  cta: { label: string; href: string };
  video: string;
  poster: string;
  badge: { title: string; text: string };
}

const EASE = [0.22, 1, 0.36, 1] as const;

function CountUp({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!run || reduce) {
      if (reduce) setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [run, to, reduce]);
  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

export default function About({
  eyebrow,
  title,
  paragraphs,
  stats,
  cta,
  video,
  poster,
  badge,
}: Props) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.6 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoInView = useInView(frameRef, { amount: 0.3 });

  // Play only while visible
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (videoInView && !reduce) el.play().catch(() => {});
    else el.pause();
  }, [videoInView, reduce]);

  const wordsParent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  };
  const word: Variants = {
    hidden: { y: reduce ? '0%' : '110%', opacity: reduce ? 0 : 1 },
    show: { y: '0%', opacity: 1, transition: { duration: reduce ? 0.2 : 0.8, ease: EASE } },
  };
  const fadeUp = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.8, ease: EASE, delay: reduce ? 0 : delay },
    },
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 -mt-12 scroll-mt-(--header-h) overflow-hidden rounded-t-[44px] bg-linear-to-b from-[#fcf6f1] via-white to-white px-2.5 pt-[110px] pb-[100px] text-ink"
    >
      {/* soft glow that continues the hero's warm light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-[560px] rounded-full bg-brand/20 blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-(--container-header) items-center gap-14 lg:grid-cols-[minmax(0,580px)_1fr] lg:items-stretch lg:gap-16">
        {/* Image, left */}
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative mx-auto w-full max-w-[580px] lg:mx-0 lg:h-full"
        >
          {/* offset frame */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-5 translate-y-5 rounded-[32px] border-2 border-brand/60"
          />
          <div ref={frameRef} className="relative aspect-[5/4] overflow-hidden lg:aspect-auto lg:h-full rounded-[32px] bg-[radial-gradient(120%_90%_at_20%_10%,#4a2210_0%,#1a0c04_70%)] shadow-[0_40px_80px_-30px_rgba(60,25,5,0.55)]">
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
              aria-hidden="true"
            >
              <source src={video} type="video/mp4" />
            </video>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent"
            />
          </div>

          {/* floating badge */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="absolute -bottom-6 -left-3 flex max-w-[280px] items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] md:-left-8"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <MapPin className="size-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="block">
              <span className="block text-[16px] leading-5 font-medium">{badge.title}</span>
              <span className="mt-0.5 block text-[14px] leading-5 text-black/60">{badge.text}</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Text, right */}
        <div>
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="flex items-center gap-3 text-button text-brand"
          >
            <span aria-hidden="true" className="h-0.5 w-10 bg-brand" />
            {eyebrow}
          </motion.p>

          <motion.h2
            variants={wordsParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-5 max-w-[640px]"
            aria-label={title.map((t) => t.word).join(' ')}
          >
            {title.map(({ word: w, accent }, i) => (
              <span key={i} aria-hidden="true">
                <span className="-mt-[0.1em] -mb-[0.14em] inline-block overflow-hidden pt-[0.1em] pr-[0.06em] pb-[0.14em] align-bottom">
                  <motion.span
                    variants={word}
                    className={
                      accent
                        ? 'inline-block font-(family-name:--font-accent) font-normal text-brand italic'
                        : 'inline-block'
                    }
                  >
                    {w}
                  </motion.span>
                </span>{' '}
              </span>
            ))}
          </motion.h2>

          <div className="mt-7 max-w-[600px] space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp(0.1 + i * 0.12)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                className="text-black/70"
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="mt-10 grid max-w-[600px] grid-cols-3 gap-4 border-t border-black/10 pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-[40px] leading-[46px] font-semibold text-ink">
                  <CountUp to={s.value} suffix={s.suffix} run={statsInView} />
                </p>
                <p className="mt-1 text-[15px] leading-[22px] text-black/60">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10"
          >
            <a href={cta.href} className="btn btn-outline">
              <span className="btn-label">{cta.label}</span>
              <span className="btn-icon" aria-hidden="true">
                <ArrowRight strokeWidth={2} />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
