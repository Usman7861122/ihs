import { navItems } from './navigation';

const services = navItems.find((i) => i.label === 'Services')?.children ?? [];

export const footer = {
  cta: {
    title: 'Ready to Grow Your Practice?',
    text: 'Partner with Iron Health Solutions to attract more patients, strengthen your online presence, and streamline your digital strategy.',
    button: { label: 'Get Started', href: '#get-started' },
  },
  about:
    'At Iron Health Solutions, we help healthcare practices grow through innovative digital marketing, seamless technology integrations, and data-driven strategies. Our mission is to empower providers to attract more patients, build trust online, and achieve long-term success in an evolving healthcare landscape.',
  company: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about-us' },
    { label: 'Who We Help', href: '/who-we-help' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/blog/' },
  ],
  services: services.map((s) => ({ label: s.label, href: s.href })),
  legal: [
    { label: 'Terms & Conditions', href: '/terms-condition' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ],
  copyright: `© Copyright ${new Date().getFullYear()}. All Rights Reserved.`,
};
