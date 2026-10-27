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
  cta: { label: string; href: string };
  logos: Logo[];
}

function LogoCard({ logo }: { logo: Logo }) {
  return (
    <li className="group relative shrink-0">
      <div className="flex h-[132px] w-[176px] items-center justify-center rounded-2xl bg-white ring-1 ring-white/10 transition-[box-shadow,--tw-ring-color] duration-500 group-hover:shadow-[0_0_0_2px_#C96F3A,0_24px_50px_-18px_rgba(201,111,58,0.8)] md:h-[152px] md:w-[208px]">
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
        className="ehr-track flex w-max gap-4 py-3 will-change-transform md:gap-5"
        style={{ ['--ehr-duration' as string]: `${duration}s` }}
      >
        {logos.map((logo, i) => (
          <LogoCard key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </ul>
    </div>
  );
}

export default function EhrIntegrations({ titleStart, titleAccent, titleEnd, text, note, cta, logos }: Props) {
  // One row with every logo; repeated so each half is wider than the screen
  const row = [...logos, ...logos];

  return (
    <section
      id="ehr"
      className="relative z-50 -mt-12 scroll-mt-(--header-h) overflow-clip rounded-t-[44px] bg-[#120d0a] px-2.5 py-[88px] text-white md:py-[112px]"
    >
      {/* background glow + dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(201,111,58,0.22)_1.2px,transparent_1.2px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute top-1/2 left-1/2 size-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-[980px] text-center">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-[13px] leading-none font-semibold tracking-[2px] text-brand-light uppercase"
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
        <span aria-hidden="true" className="mx-auto mt-5 block h-0.5 w-[184px] bg-brand" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-[760px] text-lead text-white/75"
        >
          {text}
        </motion.p>
      </div>

      {/* Two rows moving in opposite directions */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative mt-14 flex flex-col gap-1 md:mt-16"
      >
        <Row logos={row} duration={48} />
      </motion.div>

      <div className="relative mt-12 flex flex-col items-center gap-6 text-center">
        <p className="text-body-lg text-white/60">{note}</p>
        <a href={cta.href} className="btn btn-glass btn-lg">
          <span className="btn-label">{cta.label}</span>
          <span className="btn-icon">
            <ArrowRight aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
}
