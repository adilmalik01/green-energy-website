'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { SeriesCard } from '@/components/series-card';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ArrowRight } from 'lucide-react';
import Banner from '@/components/Banner';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProductsPage() {
  const [series, setSeries] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filteredCount, setFilteredCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch series
        const seriesRes = await fetch('/api/series');
        if (seriesRes.ok) {
          const seriesData = await seriesRes.json();
          setSeries(seriesData);
        }

        // Fetch products
        const productsRes = await fetch('/api/products');
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          const productsArray = productsData.products || productsData;
          setProducts(productsArray);
          setFilteredCount(productsArray.length);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = selectedSeries
    ? products.filter((p) => p.series === selectedSeries)
    : products;

  useEffect(() => {
    setFilteredCount(filteredProducts.length);
  }, [filteredProducts]);

  return (
    <main>
      {/* Hero Section */}
      <Banner title='Our Solar Solutions' description='Browse our complete range of premium solar panels, inverters, batteries, and mounting systems designed for Pakistani climate.' imageUrl='/banners/banner1.png' />

      {/* Products Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-12"
          >
            {/* Series Filter */}
            {series.length > 0 && (
              <motion.div variants={fadeInUp} className="space-y-6 pb-8 border-b border-border">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Filter by Series</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedSeries === null
                      ? `Showing all ${products.length} products`
                      : `Showing ${filteredCount} product${filteredCount !== 1 ? 's' : ''}`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    onClick={() => setSelectedSeries(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedSeries === null
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-card text-foreground border border-border hover:border-primary hover:bg-primary/5'
                      }`}
                  >
                    All Products
                  </motion.button>
                  {series.map((s) => (
                    <motion.button
                      key={s._id}
                      onClick={() => setSelectedSeries(s._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedSeries === s._id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-card text-foreground border border-border hover:border-primary hover:bg-primary/5'
                        }`}
                    >
                      {s.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="flex items-center justify-center min-h-96">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product._id} variants={fadeInUp}>
                    <ProductCard
                      id={product._id}
                      name={product.name}
                      series={product.series}
                      description={product.description}
                      image={product.thumbnailImage}
                      slug={product.slug}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={fadeInUp}
                className="text-center py-16"
              >
                <p className="text-muted-foreground text-lg mb-6">
                  No products available in this series yet.
                </p>
                <Button asChild className="btn-primary">
                  <Link href="/">Back to Home</Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-background/50">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-8"
          >
            <motion.div variants={fadeInUp} className="text-center space-y-4">
              <h2 className="heading-lg text-foreground">
                Need Help Choosing?
              </h2>
              <p className="body-base text-muted-foreground">
                Our solar experts are ready to help you find the perfect solution for your needs.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="text-center space-y-4"
            >
              <p className="text-muted-foreground body-base">
                Contact us today for a free consultation and personalized recommendation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-primary">
                  <Link href="/contact">
                    Get a Consultation <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="
    bg-[#7CB518] 
    hover:bg-[#6AA312]
    text-white
    font-semibold
    px-8 py-3
    rounded-lg
    transition-all duration-300
    shadow-sm
  "
                >
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') ||
                      '923001234567'
                      }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
