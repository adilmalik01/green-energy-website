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
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSeries: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [seriesRes, productsRes] = await Promise.all([
          fetch('/api/series'),
          fetch('/api/products'),
        ]);

        if (seriesRes.ok) {
          const seriesData = await seriesRes.json();
          setStats((prev) => ({
            ...prev,
            totalSeries: Array.isArray(seriesData) ? seriesData.length : 0,
          }));
        }

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          const count = productsData.products
            ? productsData.products.length
            : Array.isArray(productsData)
            ? productsData.length
            : 0;
          setStats((prev) => ({
            ...prev,
            totalProducts: count,
          }));
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
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
        {/* Welcome Section */}
        <motion.div variants={fadeInUp} className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your products, series, and settings from here.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Series Stats */}
          <motion.div
            variants={fadeInUp}
            className="card-elevated p-8 rounded-lg space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm font-medium">Total Series</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalSeries}</p>
                <p className="text-xs text-muted-foreground">Product categories</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Layers className="text-primary" size={24} />
              </div>
            </div>
            <Button asChild className="btn-primary w-full">
              <Link href="/admin/series">
                Manage Series <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Products Stats */}
          <motion.div
            variants={fadeInUp}
            className="card-elevated p-8 rounded-lg space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalProducts}</p>
                <p className="text-xs text-muted-foreground">Active products</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="text-primary" size={24} />
              </div>
            </div>
            <Button asChild className="btn-primary w-full">
              <Link href="/admin/products">
                Manage Products <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={fadeInUp}
          className="card-elevated p-8 rounded-lg space-y-4"
        >
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild className="btn-outline">
              <Link href="/admin/series">Add New Series</Link>
            </Button>
            <Button asChild className="btn-outline">
              <Link href="/admin/products">Add New Product</Link>
            </Button>
            <Button asChild className="btn-outline">
              <Link href="/admin/settings">Update Settings</Link>
            </Button>
            <Button asChild className="btn-outline">
              <Link href="/">View Website</Link>
            </Button>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            variants={fadeInUp}
            className="card-elevated p-6 rounded-lg space-y-2 border-l-4 border-primary"
          >
            <h3 className="font-semibold text-foreground">Getting Started</h3>
            <p className="text-sm text-muted-foreground">
              Start by creating a product series, then add products to that series.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="card-elevated p-6 rounded-lg space-y-2 border-l-4 border-secondary"
          >
            <h3 className="font-semibold text-foreground">Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              Contact our support team for assistance with managing your catalog.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
