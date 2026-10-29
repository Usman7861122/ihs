import { motion } from 'framer-motion';
import { ArrowRight, Link2 } from 'lucide-react';

interface Logo {
  name: string;
  src: string;
}

interface Props {
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  text: string;
  note: string;
  video: string;
  poster: string;
  cta: { label: string; href: string };
  logos: Logo[];
}

function LogoCard({ logo }: { logo: Logo }) {
  return (
    <li className="group relative shrink-0">
      <div className="flex h-[132px] w-[176px] items-center justify-center rounded-2xl bg-white shadow-[0_14px_34px_-20px_rgba(120,60,20,0.45)] ring-1 ring-black/10 transition-[box-shadow,--tw-ring-color] duration-500 group-hover:shadow-[0_0_0_2px_#C96F3A,0_24px_50px_-18px_rgba(201,111,58,0.8)] md:h-[152px] md:w-[208px]">
        <img
          src={logo.src}
          alt={logo.name}
          width={150}
          height={150}
          loading="lazy"
          draggable={false}
          className="size-[104px] object-contain grayscale transition duration-500 group-hover:scale-110 group-hover:grayscale-0 md:size-[120px]"
        />
      </div>
    </li>
  );
}

function Row({ logos, duration }: { logos: Logo[]; duration: number }) {
  return (
    <div className="ehr-viewport overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <ul
        className="ehr-track flex w-max gap-4 py-4 will-change-transform md:gap-5"
        style={{ ['--ehr-duration' as string]: `${duration}s` }}
      >
        {logos.map((logo, i) => (
          <LogoCard key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </ul>
    </div>
  );
}

export default function EhrIntegrations({
  titleStart,
  titleAccent,
  titleEnd,
  text,
  note,
  video,
  poster,
  cta,
  logos,
}: Props) {
  // One row with every logo; repeated so each half is wider than the screen
  const row = [...logos, ...logos];

  return (
    <section
      id="ehr"
      className="relative z-50 -mt-12 scroll-mt-(--header-h) overflow-clip rounded-t-[44px] bg-linear-to-b from-white via-white to-[#fbf3ec] pt-[88px] pb-[80px] text-ink shadow-[0_-24px_50px_-30px_rgba(120,60,20,0.35)] md:pt-[112px] md:pb-[96px]"
    >
      {/* soft warm glow behind the animation */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[34%] right-[8%] h-[480px] w-[760px] max-w-full rounded-full bg-brand/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-2.5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        {/* LEFT: text */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-[13px] leading-none font-semibold tracking-[2px] text-brand uppercase"
          >
            <Link2 className="size-4" strokeWidth={1.8} aria-hidden="true" />
            Integrations
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
          <span aria-hidden="true" className="mt-5 block h-0.5 w-[184px] bg-brand" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-[520px] text-lead text-black/65"
          >
            {text}
          </motion.p>

          <p className="mt-6 max-w-[520px] text-body-lg text-black/55">{note}</p>

          <div className="mt-8">
            <a href={cta.href} className="btn btn-outline btn-lg">
              <span className="btn-label">{cta.label}</span>
              <span className="btn-icon">
                <ArrowRight aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT: animation (white background, so it blends into the page) */}
        {/* No fade or slide here: an animated wrapper stops the blend, and a white box shows */}
        <div className="relative">
          <video
            src={video}
            poster={poster}
            aria-label="Iron Health connected to EHR systems such as DrChrono, Eaglesoft, Office Ally, athenahealth, Dentrix and eClinicalWorks"
            className="block aspect-video w-full mix-blend-multiply"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>

      {/* Logos keep running along the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative mt-10 md:mt-14"
      >
        <Row logos={row} duration={48} />
      </motion.div>
    </section>
  );
}
