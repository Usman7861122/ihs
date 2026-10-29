import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';
import Aurora from '../components/ui/Aurora';

interface Logo {
  name: string;
  src: string;
}

interface Props {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  text: string;
  logos: Logo[];
}

function Strip({ logos, duration, reverse }: { logos: Logo[]; duration: number; reverse?: boolean }) {
  // Each half of the loop must be wider than the screen, so the logos repeat 4 times
  const loop = [...logos, ...logos, ...logos, ...logos];
  return (
    <div className="ehr-viewport overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <ul
        className={`ehr-track flex w-max items-center gap-14 py-5 will-change-transform md:gap-20 ${
          reverse ? 'ehr-track-reverse' : ''
        }`}
        style={{ ['--ehr-duration' as string]: `${duration}s` }}
      >
        {loop.map((logo, i) => (
          <li key={`${logo.name}-${i}`} className="group shrink-0">
            <img
              src={logo.src}
              alt={logo.name}
              width={150}
              height={150}
              loading="lazy"
              draggable={false}
              className="size-[88px] object-contain opacity-60 grayscale transition duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 md:size-[112px]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Partners({ eyebrow, titleStart, titleAccent, text, logos }: Props) {
  const half = Math.ceil(logos.length / 2);
  const rowA = logos.slice(0, half);
  const rowB = logos.slice(half);

  return (
    <section
      id="partners"
      className="relative z-[100] -mt-12 scroll-mt-(--header-h) overflow-clip rounded-t-[44px] bg-white px-2.5 pt-[88px] pb-[96px] text-ink shadow-[0_-24px_50px_-30px_rgba(0,0,0,0.5)] md:pt-[120px] md:pb-[120px]"
    >
      <Aurora />
      <div className="relative mx-auto max-w-[900px] text-center">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-[13px] leading-none font-semibold tracking-[2px] text-brand uppercase"
        >
          <Handshake className="size-4" strokeWidth={1.8} aria-hidden="true" />
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
          <span className="font-(family-name:--font-accent) font-normal text-brand">{titleAccent}</span>
        </motion.h2>
        <span aria-hidden="true" className="mx-auto mt-5 block h-0.5 w-[184px] bg-brand" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 text-lead text-black/65"
        >
          {text}
        </motion.p>
      </div>

      {/* Two plain logo strips, moving in opposite directions */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative mt-14 flex flex-col gap-4 md:mt-16"
      >
        <Strip logos={rowA} duration={40} />
        <Strip logos={rowB} duration={46} reverse />
      </motion.div>
    </section>
  );
}
