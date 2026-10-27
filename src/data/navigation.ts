export interface NavChild {
  label: string;
  desc: string;
  href: string;
}

export interface NavFeatured {
  title: string;
  text: string;
  image: string;
  href: string;
  cta: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  featured?: NavFeatured;
}

export const topbar = {
  text: 'Don’t let your practice get lost in the shift to AI Search',
  href: '/who-we-help',
};

// On this one-page site, links point to sections. Change to real pages later.
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '#about',
    children: [
      { label: 'Our Story', desc: 'Who we are and why we exist', href: '#about' },
      { label: 'What We Do', desc: 'Our step by step process', href: '#what-we-do' },
    ],
    featured: { title: 'Meet the team', text: 'Doctors and engineers building sites that win patients.', image: '/images/about.jpg', href: '#about', cta: 'Our story' },
  },
  { label: 'Who We Help', href: '/who-we-help' },
  {
    label: 'Services',
    href: '#what-we-do',
    children: [
      { label: 'Medical Website Design', desc: 'Fast, elegant sites for doctors', href: '#websites' },
      { label: 'SEO and AI Search', desc: 'Get found on Google and AI', href: '#rankings' },
      { label: 'Our Process', desc: 'From plan to launch', href: '#what-we-do' },
    ],
    featured: { title: 'See our work', text: 'Real sites we built for real practices. Scroll the full pages.', image: '/images/showcase-desktop.jpg', href: '#websites', cta: 'View websites' },
  },
  { label: 'Portfolio', href: '#websites' },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Blog', desc: 'Tips for growing your practice', href: '/blog' },
      { label: 'Pricing', desc: 'Simple and clear packages', href: '/iron-packages' },
    ],
    featured: { title: 'Simple pricing', text: 'Clear packages. No surprises.', image: '/images/showcase-care.jpg', href: '/iron-packages', cta: 'See pricing' },
  },
];

export const headerButtons = [
  { label: 'Get Started', href: '#get-started', variant: 'solid' },
  { label: 'See Pricing', href: '/iron-packages', variant: 'outline' },
] as const;
