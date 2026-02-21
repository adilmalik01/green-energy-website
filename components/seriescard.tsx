'use client';

import { motion } from 'framer-motion';
import { Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/loading-spinner';

const ACCENTS = [
  'from-blue-500/10 to-cyan-500/5 border-blue-500/20',
  'from-violet-500/10 to-purple-500/5 border-violet-500/20',
  'from-emerald-500/10 to-teal-500/5 border-emerald-500/20',
  'from-orange-500/10 to-amber-500/5 border-orange-500/20',
  'from-rose-500/10 to-pink-500/5 border-rose-500/20',
  'from-sky-500/10 to-indigo-500/5 border-sky-500/20',
];

const DOT_COLORS = [
  'bg-blue-500', 'bg-violet-500', 'bg-emerald-500',
  'bg-orange-500', 'bg-rose-500', 'bg-sky-500',
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

interface SeriesCardProps {
  item: { _id: string; name: string; description: string };
  index: number;
  onEdit: (item: SeriesCardProps['item']) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}

export function SeriesCard({ item, index, onEdit, onDelete, deletingId }: SeriesCardProps) {
  const isDeleting = deletingId === item._id;
  const accent = ACCENTS[index % ACCENTS.length];
  const dot = DOT_COLORS[index % DOT_COLORS.length];

  return (
    <motion.div
      variants={cardVariants}
      layout
      className={`relative rounded-2xl border bg-gradient-to-br ${accent} p-6 flex flex-col gap-4 transition-shadow duration-200 hover:shadow-lg`}
    >
      {/* Index badge */}
      <span className={`absolute top-4 right-4 w-7 h-7 rounded-full ${dot} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
        {index + 1}
      </span>

      {/* Content */}
      <div className="space-y-2 pr-8">
        <h3 className="font-bold text-foreground text-lg leading-tight">{item.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end pt-2 border-t border-border/40">
        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(item)}
            size="sm"
            variant="outline"
            className="gap-1.5 h-8 text-xs"
          >
            <Edit2 size={13} /> Edit
          </Button>
          <Button
            onClick={() => onDelete(item._id)}
            size="sm"
            disabled={isDeleting}
            className="gap-1.5 h-8 text-xs bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {isDeleting ? (
              <span className="flex items-center gap-1.5">
                <LoadingSpinner /> Deleting…
              </span>
            ) : (
              <><Trash2 size={13} /> Delete</>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}