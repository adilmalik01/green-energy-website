'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, SlidersHorizontal, ChevronRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Series {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  seriesId: string;
  series: string;
  description: string;
  image: string;
  slug: string;
}

interface ProductsSectionProps {
  series?: Series[];
  products?: Product[];
  loading?: boolean;
}

// ─── Mock data (remove when using real props) ─────────────────────────────────
const MOCK_SERIES: Series[] = [
  { _id: 's1', name: 'Residential' },
  { _id: 's2', name: 'Commercial' },
  { _id: 's3', name: 'Industrial' },
  { _id: 's4', name: 'Hybrid Systems' },
];

const MOCK_PRODUCTS: Product[] = [
  { _id: 'p1', seriesId: 's1', series: 'Residential', name: '400W Monocrystalline Panel', description: 'High-efficiency panel for homes, delivering 400W peak power with 22.1% conversion rate.', image: '', slug: 'mono-400w' },
  { _id: 'p2', seriesId: 's1', series: 'Residential', name: '500W Half-Cut Panel', description: 'Advanced half-cut cell technology reducing power loss and improving shade tolerance.', image: '', slug: 'half-cut-500w' },
  { _id: 'p3', seriesId: 's2', series: 'Commercial', name: '550W Bifacial Module', description: 'Dual-sided energy capture ideal for commercial rooftops and carports.', image: '', slug: 'bifacial-550w' },
  { _id: 'p4', seriesId: 's2', series: 'Commercial', name: '600W Commercial Elite', description: 'Built for large commercial installations with superior yield and durability.', image: '', slug: 'commercial-600w' },
  { _id: 'p5', seriesId: 's3', series: 'Industrial', name: '650W Industrial Pro', description: 'Maximum power output for industrial-scale solar farms and utility projects.', image: '', slug: 'industrial-650w' },
  { _id: 'p6', seriesId: 's4', series: 'Hybrid Systems', name: 'Hybrid 5kW Inverter Kit', description: 'All-in-one hybrid solution with battery backup, grid-tie, and smart monitoring.', image: '', slug: 'hybrid-5kw' },
  { _id: 'p7', seriesId: 's4', series: 'Hybrid Systems', name: 'Hybrid 10kW Bundle', description: 'Complete off-grid capable system for homes and businesses seeking energy independence.', image: '', slug: 'hybrid-10kw' },
  { _id: 'p8', seriesId: 's3', series: 'Industrial', name: '700W Ultra Industrial', description: 'Top-tier wattage module engineered for utility-scale power generation.', image: '', slug: 'ultra-700w' },
];
// ─────────────────────────────────────────────────────────────────────────────

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300">

          {/* Series Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-green-700 border border-green-200 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide shadow-sm">
              <Zap size={9} className="fill-green-500 text-green-500" />
              {product.series}
            </span>
          </div>

          {/* Image */}
          <div className="relative h-52 bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center relative">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`grid-${product._id}`} width="28" height="28" patternUnits="userSpaceOnUse">
                        <rect width="26" height="26" x="1" y="1" rx="2" fill="none" stroke="#16a34a" strokeWidth="0.8"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${product._id})`}/>
                  </svg>
                </div>
                {/* Solar panel SVG illustration */}
                <svg viewBox="0 0 180 110" className="w-44 h-28 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="174" height="104" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
                  {[0,1,2].map(row =>
                    [0,1,2,3].map(col => (
                      <rect
                        key={`${product._id}-${row}-${col}`}
                        x={12 + col * 40}
                        y={12 + row * 30}
                        width="34"
                        height="24"
                        rx="3"
                        fill="#dcfce7"
                        stroke="#16a34a"
                        strokeWidth="0.8"
                        strokeOpacity="0.6"
                      />
                    ))
                  )}
                  {/* Center sun icon */}
                  <circle cx="90" cy="55" r="14" fill="#16a34a" fillOpacity="0.12"/>
                  <circle cx="90" cy="55" r="6" fill="#16a34a" fillOpacity="0.5"/>
                  {[0,45,90,135].map(angle => (
                    <line
                      key={angle}
                      x1={90 + Math.cos((angle * Math.PI) / 180) * 10}
                      y1={55 + Math.sin((angle * Math.PI) / 180) * 10}
                      x2={90 + Math.cos((angle * Math.PI) / 180) * 13}
                      y2={55 + Math.sin((angle * Math.PI) / 180) * 13}
                      stroke="#16a34a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  ))}
                </svg>
              </div>
            )}
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-bold text-[15px] text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-green-700 transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* CTA row */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-[13px] font-semibold text-green-600 flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                View Details
                <ArrowRight size={14} />
              </span>
              <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-600 transition-colors duration-200">
                <ChevronRight size={13} className="text-green-600 group-hover:text-white transition-colors duration-200" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-52 bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-5/6" />
        <div className="pt-3 border-t border-gray-100">
          <div className="h-3 bg-gray-100 rounded-full w-1/3" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ProductsSection({
  series = MOCK_SERIES,
  products = MOCK_PRODUCTS,
  loading = false,
}: ProductsSectionProps) {
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const indicatorRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const allSeries: Series[] = [{ _id: 'all', name: 'All Products' }, ...series];

  const filteredProducts =
    selectedSeries === 'all'
      ? products
      : products.filter((p) => p.seriesId === selectedSeries);

  const visibleProducts = filteredProducts.slice(0, 6);

  // Slide the green indicator pill
  useEffect(() => {
    const btn = btnRefs.current[selectedSeries];
    const indicator = indicatorRef.current;
    if (btn && indicator) {
      indicator.style.width = `${btn.offsetWidth}px`;
      indicator.style.transform = `translateX(${btn.offsetLeft}px)`;
    }
  }, [selectedSeries]);

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-green-500" />
            <span className="text-xs font-semibold tracking-widest text-green-600 uppercase">
              Solar Solutions
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Our Premium
                <span className="text-green-600"> Product Series</span>
              </h2>
              <p className="mt-3 text-gray-500 text-[15px] max-w-lg leading-relaxed">
                Discover our carefully curated range of solar solutions designed to meet every need and budget.
              </p>
            </div>
            {products.length > 6 && (
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-2 text-[13px] font-semibold text-green-600 hover:text-green-700 transition-colors shrink-0"
              >
                View All <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>

        {/* ── Series Filter ── */}
        {allSeries.length > 1 && (
          <div className="mb-10 flex flex-col gap-3">
            {/* Pill track */}
            <div className="relative flex items-center bg-white border border-gray-200 rounded-2xl p-1.5 w-fit max-w-full overflow-x-auto shadow-sm"
              style={{ scrollbarWidth: 'none' }}
            >
              {/* Sliding pill */}
              <div
                ref={indicatorRef}
                className="absolute top-1.5 left-1.5 h-[calc(100%-12px)] bg-green-600 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm pointer-events-none"
                style={{ width: 0 }}
              />

              {allSeries.map((s) => {
                const count =
                  s._id === 'all'
                    ? products.length
                    : products.filter((p) => p.seriesId === s._id).length;
                const isActive = selectedSeries === s._id;

                return (
                  <button
                    key={s._id}
                    ref={(el) => { btnRefs.current[s._id] = el; }}
                    onClick={() => setSelectedSeries(s._id)}
                    className={`
                      relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl
                      text-[13px] font-semibold whitespace-nowrap
                      transition-colors duration-200
                      ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-800'}
                    `}
                  >
                    {s.name}
                    <span className={`
                      text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors duration-200
                      ${isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-gray-100 text-gray-400'}
                    `}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Results info */}
            <p className="text-xs text-gray-400 pl-1">
              Showing <span className="font-semibold text-gray-600">{}</span> of{' '}
              <span className="font-semibold text-gray-600">{filteredProducts.length}</span> products
            </p>
          </div>
        )}

        {/* ── Products Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : visibleProducts.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSeries}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleProducts.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <SlidersHorizontal size={24} className="text-green-400" />
            </div>
            <p className="text-gray-500 font-medium">No products in this series yet.</p>
            <button
              onClick={() => setSelectedSeries('all')}
              className="mt-3 text-sm text-green-600 font-semibold hover:underline"
            >
              View all products →
            </button>
          </div>
        )}

        {/* ── View All CTA ── */}
        {filteredProducts.length > 6 && (
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-[14px] rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}