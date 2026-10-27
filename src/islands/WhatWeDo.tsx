import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { Megaphone, MapPinned, MonitorSmartphone, Sparkles, Star } from 'lucide-react';

const ICONS = {
  website: MonitorSmartphone,
  seo: MapPinned,
  reputation: Star,
  ai: Sparkles,
  ads: Megaphone,
} as const;

interface Item {
  icon: keyof typeof ICONS;
  title: string;
  text: string;
}

interface Props {
  titleLight: string;
  titleBold: string;
  intro: string;
  image: string;
  imageAlt: string;
  items: Item[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

interface StepProps {
  item: Item;
  index: number;
  last: boolean;
  reached: boolean;
  current: boolean;
  reduce: boolean;
  onReach: (index: number, reached: boolean) => void;
}

/** One timeline step. It watches its own scroll position: the line fills as you scroll past. */
function Step({ item, index, last, reached, current, reduce, onReach }: StepProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 62%', 'end 62%'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (v) => onReach(index, v > 0));
  useEffect(() => {
    // Settle the first state on mount (reduced motion shows everything lit)
    if (reduce) onReach(index, true);
  }, [reduce, index, onReach]);

  const Icon = ICONS[item.icon];

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: reduce ? 0 : -36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative"
    >
      {/* line segment from this icon down to the next one */}
      {!last && (
        <>
          <span
            aria-hidden="true"
            className="absolute top-16 bottom-0 left-8 w-0.5 -translate-x-1/2 rounded-full bg-black/10"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : scrollYProgress, transformOrigin: 'top' }}
            className="absolute top-16 bottom-0 left-8 w-0.5 -translate-x-1/2 rounded-full bg-brand"
          />
        </>
      )}

      <div
        className={`group/step flex gap-6 rounded-3xl pb-14 transition-opacity duration-500 md:gap-8 ${
          reached ? 'opacity-100' : 'opacity-55'
        }`}
      >
        <span className="relative z-10 shrink-0">
          {current && !reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-brand"
              initial={{ scale: 1, opacity: 0.45 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <span
            className={`relative flex size-16 items-center justify-center rounded-full border-2 transition-all duration-500 group-hover/step:scale-110 group-hover/step:border-brand group-hover/step:bg-brand group-hover/step:text-white ${
              reached
                ? 'border-brand bg-brand text-white shadow-[0_10px_30px_-8px_rgba(201,111,58,0.8)]'
                : 'border-black/15 bg-white text-brand'
            }`}
          >
            <Icon className="size-8" strokeWidth={1.7} aria-hidden="true" />
          </span>
        </span>

        <div className="pt-1.5">
          <h3
            className={`text-[22px] leading-[30px] font-medium transition-colors duration-300 group-hover/step:text-brand ${
              reached ? 'text-ink' : 'text-black/55'
            }`}
          >
            {item.title}
          </h3>
          <p className="mt-2 max-w-[460px] text-[17px] leading-7 text-black/65">{item.text}</p>
        </div>
      </div>
    </motion.li>
  );
}

export default function WhatWeDo({ titleLight, titleBold, intro, image, imageAlt, items }: Props) {
  const reduce = !!useReducedMotion();
  const n = items.length;

  const [reachedList, setReachedList] = useState<boolean[]>(() => Array(n).fill(false));
  const onReach = (index: number, reached: boolean) =>
    setReachedList((prev) => {
      if (prev[index] === reached) return prev;
      const next = [...prev];
      next[index] = reached;
      return next;
    });

  // Current step = the last one the scroll has reached
  let active = -1;
  reachedList.forEach((r, i) => {
    if (r) active = i;
  });
  const shown = items[Math.max(active, 0)];

  return (
    <section
      id="what-we-do"
      className="relative scroll-mt-(--header-h) overflow-clip bg-linear-to-b from-white via-[#fbf4ee] to-white text-ink"
    >
      {/* Living background (left side) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(201,111,58,0.35)_1.2px,transparent_1.2px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_70%_at_25%_45%,black_20%,transparent_75%)]" />
        <motion.div
          className="absolute -top-32 -left-32 size-[620px] rounded-full bg-brand/25 blur-[130px]"
          animate={reduce ? undefined : { x: [0, 80, 0], y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/4 size-[520px] rounded-full bg-brand-light/50 blur-[130px]"
          animate={reduce ? undefined : { x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[40%] left-[24%] size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/20"
          animate={reduce ? undefined : { scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative grid lg:grid-cols-2">
        {/* LEFT: heading + scrolling timeline */}
        <div className="px-2.5 py-[90px] lg:py-[110px] lg:pr-16 lg:pl-[max(10px,calc((100vw-1200px)/2))] order-2 lg:order-1">
          <div className="mx-auto max-w-[620px] lg:mx-0">
            <motion.h2
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="italic"
            >
              <span className="font-medium">{titleLight}</span>{' '}
              <span className="font-bold">{titleBold}</span>
            </motion.h2>
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="mt-5 block h-0.5 w-[184px] origin-left bg-brand"
            />
            <p className="mt-6 max-w-[520px] text-[18px] leading-7 text-black/65">{intro}</p>

            <ol className="mt-14">
              {items.map((item, i) => (
                <Step
                  key={item.title}
                  item={item}
                  index={i}
                  last={i === n - 1}
                  reached={reduce || !!reachedList[i]}
                  current={i === active}
                  reduce={reduce}
                  onReach={onReach}
                />
              ))}
            </ol>
          </div>
        </div>

        {/* RIGHT: video, 50% wide, sticks while the timeline scrolls */}
        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-(--header-h) lg:h-[calc(100svh-var(--header-h))] lg:py-8 lg:pl-2">
            <motion.div
              initial={{ opacity: 0, x: reduce ? 0 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative aspect-[5/4] w-full overflow-hidden bg-[#1a0c04] shadow-[0_40px_80px_-30px_rgba(60,25,5,0.6)] lg:aspect-auto lg:h-full lg:rounded-l-[44px]"
            >
              <motion.img
                src={image}
                alt={imageAlt}
                className="absolute inset-0 size-full object-cover"
                initial={{ scale: 1.08 }}
                animate={reduce ? { scale: 1 } : { scale: [1.08, 1, 1.08] }}
                transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/55 to-transparent"
              />

              {/* Chip follows the timeline step */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <div className="overflow-hidden rounded-full bg-black/35 backdrop-blur-md">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={shown.title}
                      initial={{ y: reduce ? 0 : 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: reduce ? 0 : -16, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex items-center gap-2.5 px-4 py-2 text-[15px] leading-6 font-medium text-white md:px-5 md:text-[17px]"
                    >
                      <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
                      {shown.title}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
