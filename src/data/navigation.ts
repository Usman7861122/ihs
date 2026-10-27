export interface NavChild {
  label: string;
  desc: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const topbar = {
  text: 'Don’t let your practice get lost in the shift to AI Search',
  href: '/who-we-help',
};

// Same structure as ironhealthsolutions.com (used by the mobile menu).
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about-us',
    children: [
      { label: 'About Us', desc: 'Our goal is to grow your practice’s patient volume.', href: '/about-us' },
      { label: 'Join Iron Health Solutions', desc: 'Get medical marketing, SEO and digital growth services.', href: '/join-iron-health-solutions' },
    ],
  },
  { label: 'Who We Help', href: '/who-we-help' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Website Design Services', desc: 'Medical websites that build patient trust and growth.', href: '/services/website-design-services' },
      { label: 'Medical SEO & Local Optimization', desc: 'Boost your visibility with SEO and local search.', href: '/services/medical-seo-local-optimization' },
      { label: 'Onsite Content Production', desc: 'Content that informs patients and lifts rankings.', href: '/services/onsite-content-production' },
      { label: 'Reputation Management', desc: 'Stronger reviews and more patient confidence.', href: '/services/reputation-management' },
      { label: 'Paid Advertisement & AI Chat Bot', desc: 'More patient inquiries from ads and chatbots.', href: '/services/paid-advertisement-ai-chat-bot' },
      { label: 'AEO', desc: 'Help patients find answers faster in AI search.', href: '/services/aeo' },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  {
    label: 'Resources',
    href: '/recourses',
    children: [
      { label: 'Blogs', desc: 'Patient education that improves SEO and authority.', href: '/blogs' },
      { label: 'Iron Packages', desc: 'High-performance web solutions to grow online.', href: '/iron-packages' },
      { label: 'Practice Scanner', desc: 'Check your site speed, SEO health and visibility.', href: 'https://reputation.ironhealthsolutions.com/scan-business/' },
    ],
  },
];

export const headerButtons = [
  { label: 'Get Started', href: '#get-started', variant: 'solid' },
  { label: 'See Pricing', href: '/iron-packages', variant: 'outline' },
] as const;
