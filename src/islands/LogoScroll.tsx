import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  label: string;
  logo: string;
  stats: { value: string; label: string }[];
}

/**
 * Scroll "zoom-through" effect: the logo grows and fades out, then the stats
 * zoom in from far away. The tall section pins a full-screen layer while you scroll.
 */
export default function LogoScroll({ label, logo, stats }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const logoScale = useTransform(p, [0, 0.25, 0.65, 1], [1, 1, 4, 4]);
  const logoOpacity = useTransform(p, [0, 0.4, 0.65, 1], [1, 1, 0, 0]);
  const gridScale = useTransform(p, [0, 0.25, 0.65, 1], [10, 10, 1, 1]);
  const gridOpacity = useTransform(p, [0, 0.4, 0.65, 1], [0, 0, 1, 1]);
  const labelOpacity = useTransform(p, [0.63, 0.69, 1], [0, 1, 1]);
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative z-[72] -mt-12 h-[280vh] rounded-t-[44px] bg-[#141210] text-white [clip-path:inset(0_round_44px_44px_0_0)]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(201,111,58,0.18),transparent_70%)]"
        />

        <motion.img
          src={logo}
          alt="Iron Health Solutions"
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="absolute w-[150px] select-none md:w-[220px]"
          draggable={false}
        />

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-28 text-xs uppercase tracking-[0.3em] text-white/50"
        >
          Scroll
        </motion.p>

        <motion.div
          style={{ scale: gridScale, opacity: gridOpacity }}
          className="relative z-10 flex w-full max-w-[1100px] flex-col items-center pt-20 md:pt-12"
        >
          <motion.div style={{ opacity: labelOpacity }} className="mb-10 flex flex-col items-center md:mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">By the numbers</span>
            <h2 className="mt-3 bg-linear-to-b from-[#fff3e8] via-brand-light to-brand bg-clip-text text-center font-(family-name:--font-accent) text-6xl font-medium italic leading-none text-transparent md:text-[110px]">
              {label}
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-16 bg-linear-to-r from-transparent to-brand-light/70" />
              <span className="size-1.5 rotate-45 bg-brand-light" />
              <span className="h-px w-16 bg-linear-to-l from-transparent to-brand-light/70" />
            </div>
          </motion.div>
          <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/[0.07] to-white/[0.02] px-5 py-7 text-center transition-all duration-500 hover:-translate-y-1 hover:border-brand-light/40 md:py-10"
              >
                <span className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-brand-light to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
                <span className="absolute right-4 top-3 font-(family-name:--font-accent) text-sm italic text-white/25">
                  0{i + 1}
                </span>
                <p className="bg-linear-to-b from-[#fff3e8] to-brand bg-clip-text font-(family-name:--font-accent) text-5xl font-semibold text-transparent md:text-7xl">
                  {s.value}
                </p>
                <p className="mx-auto mt-3 max-w-[16ch] text-sm text-white/65 md:text-base">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
