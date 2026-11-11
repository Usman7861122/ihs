import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';

interface HeroProps {
  title: { word: string; accent?: boolean; newLine?: boolean }[];
  text: string;
  cta: { label: string; href: string };
  video: string;
  poster: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({ title, text, cta, video, poster }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll effects: content fades up (the video stays still, no zoom)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, reduce ? 1 : 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Entrance: words slide up from behind a mask, one after another
  const titleVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.25 } },
  };
  const wordVariants: Variants = {
    hidden: { y: reduce ? '0%' : '112%', opacity: reduce ? 0 : 1 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: reduce ? 0.2 : 0.95, ease: EASE },
    },
  };
  const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.8, ease: EASE, delay: reduce ? 0 : delay },
    },
  });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#140701] pt-(--header-h) text-white md:h-[56.25vw] md:min-h-[640px] md:bg-[#2a1208] md:pt-0"
    >
      {/* Background video */}
      {/* Phone: the video sits on its own, text goes below it. Desktop: video fills the section. */}
      <div className="relative aspect-[4/3] w-full md:absolute md:inset-0 md:aspect-auto">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden="true"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      {/* Readability overlays */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(20,7,1,0.85)_0%,rgba(20,7,1,0.62)_35%,rgba(20,7,1,0.3)_60%,rgba(20,7,1,0)_85%)] md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-48 bg-linear-to-b from-black/25 to-transparent md:block"
      />

      {/* Content */}
      <div className="relative z-10 px-2.5 md:h-full">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="mx-auto w-full max-w-(--container-header) pt-8 pb-[92px] md:flex md:h-full md:items-center md:pt-(--header-h) md:pb-[10vh]"
        >
          <div className="max-w-[500px]">
            <motion.h1
              className="[text-shadow:0_2px_28px_rgba(0,0,0,0.4)]"
              variants={titleVariants}
              initial="hidden"
              animate="show"
              aria-label={title.map((t) => t.word).join(' ')}
            >
              {title.map(({ word, accent, newLine }, i) => (
                <span key={i} aria-hidden="true">
                  {newLine && <br />}
                  <span className="-mt-[0.1em] -mb-[0.14em] -ml-[0.1em] inline-block overflow-hidden pt-[0.1em] pr-[0.08em] pb-[0.14em] pl-[0.1em] align-bottom">
                    <motion.span
                      variants={wordVariants}
                      className={
                        accent
                          ? 'inline-block cursor-default font-(family-name:--font-accent) font-normal text-brand italic transition-colors duration-300 hover:text-white'
                          : 'inline-block cursor-default transition-colors duration-300 hover:text-brand'
                      }
                    >
                      {word}
                    </motion.span>
                  </span>{' '}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeUp(0.85)}
              initial="hidden"
              animate="show"
              className="mt-5 max-w-[500px] text-white [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]"
            >
              {text}
            </motion.p>

            <motion.div
              variants={fadeUp(1.05)}
              initial="hidden"
              animate="show"
              className="mt-[34px]"
            >
              <a href={cta.href} className="btn btn-primary btn-lg btn-spin">
                <span className="btn-label">{cta.label}</span>
                <span className="btn-icon" aria-hidden="true">
                  <ArrowRight strokeWidth={2} />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: cueOpacity }}
        aria-hidden="true"
        className="absolute bottom-[104px] left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 1.8, duration: 0.6 }}
          className="flex h-11 w-[26px] justify-center rounded-full border border-white/60 pt-2"
        >
          <motion.span
            className="block h-2 w-[3px] rounded-full bg-white"
            animate={reduce ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
