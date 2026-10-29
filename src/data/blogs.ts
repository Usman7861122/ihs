import { blogPosts } from './blogPosts';

export const blogs = {
  eyebrow: 'Blogs',
  titleStart: 'Our',
  titleAccent: 'Blog',
  text: 'Simple, useful ideas to help your practice get found, trusted and booked.',
  allHref: '/blog/',
  allLabel: 'View all articles',
  posts: blogPosts.map((p) => ({
    title: p.title,
    summary: p.summary,
    href: p.href,
    image: p.image,
    date: p.date,
    read: p.read,
  })),
};
