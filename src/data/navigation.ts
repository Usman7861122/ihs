export interface NavItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

export const topbar = {
  text: 'Don’t let your practice get lost in the shift to AI Search',
  href: '/who-we-help',
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us', hasDropdown: true },
  { label: 'Who We Help', href: '/who-we-help' },
  { label: 'Services', hasDropdown: true },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Resources', href: '/resources', hasDropdown: true },
];

export const headerButtons = [
  { label: 'Get Started', href: '#get-started', variant: 'solid' },
  { label: 'See Pricing', href: '/iron-packages', variant: 'outline' },
] as const;
