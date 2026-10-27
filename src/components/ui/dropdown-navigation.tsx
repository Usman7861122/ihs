import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ElementType } from 'react';

export type NavSubItem = {
  label: string;
  description: string;
  icon: ElementType;
  href: string;
};

export type NavMenuItem = {
  id: number;
  label: string;
  link?: string;
  align?: 'left' | 'right';
  columns?: 1 | 2;
  subMenus?: { title: string; items: NavSubItem[] }[];
};

export function DropdownNavigation({ navItems }: { navItems: NavMenuItem[] }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isHover, setIsHover] = useState<number | null>(null);

  return (
    <nav aria-label="Main">
      <ul className="relative flex items-center">
        {navItems.map((navItem) => {
          const active = isHover === navItem.id || openMenu === navItem.label;
          const Tag = navItem.link ? 'a' : 'button';
          return (
            <li
              key={navItem.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(navItem.label)}
              onMouseLeave={() => setOpenMenu(null)}
              onFocus={() => setOpenMenu(navItem.label)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null);
              }}
            >
              <Tag
                {...(navItem.link ? { href: navItem.link } : { type: 'button' as const })}
                aria-haspopup={navItem.subMenus ? 'true' : undefined}
                aria-expanded={navItem.subMenus ? openMenu === navItem.label : undefined}
                className={`group relative flex h-10 cursor-pointer items-center justify-center gap-1.5 px-3.5 text-[16px] leading-5 transition-colors duration-300 ${
                  active ? 'text-[#c9622d]' : 'text-ink'
                }`}
                onMouseEnter={() => setIsHover(navItem.id)}
                onMouseLeave={() => setIsHover(null)}
              >
                <span className="relative z-10">{navItem.label}</span>
                {navItem.subMenus && (
                  <ChevronDown
                    className={`relative z-10 h-4 w-4 transition-transform duration-300 ${
                      openMenu === navItem.label ? 'rotate-180' : ''
                    }`}
                  />
                )}
                {active && (
                  <motion.span
                    layoutId="hover-bg"
                    className="absolute inset-0 rounded-button bg-brand/10 ring-1 ring-brand/30 ring-inset"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Tag>

              <AnimatePresence>
                {openMenu === navItem.label && navItem.subMenus && (
                  <div
                    className={`absolute top-full z-50 pt-3 ${navItem.align === 'right' ? 'right-0' : 'left-0'}`}
                  >
                    <motion.div
                      className="w-max rounded-xl border border-brand/25 bg-white/95 p-5 shadow-[0_36px_70px_-28px_rgba(60,25,8,0.45)] backdrop-blur-xl"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex w-fit shrink-0 space-x-10">
                        {navItem.subMenus.map((sub) => (
                          <div key={sub.title} className="w-full">
                            <h3 className="mb-4 text-[12px] font-medium tracking-[1.5px] text-brand uppercase">
                              {sub.title}
                            </h3>
                            <ul className={navItem.columns === 2 ? 'grid grid-cols-2 gap-x-10 gap-y-5' : 'space-y-5'}>
                              {sub.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <li key={item.label}>
                                    <a
                                      href={item.href}
                                      onClick={() => setOpenMenu(null)}
                                      className="group/item flex items-start space-x-3"
                                    >
                                      <div className="flex size-10 shrink-0 items-center justify-center rounded-button border border-brand/30 text-brand transition-all duration-300 group-hover/item:border-brand group-hover/item:bg-brand group-hover/item:text-white group-hover/item:shadow-[0_10px_20px_-8px_rgba(245,152,106,0.9)]">
                                        <Icon className="h-5 w-5 flex-none" strokeWidth={1.75} />
                                      </div>
                                      <div className="w-[250px] leading-5 transition-transform duration-300 group-hover/item:translate-x-1">
                                        <p className="text-[16px] font-medium text-ink">{item.label}</p>
                                        <p className="text-[14px] text-[#7a6a62] transition-colors duration-300 group-hover/item:text-ink">
                                          {item.description}
                                        </p>
                                      </div>
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
