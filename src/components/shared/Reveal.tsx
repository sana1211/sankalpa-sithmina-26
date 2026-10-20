import type { ReactNode } from 'react';
import { motion } from 'motion/react';

export const fadeUp = {
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: '-85px' },
  transition: { duration: 0.75, ease: 'easeOut' as const },
};

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div {...fadeUp} className={className} transition={{ duration: .75, delay, ease: 'easeOut' }}>{children}</motion.div>;
}
