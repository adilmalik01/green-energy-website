'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ArrowLeft, MessageCircle, Check } from 'lucide-react';
import { useParams } from 'next/navigation';

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

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" fullScreen />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="heading-lg text-foreground">Product Not Found</h1>
          <Button asChild className="btn-primary">
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </main>
    );
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923001234567';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=I'm%20interested%20in%20${encodeURIComponent(product.name)}`;

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnailImage];

  return (
    <main className="section-padding bg-background">
      <div className="container-wide">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Button asChild variant="outline" className="gap-2">
            <Link href="/products">
              <ArrowLeft size={18} />
              Back to Products
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Image Section */}
          <motion.div variants={fadeInUp} className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px] bg-muted rounded-lg overflow-hidden">
              {images[selectedImage] ? (
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  ☀️
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img: string, idx: number) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(idx)}
                    className={`h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-primary'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Header */}
            <div className="space-y-3">
              <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                {product.series}
              </div>
              <h1 className="heading-lg text-foreground">{product.name}</h1>
              <p className="body-lg text-muted-foreground">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, idx: number) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Specifications</h3>
                <div className="space-y-2 card-elevated p-4 rounded-lg">
                  {Object.entries(product.specifications).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery & Warranty Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.deliveryInfo && (
                <div className="card-elevated p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-foreground text-sm">Delivery</h4>
                  <p className="text-sm text-muted-foreground">{product.deliveryInfo}</p>
                </div>
              )}
              {product.warrantyInfo && (
                <div className="card-elevated p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-foreground text-sm">Warranty</h4>
                  <p className="text-sm text-muted-foreground">{product.warrantyInfo}</p>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                className="btn-primary flex-1"
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
              <Button
                asChild
                className="btn-outline flex-1"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2" size={18} />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Related Products Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-20 pt-20 border-t border-border space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="heading-md text-foreground mb-4">More Products</h2>
            <p className="text-muted-foreground body-base max-w-lg mx-auto">
              Explore other products in this series or browse our complete catalog.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-primary">
              <Link href="/products">Browse All Products</Link>
            </Button>
            <Button asChild className="btn-secondary">
              <Link href="/about">Learn About Us</Link>
            </Button>
          </motion.div>
        </motion.section>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </main>
  );
}
