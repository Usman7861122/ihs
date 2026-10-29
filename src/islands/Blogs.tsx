import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';

interface Post {
  title: string;
  summary: string;
  href: string;
  image: string;
  date: string;
  read: string;
}

interface Props {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  text: string;
  allHref: string;
  allLabel: string;
  posts: Post[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

function Meta({ post }: { post: Post }) {
  return (
    <p className="flex items-center gap-3 text-[14px] text-white/55">
      <span>{post.date}</span>
      <span aria-hidden="true" className="size-1 rounded-full bg-brand" />
      <span>{post.read}</span>
    </p>
  );
}

export default function Blogs({ eyebrow, titleStart, titleAccent, text, allHref, allLabel, posts }: Props) {
  const [main, ...rest] = posts;

  return (
    <section
      id="blogs"
      className="relative z-[90] -mt-12 scroll-mt-(--header-h) overflow-clip rounded-t-[44px] bg-[#120d0a] px-2.5 py-[88px] text-white md:py-[120px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-[6%] size-[560px] rounded-full bg-brand/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(201,111,58,0.16)_1.2px,transparent_1.2px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_80%_10%,black,transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-[1240px]">
        {/* heading row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3 text-[14px] leading-none font-semibold tracking-[3px] text-brand-light uppercase"
            >
              <span aria-hidden="true" className="h-0.5 w-10 bg-brand" />
              <BookOpen className="size-4" strokeWidth={1.8} aria-hidden="true" />
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
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="max-w-[420px] text-lead text-white/65"
          >
            {text}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
          {/* FEATURED */}
          <motion.a
            href={main.href}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="group relative block overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] md:rounded-[36px]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={main.image}
                alt=""
                loading="lazy"
                draggable={false}
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-[#120d0a] via-[#120d0a]/40 to-transparent"
              />
              <span className="absolute top-5 right-5 flex size-12 items-center justify-center rounded-full bg-white/90 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                <ArrowUpRight className="size-6" aria-hidden="true" />
              </span>
            </div>
            <div className="relative -mt-16 px-6 pb-8 md:px-9 md:pb-10">
              <Meta post={main} />
              <h3 className="mt-3 text-[24px] leading-[1.3] font-medium transition-colors duration-300 group-hover:text-brand-light md:text-[30px]">
                {main.title}
              </h3>
              <p className="mt-3 max-w-[560px] text-[16px] leading-7 text-white/60">{main.summary}</p>
            </div>
          </motion.a>

          {/* OTHERS */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {rest.map((post, i) => (
              <motion.a
                key={post.href}
                href={post.href}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.1 }}
                className="group flex flex-1 flex-col gap-5 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-4 transition-colors duration-300 hover:border-brand/60 hover:bg-brand/[0.08] sm:flex-row sm:items-center md:rounded-[32px]"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[20px] sm:w-[44%]">
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1 pr-2 pb-2 sm:pb-0">
                  <Meta post={post} />
                  <h3 className="mt-2.5 text-[19px] leading-[1.35] font-medium transition-colors duration-300 group-hover:text-brand-light">
                    {post.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium tracking-wide text-brand-light uppercase">
                    Read article
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a href={allHref} className="btn btn-glass btn-lg">
            <span className="btn-label">{allLabel}</span>
            <span className="btn-icon">
              <ArrowUpRight aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
