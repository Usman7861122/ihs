import { useEffect, useRef, useState } from 'react';
import {
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, Gem, Mouse, MonitorSmartphone, SearchCheck } from 'lucide-react';

const ICONS = { design: Gem, responsive: MonitorSmartphone, seo: SearchCheck } as const;

interface PhoneData {
  name: string;
  headline: string;
  sub: string;
  cta: string;
  aboutImage: string;
  careImage: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutText: string;
  aboutButton: string;
  theme: { light: string; dark: string; accent: string; button: string };
  careEyebrow: string;
  careTitle: string;
  services: string[];
}

interface Site {
  id: string;
  name: string;
  specialty: string;
  laptopImage: string;
  phoneImage: string;
  phone: PhoneData;
}

interface Props {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  text: string;
  sites: Site[];
  features: { icon: keyof typeof ICONS; title: string; text: string }[];
  cta: { label: string; href: string };
}

const EASE = [0.22, 1, 0.36, 1] as const;

function FeatureCard({
  feature,
  index,
  reduce,
}: {
  feature: Props['features'][number];
  index: number;
  reduce: boolean;
}) {
  const Icon = ICONS[feature.icon];
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay: reduce ? 0 : index * 0.12 }}
      onPointerMove={onMove}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-[transform,border-color] duration-500 hover:-translate-y-2 hover:border-brand/60 md:p-9"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,0%),rgba(245,152,106,0.2),transparent_70%)]"
      />
      <span
        aria-hidden="true"
        className="absolute top-7 right-8 text-[15px] font-medium tracking-[2px] text-white/25"
      >
        0{index + 1}
      </span>
      <span className="relative flex size-[72px] items-center justify-center rounded-2xl border border-brand/40 bg-linear-to-br from-brand/25 to-brand/5 text-brand transition-all duration-500 group-hover:scale-105 group-hover:bg-brand group-hover:text-white">
        <Icon className="size-9" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="relative mt-8 text-[23px] leading-[31px] font-medium text-white">
        {feature.title}
      </h3>
      <p className="relative mt-3 text-[17px] leading-7 text-white/60">{feature.text}</p>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-700 group-hover:scale-x-100"
      />
    </motion.div>
  );
}

