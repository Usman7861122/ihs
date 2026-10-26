import { motion } from 'framer-motion';

// Placeholder React island. Use in .astro files with a client directive:
// <Example client:visible />
export default function Example() {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />;
}
