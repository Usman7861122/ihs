import { BookOpen, CircleDollarSign, Globe, Layers, MonitorSmartphone, Newspaper, Search, Users } from 'lucide-react';
import { DropdownNavigation, type NavMenuItem } from '../components/ui/dropdown-navigation';

// On this one-page site, links point to sections. Change to real pages later.
const NAV_ITEMS: NavMenuItem[] = [
  { id: 1, label: 'Home', link: '/' },
  {
    id: 2,
    label: 'About',
    subMenus: [
      {
        title: 'Company',
        items: [
          { label: 'Our Story', description: 'Who we are and why we exist', icon: Users, href: '#about' },
          { label: 'What We Do', description: 'Our step by step process', icon: Layers, href: '#what-we-do' },
        ],
      },
    ],
  },
  { id: 3, label: 'Who We Help', link: '/who-we-help' },
  {
    id: 4,
    label: 'Services',
    subMenus: [
      {
        title: 'Grow your practice',
        items: [
          { label: 'Medical Website Design', description: 'Fast, elegant sites for doctors', icon: MonitorSmartphone, href: '#websites' },
          { label: 'SEO and AI Search', description: 'Get found on Google and AI', icon: Search, href: '#rankings' },
          { label: 'Our Process', description: 'From plan to launch', icon: Layers, href: '#what-we-do' },
        ],
      },
    ],
  },
  { id: 5, label: 'Portfolio', link: '#websites' },
  {
    id: 6,
    label: 'Resources',
    align: 'right',
    subMenus: [
      {
        title: 'Learn',
        items: [
          { label: 'Blog', description: 'Tips for growing your practice', icon: Newspaper, href: '/blog' },
          { label: 'Guides', description: 'Find help quickly', icon: BookOpen, href: '/resources' },
        ],
      },
      {
        title: 'Plans',
        items: [
          { label: 'Pricing', description: 'Simple and clear packages', icon: CircleDollarSign, href: '/iron-packages' },
          { label: 'Portfolio', description: 'Websites we built', icon: Globe, href: '#websites' },
        ],
      },
    ],
  },
];

export default function NavMenu() {
  return <DropdownNavigation navItems={NAV_ITEMS} />;
}
