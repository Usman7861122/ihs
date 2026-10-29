import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import Aurora from '../components/ui/Aurora';

interface Item {
  name: string;
  quote: string;
  photo: string;
  logo: string;
  logoAlt: string;
}

interface Props {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  items: Item[];
}

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 8000;

export default function Testimonials({ eyebrow, titleStart, titleAccent, titleEnd, items }: Props) {
  const reduce = !!useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;
  const item = items[i];

  const go = (next: number) => setI((next + n) % n);

  // Auto-advance, paused while the mouse is over the card
  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), AUTO_MS);
    return () => clearTimeout(t);
  }, [i, paused, reduce, n]);

  return (
    <section
      id="testimonials"
      className="relative z-[80] -mt-12 scroll-mt-(--header-h) overflow-clip rounded-t-[44px] bg-linear-to-b from-[#fbf3ec] via-white to-[#fbf3ec] px-2.5 py-[88px] text-ink shadow-[0_-24px_50px_-30px_rgba(120,60,20,0.35)] md:py-[120px]"
    >
      <Aurora />
      <div className="relative mx-auto max-w-[1180px]">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-[13px] leading-none font-semibold tracking-[2px] text-brand uppercase"
          >
            <Quote className="size-4" strokeWidth={1.8} aria-hidden="true" />
            {eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="italic"
          >
            <span className="font-medium">{titleStart}</span>{' '}
            <span className="font-(family-name:--font-accent) font-normal text-brand">{titleAccent}</span>{' '}
            <span className="font-medium">{titleEnd}</span>
          </motion.h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-0.5 w-[184px] bg-brand" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mt-14 overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_40px_90px_-40px_rgba(120,60,20,0.5)] md:mt-16 md:rounded-[40px]"
        >
          <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            {/* IMAGE */}
            <div className="relative aspect-[4/3] bg-[#f3e4d6] md:aspect-auto md:min-h-[460px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={item.photo}
                  src={item.photo}
                  alt={item.name}
                  loading="lazy"
                  draggable={false}
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/35 to-transparent"
              />
              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-1.5 text-[14px] font-medium text-ink backdrop-blur-sm">
                {i + 1} / {n}
              </span>
            </div>

            {/* TEXT */}
            <div className="flex flex-col justify-between gap-8 p-7 md:p-12">
              <div>
                <div className="flex gap-1 text-brand" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-6 fill-current" strokeWidth={1.2} aria-hidden="true" />
                  ))}
                </div>

                <div className="relative mt-6 min-h-[200px] md:min-h-[240px]">
                  <AnimatePresence mode="wait">
                    <motion.blockquote
                      key={item.name}
                      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <p className="text-[21px] leading-[1.55] font-medium text-ink md:text-[24px]">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <footer className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                        <span className="text-[18px] font-semibold">{item.name}</span>
                        <span aria-hidden="true" className="hidden h-6 w-px bg-black/15 sm:block" />
                        <img
                          src={item.logo}
                          alt={item.logoAlt}
                          loading="lazy"
                          draggable={false}
                          className="h-10 max-w-[170px] object-contain object-left"
                        />
                      </footer>
                    </motion.blockquote>
                  </AnimatePresence>
                </div>
              </div>

              {/* controls */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2" role="tablist" aria-label="Choose a testimonial">
                  {items.map((t, k) => (
                    <button
                      key={t.name}
                      type="button"
                      role="tab"
                      aria-selected={k === i}
                      aria-label={t.name}
                      onClick={() => go(k)}
                      className={`size-12 cursor-pointer overflow-hidden rounded-full border-2 transition-all duration-300 ${
                        k === i ? 'border-brand opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={t.photo} alt="" loading="lazy" draggable={false} className="size-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() => go(i - 1)}
                    className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-black/15 text-brand transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <ArrowLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => go(i + 1)}
                    className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-black/15 text-brand transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
