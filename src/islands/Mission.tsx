import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Props {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  text: string;
  cta: { label: string; href: string };
  image: string;
}

export default function Mission({ eyebrow, titleStart, titleAccent, text, cta, image }: Props) {
  return (
    <section
      id="mission"
      // clip-path makes the fixed layer visible only inside this section (works on phones too)
      className="relative z-[60] flex min-h-screen items-center justify-center px-2.5 py-[120px] text-white [clip-path:inset(0)]"
    >
      {/* Fixed window: the photo stays still while the page scrolls over it */}
      <div aria-hidden="true" className="fixed inset-0 -z-10">
        <img src={image} alt="" draggable={false} className="size-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(18,13,10,0.15),rgba(18,13,10,0.75)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-brand/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1200px] text-center">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block text-[14px] leading-none font-semibold tracking-[3px] text-brand-light uppercase"
        >
          {eyebrow}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="text-[clamp(32px,7.2vw,100px)] leading-[1.05] whitespace-nowrap italic"
        >
          <span className="font-medium">{titleStart}</span>{' '}
          <span className="font-(family-name:--font-accent) font-normal text-brand underline decoration-brand decoration-2 underline-offset-[14px]">{titleAccent}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-10 max-w-[780px] text-[19px] leading-[31px] text-white/85 md:text-[22px] md:leading-[36px]"
        >
          {text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10"
        >
          <a href={cta.href} className="btn btn-primary btn-lg">
            <span className="btn-label">{cta.label}</span>
            <span className="btn-icon">
              <ArrowRight aria-hidden="true" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
