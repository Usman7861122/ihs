import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Volume2, VolumeX } from 'lucide-react';

interface Point {
  title: string;
  text: string;
}

interface Props {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  text: string;
  video: string;
  poster: string;
  videoLabel: string;
  points: Point[];
  cta: { label: string; href: string };
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AiOverviews({
  eyebrow,
  titleStart,
  titleAccent,
  text,
  video,
  poster,
  videoLabel,
  points,
  cta,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play().catch(() => {});
  };

  return (
    <section
      id="ai-overviews"
      className="relative z-[70] -mt-12 scroll-mt-(--header-h) overflow-clip rounded-t-[44px] bg-linear-to-b from-[#fbf1e8] to-[#f6e8db] px-2.5 py-[88px] text-ink md:py-[120px]"
    >
      {/* One big soft copper panel behind the video (right side) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-[46%] rounded-bl-[120px] bg-white shadow-[-30px_0_60px_-40px_rgba(120,60,20,0.35)] lg:block"
      />

      <div className="relative mx-auto grid max-w-[1360px] items-center gap-14 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-20 lg:pr-6">
        {/* LEFT: text, left aligned */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-3 text-[14px] leading-none font-semibold tracking-[3px] text-brand uppercase"
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
            <span className="font-(family-name:--font-accent) font-normal text-brand">{titleAccent}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="mt-6 max-w-[500px] text-lead text-black/65"
          >
            {text}
          </motion.p>

          {/* Numbered list, plain lines (no cards) */}
          <ol className="mt-10 max-w-[500px] border-t border-black/10">
            {points.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.08 * i }}
                className="group flex gap-5 border-b border-black/10 py-5"
              >
                <span className="font-(family-name:--font-accent) text-[34px] leading-none text-brand/50 transition-colors duration-300 group-hover:text-brand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[20px] leading-7 font-medium transition-colors duration-300 group-hover:text-brand">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[16px] leading-7 text-black/60">{p.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="mt-10">
            <a href={cta.href} className="btn btn-outline btn-lg">
              <span className="btn-label">{cta.label}</span>
              <span className="btn-icon">
                <ArrowRight aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT: video, 16:9, with an offset copper block behind it */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative"
        >
          <span
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 size-full rounded-[28px] bg-brand md:-bottom-6 md:-left-6 md:rounded-[36px]"
          />
          <div className="relative aspect-video w-full overflow-hidden rounded-[28px] bg-[#120d0a] shadow-[0_40px_80px_-30px_rgba(60,25,5,0.6)] md:rounded-[36px]">
            {video ? (
              <video
                ref={videoRef}
                src={video}
                poster={poster || undefined}
                aria-label={videoLabel}
                className="absolute inset-0 size-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/55">
                <span className="flex size-16 items-center justify-center rounded-full border border-white/20 bg-white/5">
                  <Play className="size-7 translate-x-0.5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="text-[15px]">Explainer video goes here (16:9)</span>
              </div>
            )}
            {video && (
              <button
                type="button"
                onClick={toggleSound}
                aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
                aria-pressed={!muted}
                className="absolute right-4 bottom-4 flex size-11 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition-colors duration-300 hover:bg-brand md:right-5 md:bottom-5 md:size-12"
              >
                {muted ? (
                  <VolumeX className="size-5 md:size-6" strokeWidth={1.8} aria-hidden="true" />
                ) : (
                  <Volume2 className="size-5 md:size-6" strokeWidth={1.8} aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