export default function Showcase({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  text,
  sites,
  features,
  cta,
}: Props) {
  const reduce = !!useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [hinted, setHinted] = useState(false);
  const site = sites[idx];
  const { laptopImage, phoneImage, phone } = site;
  const go = (dir: 1 | -1) => {
    setHinted(true);
    setIdx((i) => (i + dir + sites.length) % sites.length);
  };

  const laptopScreenRef = useRef<HTMLDivElement>(null);
  const laptopPageRef = useRef<HTMLImageElement>(null);
  const phoneScreenRef = useRef<HTMLDivElement>(null);
  const phonePageRef = useRef<HTMLDivElement>(null);

  // Scrolling over a screen moves the screenshot. At its top or bottom, the page scrolls as normal.
  const [touched, setTouched] = useState(false);
  const laptopPos = useMotionValue(0);
  const phonePos = useMotionValue(0);
  const laptopY = useSpring(laptopPos, { stiffness: 140, damping: 26, mass: 0.6 });
  const phoneY = useSpring(phonePos, { stiffness: 140, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const cleanups: (() => void)[] = [];

    const attach = (
      screen: HTMLElement | null,
      getPage: () => HTMLElement | null,
      pos: MotionValue<number>,
    ) => {
      if (!screen) return;
      const maxTravel = () => {
        const page = getPage();
        return page ? Math.max(0, page.offsetHeight - screen.offsetHeight) : 0;
      };
      // returns true while the screenshot can still move in that direction
      const move = (delta: number) => {
        const cur = pos.get();
        const next = Math.min(0, Math.max(-maxTravel(), cur - delta));
        if (next === cur) return false;
        pos.set(next);
        setTouched(true);
        return true;
      };

      const onWheel = (e: WheelEvent) => {
        if (e.ctrlKey) return; // pinch-zoom
        const d =
          e.deltaMode === 1
            ? e.deltaY * 32
            : e.deltaMode === 2
              ? e.deltaY * screen.offsetHeight
              : e.deltaY;
        if (move(d)) e.preventDefault();
      };
      let lastY = 0;
      const onTouchStart = (e: TouchEvent) => {
        lastY = e.touches[0].clientY;
      };
      const onTouchMove = (e: TouchEvent) => {
        const y = e.touches[0].clientY;
        const d = lastY - y;
        lastY = y;
        if (move(d) && e.cancelable) e.preventDefault();
      };

      screen.addEventListener('wheel', onWheel, { passive: false });
      screen.addEventListener('touchstart', onTouchStart, { passive: true });
      screen.addEventListener('touchmove', onTouchMove, { passive: false });
      cleanups.push(() => {
        screen.removeEventListener('wheel', onWheel);
        screen.removeEventListener('touchstart', onTouchStart);
        screen.removeEventListener('touchmove', onTouchMove);
      });
    };

    attach(laptopScreenRef.current, () => laptopPageRef.current, laptopPos);
    attach(phoneScreenRef.current, () => phonePageRef.current, phonePos);
    return () => cleanups.forEach((fn) => fn());
  }, [reduce, laptopPos, phonePos]);

  // New site: start from the top
  useEffect(() => {
    laptopPos.set(0);
    phonePos.set(0);
    laptopY.jump(0);
    phoneY.jump(0);
  }, [idx, laptopPos, phonePos, laptopY, phoneY]);

  // Hover: devices tilt toward the cursor, light follows it
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 20 });
  const sy = useSpring(my, { stiffness: 90, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [3.5, -3.5]);
  const laptopX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const phoneX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const lightX = useTransform(sx, [-0.5, 0.5], ['-30vw', '30vw']);
  const lightY = useTransform(sy, [-0.5, 0.5], ['-18vh', '18vh']);

  const onSectionMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onSectionLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="websites"
      onPointerMove={onSectionMove}
      onPointerLeave={onSectionLeave}
      className="relative z-30 -mt-12 scroll-mt-(--header-h) overflow-clip rounded-t-[44px] bg-[#120803] px-2.5 pt-[110px] pb-[110px] text-white"
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_38%,black_20%,transparent_75%)]" />
        <motion.div
          className="absolute top-[8%] left-1/2 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-brand/25 blur-[150px]"
          animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* cursor light */}
        <motion.div
          style={{ x: lightX, y: lightY }}
          className="absolute top-1/2 left-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px]">
        {/* Heading */}
        <div className="mx-auto max-w-[820px] text-center">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-button inline-flex items-center gap-4 text-brand"
          >
            <span aria-hidden="true" className="h-px w-10 bg-brand/70" />
            {eyebrow}
            <span aria-hidden="true" className="h-px w-10 bg-brand/70" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: reduce ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 !text-white"
          >
            {titleStart}{' '}
            <span className="font-(family-name:--font-accent) font-normal text-brand italic">
              {titleAccent}
            </span>{' '}
            {titleEnd}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="mx-auto mt-6 max-w-[640px] !text-white/65"
          >
            {text}
          </motion.p>
        </div>

        {/* Devices: scroll over a screen to move the screenshot */}
        <div className="relative mt-12 md:mt-16">
          <div className="flex flex-col items-center justify-center">
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 1500 }}
              className="relative w-full max-w-[1120px] pb-6"
            >
              {/* Laptop */}
              <motion.div style={{ x: laptopX }} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: reduce ? 0 : 70, scale: reduce ? 1 : 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.1, ease: EASE }}
                  className="relative mx-auto w-[88%] sm:w-[80%] md:ml-[16%] md:w-[min(78%,calc((100svh-320px)*1.5))]"
                >
                  <div className="relative rounded-t-[14px] border border-white/15 bg-[#0a0a0b] p-[1.6%] pb-[1.8%] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,0.6)] md:rounded-t-[22px]">
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.7%] left-1/2 size-1 -translate-x-1/2 rounded-full bg-white/25 md:size-1.5"
                    />
                    <div
                      ref={laptopScreenRef}
                      className={`relative aspect-[16/10] rounded-[4px] bg-black md:rounded-md ${
                        reduce ? 'overflow-y-auto' : 'overflow-hidden'
                      }`}
                    >
                      <motion.img
                        key={site.id}
                        ref={laptopPageRef}
                        src={laptopImage}
                        style={{ y: laptopY }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        alt={`${site.name} website designed by Iron Health Solutions`}
                        className="absolute top-0 left-0 h-auto w-full will-change-transform"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/12 via-transparent to-transparent"
                      />
                      {!reduce && (
                        <motion.div
                          aria-hidden="true"
                          animate={{ opacity: touched ? 0 : 1, y: touched ? 10 : 0 }}
                          transition={{ duration: 0.6 }}
                          className="pointer-events-none absolute inset-x-0 bottom-[5%] z-10 flex justify-center px-3"
                        >
                          <span className="flex items-center gap-2.5 rounded-full border border-white/15 bg-black/70 px-4 py-2.5 text-center text-[11px] leading-4 font-medium text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md md:px-6 md:py-3 md:text-[15px] md:leading-5">
                            <Mouse
                              className="size-4 shrink-0 text-brand md:size-5"
                              strokeWidth={1.7}
                            />
                            Scroll over the screens to see the entire website
                            <motion.span
                              className="inline-block text-brand"
                              animate={{ y: [0, 3, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                            >
                              ↓
                            </motion.span>
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="relative mx-auto -mt-px h-2.5 w-[114%] -translate-x-[7%] rounded-b-[18px] bg-linear-to-b from-[#e3e4e7] via-[#a8aab0] to-[#6d6f75] md:h-[17px]">
                    <span className="absolute top-0 left-1/2 h-[45%] w-[16%] -translate-x-1/2 rounded-b-xl bg-[#7d7f85]" />
                  </div>
                  <div
                    aria-hidden="true"
                    className="mx-auto mt-3 h-6 w-[90%] rounded-[50%] bg-black/70 blur-2xl"
                  />
                </motion.div>
              </motion.div>

              {/* Phone */}
              <motion.div
                style={{ x: phoneX }}
                className="absolute bottom-[4%] left-[1%] z-10 w-[27%] sm:w-[22%] md:bottom-[8%] md:left-[2%] md:w-[min(19%,calc((100svh-320px)*0.3))]"
              >
                <motion.div
                  initial={{ opacity: 0, x: reduce ? 0 : -60, rotate: reduce ? 0 : -4 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
                >
                  <div className="relative aspect-[9/18.5] rounded-[22px] border border-white/20 bg-[#0a0a0b] p-[3.2%] shadow-[0_50px_90px_-20px_rgba(0,0,0,0.95)] md:rounded-[38px]">
                    <div
                      ref={phoneScreenRef}
                      className={`relative size-full rounded-[16px] bg-[#faf9f7] [container-type:inline-size] md:rounded-[30px] ${
                        reduce ? 'overflow-y-auto' : 'overflow-hidden'
                      }`}
                    >
                      {/* scrolling mobile page */}
                      <motion.div
                        key={site.id}
                        ref={phonePageRef}
                        style={{ y: phoneY }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="will-change-transform"
                      >
                        {/* hero */}
                        <div className="relative h-[178cqw] overflow-hidden bg-black">
                          <img
                            src={phoneImage}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover object-top"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/85"
                          />
                          <div className="absolute inset-x-0 bottom-0 px-[8cqw] pb-[10cqw] text-white">
                            <p className="text-[9cqw] leading-[1.1] font-medium">{phone.headline}</p>
                            <p className="mt-[2cqw] text-[5cqw] leading-tight text-white/75">
                              {phone.sub}
                            </p>
                            <span className="mt-[5cqw] inline-block rounded-full bg-white px-[5cqw] py-[2.2cqw] text-[4.4cqw] font-medium text-black">
                              {phone.cta}
                            </span>
                          </div>
                        </div>

                        {/* about */}
                        <div
                          style={{ background: phone.theme.light }}
                          className="px-[7cqw] py-[9cqw] text-[#161616]"
                        >
                          <p className="text-[3.4cqw] tracking-[0.5cqw] text-black/45 uppercase">
                            {phone.aboutEyebrow}
                          </p>
                          <p className="mt-[2.5cqw] font-(family-name:--font-accent) text-[8cqw] leading-[1.1]">
                            {phone.aboutTitle}
                          </p>
                          <img
                            src={phone.aboutImage}
                            alt=""
                            loading="lazy"
                            className="mt-[5cqw] aspect-[4/3] w-full rounded-[2cqw] object-cover"
                          />
                          <p className="mt-[5cqw] text-[4.2cqw] leading-[1.55] text-black/65">
                            {phone.aboutText}
                          </p>
                          <span
                            style={{ background: phone.theme.button }}
                            className="mt-[5cqw] inline-block rounded-full px-[5cqw] py-[2.2cqw] text-[4.2cqw] font-medium text-white"
                          >
                            {phone.aboutButton}
                          </span>
                        </div>

                        {/* services */}
                        <div
                          style={{ background: phone.theme.dark }}
                          className="px-[7cqw] py-[9cqw] text-white"
                        >
                          <p className="text-[3.4cqw] tracking-[0.5cqw] text-white/45 uppercase">
                            {phone.careEyebrow}
                          </p>
                          <p className="mt-[2.5cqw] font-(family-name:--font-accent) text-[8cqw] leading-[1.1]">
                            {phone.careTitle}
                          </p>
                          <img
                            src={phone.careImage}
                            alt=""
                            loading="lazy"
                            className="mt-[5cqw] aspect-[4/3] w-full rounded-[2cqw] object-cover"
                          />
                          <ul className="mt-[5cqw]">
                            {phone.services.map((s, i) => (
                              <li
                                key={s}
                                className="flex items-center gap-[4cqw] border-t border-white/10 py-[4.2cqw] text-[4.4cqw]"
                              >
                                <span style={{ color: phone.theme.accent }} className="text-[3.4cqw]">
                                  0{i + 1}
                                </span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>

                      {/* fixed mobile header + island */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-linear-to-b from-black/70 to-black/0 px-[7cqw] pt-[9cqw] pb-[6cqw]">
                        <div className="flex items-center justify-between text-[5cqw] font-medium text-white">
                          <span className="truncate">{phone.name}</span>
                          <span className="flex flex-col gap-[1.2cqw]" aria-hidden="true">
                            <i className="block h-px w-[5cqw] bg-white" />
                            <i className="block h-px w-[5cqw] bg-white" />
                            <i className="block h-px w-[5cqw] bg-white" />
                          </span>
                        </div>
                      </div>
                      <span className="absolute top-[2.2%] left-1/2 z-20 h-[3.2%] w-[28%] -translate-x-1/2 rounded-full bg-black" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Site switcher */}
            <div className="relative z-20 mt-6 flex items-center justify-center gap-5 md:mt-8">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous website"
                className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <div className="min-w-[210px] text-center" aria-live="polite">
                <p className="text-[12px] tracking-[2px] text-white/45 uppercase">
                  {idx + 1} / {sites.length} · {site.specialty}
                </p>
                <p className="mt-1 text-[17px] leading-6 font-medium text-white">{site.name}</p>
              </div>
              <motion.button
                type="button"
                onClick={() => go(1)}
                aria-label="Next website"
                animate={reduce || hinted ? undefined : { x: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-brand hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <ArrowRight className="size-5" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mx-auto mt-10 grid max-w-[1120px] gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} reduce={reduce} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-14 text-center"
        >
          <a
            href={cta.href}
            className="group relative inline-flex h-[58px] items-center gap-3 overflow-hidden rounded-[50px] border border-brand bg-brand px-[34px] text-[16px] leading-4 font-medium tracking-[1px] text-white uppercase transition-colors duration-300 hover:bg-transparent hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {cta.label}
            <ArrowRight
              className="size-5 transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
