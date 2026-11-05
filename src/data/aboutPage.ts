import { pageHeroes } from './pageHeroes';

export const aboutPage = {
  hero: {
    eyebrow: 'About Us',
    title: 'About',
    accent: 'Iron Health',
    text: 'We empower healthcare practices with digital marketing that brings in more patients and builds lasting trust online.',
    image: pageHeroes.about,
    stats: [
      { value: '10+', label: 'Years of experience' },
      { value: 'CA', label: 'Based in Pasadena' },
      { value: 'USA', label: 'Practices nationwide' },
    ],
  },
  story: {
    eyebrow: 'Our story',
    title: 'Ten years of learning what',
    accent: 'really works',
    paragraphs: [
      'With over 10 years in digital marketing, we have worked side by side with many healthcare practices. Each partnership taught us what truly drives results, and what is only noise.',
      'Our goal is simple: grow your patient volume. To do that well, you need a clear strategy, the right technology, and an online presence that is easy for patients to use.',
      'That is why we build fast, responsive websites that turn visitors into booked patients, and connect them with the tools that keep your marketing running smoothly.',
    ],
    image: '/images/mission-web.jpg',
    badge: { value: '10+', label: 'years growing practices' },
  },
  pillars: {
    eyebrow: 'Our mission',
    title: 'Help practices thrive by combining',
    accent: 'marketing and technology',
    items: [
      { n: '01', title: 'Strategy', text: 'A clear plan built around your patients, your services and your local market.' },
      { n: '02', title: 'Technology', text: 'Smart tools and integrations that save time and make marketing easier to manage.' },
      { n: '03', title: 'A friendly online presence', text: 'Websites and profiles that are easy to use, easy to trust, and easy to book from.' },
    ],
  },
  why: {
    eyebrow: 'Why “Iron”?',
    title: 'A name that stands for',
    accent: 'strength you can rely on',
    quote:
      'At Iron Health Solutions, we chose the name “Iron” because it represents strength and reliability. It is what we want to be for every practice we serve.',
    values: [
      { title: 'Strength', text: 'Strong foundations: solid websites, solid strategy, solid support.' },
      { title: 'Reliability', text: 'We do what we say, and we are here when you need us.' },
      { title: 'Stability', text: 'Steady growth over quick tricks that fade next quarter.' },
      { title: 'Lasting results', text: 'Measurable, sustainable work, not passing trends.' },
    ],
  },
  process: {
    eyebrow: 'How we work',
    title: 'Simple steps,',
    accent: 'measurable growth',
    steps: [
      { n: '1', title: 'Listen & audit', text: 'We learn about your practice and check how you show up online today.' },
      { n: '2', title: 'Plan', text: 'We choose the few things that will move the needle for your patients.' },
      { n: '3', title: 'Build & launch', text: 'We design, write and set up your website, listings and tools.' },
      { n: '4', title: 'Measure & grow', text: 'We track real numbers, report in plain words, and keep improving.' },
    ],
  },
  location: {
    eyebrow: 'Where we are',
    title: 'Headquartered in',
    accent: 'Pasadena, California',
    text: 'Our team works from Pasadena and supports healthcare practices all across the United States. Wherever your patients are, we help them find you.',
    image: '/images/about-pasadena.jpg',
    cta: { label: 'Talk to our team', href: '#get-started' },
  },
};
