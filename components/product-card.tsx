'use client';

import { motion } from 'framer-motion';
import { Trash2, Edit2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

interface Product {
  _id: string;
  name: string;
  description: string;
  thumbnailImage?: string;
  series?: { _id: string; name: string } | string;
  warrantyInfo?: string;
  deliveryInfo?: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const seriesName =
    product.series && typeof product.series === 'object'
      ? product.series.name
      : product.series;

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="card-elevated rounded-2xl overflow-hidden flex flex-col group"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {product.thumbnailImage ? (
          <img
            src={product.thumbnailImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Package size={48} className="opacity-20" />
          </div>
        )}
        {seriesName && (
          <span className="absolute top-3 left-3 bg-primary/90 backdrop-blur text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            {seriesName}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-semibold text-foreground text-base leading-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Badges */}
        {(product.warrantyInfo || product.deliveryInfo) && (
          <div className="flex flex-wrap gap-2 text-xs">
            {product.warrantyInfo && (
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                {product.warrantyInfo}
              </span>
            )}
            {product.deliveryInfo && (
              <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
                {product.deliveryInfo}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1 border-t border-border/40">
          <Button
            onClick={() => onEdit(product)}
            size="sm"
            variant="outline"
            className="flex-1 gap-1.5 h-8 text-xs"
          >
            <Edit2 size={13} /> Edit
          </Button>
          <Button
            onClick={() => onDelete(product._id)}
            size="sm"
            className="flex-1 gap-1.5 h-8 text-xs bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <Trash2 size={13} /> Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
}