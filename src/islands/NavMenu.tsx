import {
  FileText,
  Info,
  Megaphone,
  MonitorSmartphone,
  Newspaper,
  Package,
  ScanSearch,
  Search,
  Sparkles,
  Star,
  UserPlus,
} from 'lucide-react';
import { DropdownNavigation, type NavMenuItem } from '../components/ui/dropdown-navigation';

// Same structure as ironhealthsolutions.com
const NAV_ITEMS: NavMenuItem[] = [
  { id: 1, label: 'Home', link: '/' },
  {
    id: 2,
    label: 'About',
    subMenus: [
      {
        title: 'About',
        items: [
          { label: 'About Us', description: 'Our goal is to grow your practice’s patient volume.', icon: Info, href: '/about-us' },
          { label: 'Join Iron Health Solutions', description: 'Get medical marketing, SEO and digital growth services.', icon: UserPlus, href: '/join-iron-health-solutions' },
        ],
      },
    ],
  },
  { id: 3, label: 'Who We Help', link: '/who-we-help' },
  {
    id: 4,
    label: 'Services',
    columns: 2,
    subMenus: [
      {
        title: 'Our Services',
        items: [
          { label: 'Website Design Services', description: 'Medical websites that build patient trust and growth.', icon: MonitorSmartphone, href: '/services/website-design-services' },
          { label: 'Medical SEO & Local Optimization', description: 'Boost your visibility with SEO and local search.', icon: Search, href: '/services/medical-seo-local-optimization' },
          { label: 'Onsite Content Production', description: 'Content that informs patients and lifts rankings.', icon: FileText, href: '/services/onsite-content-production' },
          { label: 'Reputation Management', description: 'Stronger reviews and more patient confidence.', icon: Star, href: '/services/reputation-management' },
          { label: 'Paid Advertisement & AI Chat Bot', description: 'More patient inquiries from ads and chatbots.', icon: Megaphone, href: '/services/paid-advertisement-ai-chat-bot' },
          { label: 'AEO', description: 'Help patients find answers faster in AI search.', icon: Sparkles, href: '/services/aeo' },
        ],
      },
    ],
  },
  { id: 5, label: 'Portfolio', link: '/portfolio' },
  {
    id: 6,
    label: 'Resources',
    align: 'right',
    subMenus: [
      {
        title: 'Resources',
        items: [
          { label: 'Blogs', description: 'Patient education that improves SEO and authority.', icon: Newspaper, href: '/blogs' },
          { label: 'Iron Packages', description: 'High-performance web solutions to grow online.', icon: Package, href: '/iron-packages' },
          { label: 'Practice Scanner', description: 'Check your site speed, SEO health and visibility.', icon: ScanSearch, href: 'https://reputation.ironhealthsolutions.com/scan-business/' },
        ],
      },
    ],
  },
];

export default function NavMenu() {
  return <DropdownNavigation navItems={NAV_ITEMS} />;
}
