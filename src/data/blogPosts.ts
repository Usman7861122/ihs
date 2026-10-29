// Blog posts live on this site. The article text is in src/data/blog-import/*.json
// and each cover image is in public/images/blog/<slug>.webp.

interface Imported {
  slug: string;
  title: string;
  published: string;
  text: string;
  imgW: number;
  imgH: number;
}

export interface BlogPost {
  slug: string;
  href: string;
  title: string;
  summary: string;
  image: string;
  imageW: number;
  imageH: number;
  published: string;
  date: string;
  read: string;
  body: string;
}

// Short summaries written for the cards and the top of each article
const SUMMARIES: Record<string, string> = {
  '7-proven-dental-implant-marketing-strategies-to-grow-your-practice-in-2026':
    'Seven ways dental implant practices can reach more patients, from local SEO and education to paid ads, financing and reviews.',
  '7-med-spa-marketing-strategies-to-attract-more-clients-in-2026':
    'Seven tactics, such as local SEO, video and loyalty programs, to win and keep med spa clients.',
  '5-essential-healthcare-marketing-strategies-to-grow-your-practice-in-2026':
    'Five core tactics for healthcare practices: online presence, ads, local SEO, an AI chatbot and tracking.',
};

const files = import.meta.glob<Imported>('./blog-import/*.json', { eager: true, import: 'default' });

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export const blogPosts: BlogPost[] = Object.values(files)
  .map((p) => {
    const words = p.text.split(/\s+/).length;
    return {
      slug: p.slug,
      href: `/blog/${p.slug}/`,
      title: p.title,
      summary: SUMMARIES[p.slug] ?? '',
      image: `/images/blog/${p.slug}.webp`,
      imageW: p.imgW,
      imageH: p.imgH,
      published: p.published,
      date: fmt.format(new Date(p.published)),
      read: `${Math.max(2, Math.round(words / 200))} min read`,
      body: p.text,
    };
  })
  .sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title));
