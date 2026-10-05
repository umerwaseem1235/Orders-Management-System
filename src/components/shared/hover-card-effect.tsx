'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HoverCardEffectProps {
  children: ReactNode;
  className?: string;
}

export function HoverCardEffect({ children, className }: HoverCardEffectProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 24px -4px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn('rounded-xl', className)}
    >
      {children}
    </motion.div>
  );
}
