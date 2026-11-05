import { pageHeroes } from './pageHeroes';

export const joinPage = {
  hero: {
    eyebrow: 'Careers',
    title: 'Join the',
    accent: 'Iron Health Team',
    text: 'Grow your career with a mission-driven team delivering digital marketing for healthcare providers.',
    image: pageHeroes.about,
  },
  intro: {
    eyebrow: 'Grow with us',
    title: 'Help us transform healthcare,',
    accent: 'and grow your career',
    paragraphs: [
      'Iron Health Solutions is a team built on innovation and growth. We celebrate the work each person brings, and we give you the resources to reach your professional goals.',
      'Join a mission to transform healthcare marketing, and to advance the careers of the people who make it happen.',
    ],
  },
  perks: {
    eyebrow: 'Why join us',
    title: 'A place where',
    accent: 'people grow',
    items: [
      { title: 'Mission that matters', text: 'Your work helps real practices reach the patients who need them.' },
      { title: 'Room to grow', text: 'Learning, mentoring and clear steps toward your next role.' },
      { title: 'Recognition', text: 'We notice good work and celebrate wins, big and small.' },
      { title: 'Modern tools', text: 'Smart technology and automation, so you spend time on what counts.' },
      { title: 'Flexible options', text: 'Remote and field roles across the United States.' },
      { title: 'Strong team', text: 'Supportive colleagues who share ideas and help each other win.' },
    ],
  },
  jobs: {
    eyebrow: 'Open positions',
    title: 'Find your',
    accent: 'next role',
    text: 'We are hiring in several states. Pick a role that fits you and say hello.',
    list: [
      { title: 'Account Executive', place: 'Florida', type: 'On-site' },
      { title: 'Account Executive', place: 'North Florida', type: 'On-site' },
      { title: 'Account Executive', place: 'California', type: 'On-site' },
      { title: 'Account Executive', place: 'Texas', type: 'On-site' },
      { title: 'SDR', place: 'Oklahoma', type: 'Sales' },
      { title: 'SDR', place: 'Washington', type: 'Sales' },
      { title: 'Web Developer', place: 'Remote', type: 'Remote' },
    ],
    apply: { label: 'Apply', href: '#get-started' },
  },
  steps: {
    eyebrow: 'How hiring works',
    title: 'Three simple',
    accent: 'steps',
    items: [
      { n: '1', title: 'Say hello', text: 'Send your interest for the role you like. Tell us a little about you.' },
      { n: '2', title: 'Meet the team', text: 'A friendly conversation about your goals and how we can help you reach them.' },
      { n: '3', title: 'Start growing', text: 'Join us, get set up with the tools and support you need, and get going.' },
    ],
  },
};
