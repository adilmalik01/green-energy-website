'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  series: string;
  description: string;
  image: string;
  slug: string;
}

export function ProductCard({
  id,
  name,
  series,
  description,
  image,
  slug,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/products/${slug}`}>
        <div className="card-elevated rounded-xl overflow-hidden">
          {/* Image Container */}
          <div className="relative h-64 bg-muted overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-primary/40 text-center">
                  <div className="text-4xl mb-2">☀️</div>
                  <p className="text-sm">No image</p>
                </div>
              </div>
            )}
            {/* Badge */}
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {series}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-3">
            <h3 className="font-bold text-lg text-foreground line-clamp-2">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>

            {/* CTA */}
            <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all pt-2">
              View Details
              <ArrowRight size={16} className="ml-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
