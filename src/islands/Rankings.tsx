import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { MapPin, Search, Sparkles, Star } from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

interface Shot {
  label: string;
  src: string;
  alt: string;
  tone: 'plain' | 'brand';
}

interface Props {
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
  shots: Shot[];
}

// Floating chips around the card: they drift on their own and lean away from the cursor
const CHIPS = [
  { icon: MapPin, label: 'Google Maps', pos: 'left-[5%] top-[30%]', depth: 26, delay: 0 },
  { icon: Star, label: 'Patient reviews', pos: 'left-[9%] top-[58%]', depth: -18, delay: 1.2 },
  { icon: Sparkles, label: 'AI Overview', pos: 'right-[6%] top-[28%]', depth: 22, delay: 0.6 },
  { icon: Search, label: 'Medical SEO', pos: 'right-[9%] top-[56%]', depth: -26, delay: 1.8 },
] as const;

function Chip({
  chip,
  sx,
  sy,
  reduce,
}: {
  chip: (typeof CHIPS)[number];
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduce: boolean;
}) {
  const x = useTransform(sx, [-0.5, 0.5], [-chip.depth, chip.depth]);
  const y = useTransform(sy, [-0.5, 0.5], [-chip.depth, chip.depth]);
  const Icon = chip.icon;
  return (
    <motion.div style={{ x, y }} className={`absolute hidden xl:block ${chip.pos}`}>
      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 5 + chip.delay, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
        className="group pointer-events-auto flex cursor-default items-center gap-3 rounded-full border border-brand/25 bg-white/75 py-2.5 pr-5 pl-2.5 shadow-[0_18px_40px_-16px_rgba(245,152,106,0.55)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-white"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-brand/15 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
          <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
        </span>
        <span className="text-[16px] leading-6 font-medium text-black/75">{chip.label}</span>
      </motion.div>
    </motion.div>
  );
}

export default function Rankings({ titleStart, titleAccent, titleEnd, subtitle, shots }: Props) {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Pointer position for the spotlight (CSS vars) and for the chip parallax (motion values)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
    if (!reduce) {
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    }
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={ref}
      id="rankings"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ ['--mx' as string]: '50%', ['--my' as string]: '30%' }}
      className="relative z-40 -mt-12 scroll-mt-(--header-h) overflow-clip rounded-t-[44px] bg-linear-to-b from-white via-[#fff4ea] to-white px-2.5 pt-[88px] text-ink md:pt-[104px]"
    >
      {/* Living background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* faint dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(245,152,106,0.3)_1.2px,transparent_1.2px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        {/* brighter dots revealed around the cursor */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(245,152,106,0.95)_1.6px,transparent_1.6px)] bg-[size:28px_28px] [mask-image:radial-gradient(240px_circle_at_var(--mx)_var(--my),black,transparent)]" />
        {/* cursor glow */}
        <div className="absolute inset-0 [background:radial-gradient(460px_circle_at_var(--mx)_var(--my),rgba(245,152,106,0.18),transparent_70%)]" />

        {/* drifting glows */}
        <motion.div
          className="absolute top-[10%] -left-40 size-[560px] rounded-full bg-brand/25 blur-[130px]"
          animate={reduce ? undefined : { x: [0, 90, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[45%] -right-40 size-[520px] rounded-full bg-brand-light/60 blur-[130px]"
          animate={reduce ? undefined : { x: [0, -80, 0], y: [0, -50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* slow rings behind the card */}
        <motion.div
          className="absolute top-[58%] left-1/2 size-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/20"
          animate={reduce ? undefined : { scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[58%] left-1/2 size-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/12"
          animate={reduce ? undefined : { scale: [1, 1.04, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

        {/* floating chips (react to the cursor) */}
        {CHIPS.map((chip) => (
          <Chip key={chip.label} chip={chip} sx={sx} sy={sy} reduce={reduce} />
        ))}
      </div>

      <div className="relative">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="italic">
                <span className="font-medium">{titleStart}</span>{' '}
                <span className="font-(family-name:--font-accent) font-normal text-brand">
                  {titleAccent}
                </span>{' '}
                <span className="font-medium">{titleEnd}</span>
              </h2>
              <span aria-hidden="true" className="mx-auto mt-5 block h-0.5 w-[184px] bg-brand" />
              <h3 className="mt-6 text-black/70">{subtitle}</h3>
            </>
          }
        >
          <div className="grid size-full gap-2 md:grid-cols-2 md:items-center md:gap-4">
            {shots.map((shot) => {
              const Icon = shot.tone === 'brand' ? Sparkles : Search;
              return (
                <figure
                  key={shot.label}
                  className="group relative flex min-h-0 flex-col overflow-hidden rounded-xl bg-white ring-2 ring-transparent transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_rgba(245,152,106,0.7)] hover:ring-brand/60"
                >
                  <figcaption className="flex items-center gap-2.5 border-b border-black/10 px-4 py-2.5 md:py-3">
                    <span
                      className={`flex size-7 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 ${
                        shot.tone === 'brand' ? 'bg-brand text-white' : 'bg-black/8 text-black/70'
                      }`}
                    >
                      <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span
                      className={`text-[15px] leading-5 font-medium md:text-[17px] ${
                        shot.tone === 'brand' ? 'text-brand' : 'text-black/80'
                      }`}
                    >
                      {shot.label}
                    </span>
                  </figcaption>
                  <div className="min-h-0 flex-1 overflow-hidden md:flex-none">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      loading="lazy"
                      draggable={false}
                      className="size-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.04] md:h-auto"
                    />
                  </div>
                </figure>
              );
            })}
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
