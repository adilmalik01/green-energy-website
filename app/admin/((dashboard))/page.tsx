'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Package, Layers, ArrowRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const statCards = [
  {
    label: 'Total Series',
    sub: 'Product categories',
    key: 'totalSeries',
    icon: Layers,
    href: '/admin/series',
    action: 'Manage Series',
  },
  {
    label: 'Total Products',
    sub: 'Active products',
    key: 'totalProducts',
    icon: Package,
    href: '/admin/products',
    action: 'Manage Products',
  },
];

const quickActions = [
  { label: 'Add New Series', href: '/admin/series' },
  { label: 'Add New Product', href: '/admin/products' },
  { label: 'Update Settings', href: '/admin/settings' },
  { label: 'View Website', href: '/' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalSeries: 0, totalProducts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [seriesRes, productsRes] = await Promise.all([
          fetch('/api/series'),
          fetch('/api/products'),
        ]);

        if (seriesRes.ok) {
          const data = await seriesRes.json();
          setStats((prev) => ({ ...prev, totalSeries: Array.isArray(data) ? data.length : 0 }));
        }

        if (productsRes.ok) {
          const data = await productsRes.json();
          const count = data.products
            ? data.products.length
            : Array.isArray(data)
              ? data.length
              : 0;
          setStats((prev) => ({ ...prev, totalProducts: count }));
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <main>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground text-sm">
            Manage your products, series, and settings from here.
          </p>
        </motion.div>

        {/* Stat Cards */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statCards.map(({ label, sub, key, icon: Icon, href, action }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="card-elevated rounded-lg p-7 flex flex-col gap-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {label}
                  </p>
                  <p className="mt-1 text-4xl font-bold text-foreground">
                    {loading ? '—' : stats[key as keyof typeof stats]}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
                </div>
                <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="text-primary" size={22} />
                </div>
              </div>
              <Button asChild className="btn-primary w-full">
                <Link href={href}>
                  {action} <ArrowRight size={15} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeInUp} className="card-elevated rounded-lg p-7 space-y-4">
          <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickActions.map(({ label, href }) => (
              <Button asChild className="btn-primary w-full">
                <Link href={href}>
                  {label} <ArrowRight size={15} className="ml-2" />
                </Link>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={fadeInUp}
            className="card-elevated rounded-lg p-6 border-l-4 border-primary space-y-1"
          >
            <h3 className="font-semibold text-foreground text-sm">Getting Started</h3>
            <p className="text-sm text-muted-foreground">
              Start by creating a product series, then add products to that series.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="card-elevated rounded-lg p-6 border-l-4 border-secondary space-y-1"
          >
            <h3 className="font-semibold text-foreground text-sm">Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              Contact our support team for assistance with managing your catalog.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}