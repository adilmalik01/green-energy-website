'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { SeriesCard } from '@/components/series-card';
import { LoadingSpinner } from '@/components/loading-spinner';
import { HeroCarousel } from '@/components/hero-carousel';
import { Phone, Mail, TrendingUp, Zap, Shield, ArrowRight, MessageCircle, Leaf, Lightbulb } from 'lucide-react';

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

export default function Home() {
  const [series, setSeries] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch series
        const seriesRes = await fetch('/api/series');
        if (seriesRes.ok) {
          const seriesData = await seriesRes.json();
          setSeries(seriesData);
          if (seriesData.length > 0) {
            setSelectedSeries(seriesData[0]._id);
          }
        }

        // Fetch products
        const productsRes = await fetch('/api/products');
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(Array.isArray(productsData.products) ? productsData.products : []);

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

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923001234567';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Green%20Energy%20Pakistan`;

  return (
    <main>
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Company Introduction - Expanded */}
      <section className="section-padding bg-background/50 border-b border-border">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            {/* Main Intro */}
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="heading-lg text-foreground">
                Leading Pakistan's Renewable Energy Revolution
              </h2>
              <p className="body-lg text-muted-foreground">
                Since 2008, Green Energy Pakistan has been at the forefront of sustainable energy solutions. We're committed to empowering every home and business with affordable, reliable solar power.
              </p>
            </motion.div>

            {/* Key Values Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { icon: Leaf, title: 'Sustainability', desc: 'Environmental responsibility drives every decision' },
                { icon: Lightbulb, title: 'Innovation', desc: 'Latest technology and continuous improvement' },
                { icon: Shield, title: 'Reliability', desc: 'Products built to last 25+ years' },
                { icon: TrendingUp, title: 'Value', desc: 'Maximum ROI and energy savings for you' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="card-elevated p-8 rounded-lg space-y-4 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="text-primary" size={24} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Mission & Vision */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <div className="text-primary text-xl font-bold">Our Mission</div>
                <p className="body-base text-muted-foreground">
                  To make solar energy accessible, affordable, and reliable for every Pakistani. We believe that clean energy is a right, not a luxury, and we're dedicated to breaking down barriers to renewable power adoption.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="space-y-4">
                <div className="text-primary text-xl font-bold">Our Vision</div>
                <p className="body-base text-muted-foreground">
                  A Pakistan powered by sustainable energy, where solar systems are as common as smartphones. We envision a future where every household and business generates its own clean, affordable power.
                </p>
              </motion.div>
            </motion.div>

            {/* Company Stats */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border"
            >
              {[
                { number: '15+', label: 'Years in Business' },
                { number: '5000+', label: 'Happy Customers' },
                { number: '10MW+', label: 'Installed Capacity' },
                { number: '500+', label: 'Expert Technicians' },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp} className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="text-center">
              <Button asChild className="btn-primary">
                <Link href="/about">
                  Discover Our Full Story <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mid-Page CTA Section */}


      {/* Products Section */}
      <section className="section-padding bg-background/50">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="space-y-4 max-w-2xl">
              <h2 className="heading-lg text-foreground">
                Our Premium Product Series
              </h2>
              <p className="body-base text-muted-foreground">
                Discover our carefully curated range of solar solutions designed to meet every need and budget.
              </p>
            </motion.div>

            {/* Series Filter */}
            {series.length > 0 && (
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {series.map((s) => (
                  <SeriesCard
                    key={s._id}
                    name={s.name}
                    description={s.description}
                    isActive={selectedSeries === s._id}
                    onClick={() => setSelectedSeries(s._id)}
                  />
                ))}
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
                {filteredProducts.slice(0, 6).map((product) => (
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
                className="text-center py-12"
              >
                <p className="text-muted-foreground">No products available</p>
              </motion.div>
            )}

            {/* View All CTA */}
            {products.length > 6 && (
              <motion.div variants={fadeInUp} className="text-center">
                <Button asChild className="btn-outline">
                  <Link href="/products">
                    View All Products <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="heading-lg text-foreground">
                Why Choose Green Energy Pakistan?
              </h2>
              <p className="body-base text-muted-foreground">
                We're not just another solar provider. Here's what sets us apart.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: 'Premium Quality',
                  description: 'We source only tier-1 components from globally recognized manufacturers.',
                  icon: Shield,
                },
                {
                  title: 'Expert Installation',
                  description: 'Our certified technicians ensure perfect installation and setup.',
                  icon: Zap,
                },
                {
                  title: 'Lifetime Support',
                  description: '24/7 customer support and maintenance services for peace of mind.',
                  icon: MessageCircle,
                },
                {
                  title: 'Competitive Pricing',
                  description: 'Best value for money without compromising on quality.',
                  icon: TrendingUp,
                },
                {
                  title: 'Warranty & Guarantees',
                  description: 'Comprehensive warranties covering all equipment and installation.',
                  icon: Shield,
                },
                {
                  title: 'Custom Solutions',
                  description: 'Tailored solar systems designed for your specific needs.',
                  icon: Zap,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="card-elevated p-8 rounded-lg space-y-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <item.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="section-padding bg-background border-b border-border">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto space-y-12"
          >
            <motion.div variants={fadeInUp} className="text-center space-y-4">
              <h2 className="heading-lg text-foreground">
                Get Your Free Solar Consultation
              </h2>
              <p className="body-base text-muted-foreground">
                Share your details and our energy experts will contact you within 24 hours with a personalized solar plan and cost analysis.
              </p>
            </motion.div>

            <motion.form
              variants={fadeInUp}
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    body: JSON.stringify(Object.fromEntries(formData)),
                  });
                  if (res.ok) {
                    alert('Thank you! We will contact you soon.');
                    (e.target as HTMLFormElement).reset();
                  }
                } catch (error) {
                  alert('Something went wrong. Please try again.');
                }
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                name="message"
                placeholder="Tell us about your energy needs..."
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" className="btn-primary w-full">
                Send Inquiry
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="section-padding  bg-black border-b border-white text-background ">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {[
              {
                icon: Phone,
                label: 'Call Us',
                value: '+92 300 123 4567',
                action: 'tel:+923001234567',
              },
              {
                icon: MessageCircle,
                label: 'WhatsApp',
                value: 'Chat with us',
                action: whatsappLink,
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'info@greenenergy.pk',
                action: 'mailto:info@greenenergy.pk',
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                variants={fadeInUp}
                href={item.action}
                target={item.action.startsWith('http') ? '_blank' : undefined}
                rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="space-y-3 hover:opacity-80 transition-opacity"
              >
                <div className="flex justify-center">
                  <item.icon size={32} />
                </div>
                <div>
                  <p className="text-sm opacity-90">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

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
