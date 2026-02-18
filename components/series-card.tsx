'use client';

import { motion } from 'framer-motion';

interface SeriesCardProps {
  name: string;
  description: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function SeriesCard({
  name,
  description,
  isActive = false,
  onClick,
}: SeriesCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-6 rounded-lg border-2 transition-all duration-300 text-left w-full ${
        isActive
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-card text-foreground border-border hover:border-primary'
      }`}
    >
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      <p className="text-sm opacity-80 line-clamp-2">{description}</p>
    </motion.button>
  );
}
