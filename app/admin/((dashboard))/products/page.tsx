'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/loading-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { ProductCard } from '@/components/product-card';
import { ProductModal } from '@/components/ProductModal';
import { DeleteConfirmModal } from '@/components/deleteconfrimmodal'; 
// ↑ Reuse the shared DeleteConfirmModal — adjust import path as needed in your project

// ─── Types ────────────────────────────────────────────────────────────────────
interface Series {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  thumbnailImage?: string;
  series?: { _id: string; name: string } | string;
  warrantyInfo?: string;
  deliveryInfo?: string;
  features?: string[];
}

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  // Product modal state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ─── Data ───────────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [productsRes, seriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/series'),
      ]);

      if (productsRes.ok) {
        const data = await productsRes.json();
        setProducts(data.products ?? (Array.isArray(data) ? data : []));
      }
      if (seriesRes.ok) {
        const data = await seriesRes.json();
        setSeriesList(Array.isArray(data) ? data : []);
      }
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleOpenCreate = () => {
    setEditingItem(null);
    setProductModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingItem(product);
    setProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setProductModalOpen(false);
    setEditingItem(null);
  };

  const handleProductSuccess = () => {
    toast.success(editingItem ? 'Product updated!' : 'Product created!');
    fetchData();
  };

  const handleOpenDelete = (id: string) => {
    const item = products.find((p) => p._id === id);
    if (item) {
      setDeletingItem(item);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${deletingItem._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Product deleted');
        fetchData();
        setDeleteModalOpen(false);
        setDeletingItem(null);
      } else {
        toast.error('Failed to delete product');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    if (deleting) return;
    setDeleteModalOpen(false);
    setDeletingItem(null);
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <main className="space-y-8">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: 'hsl(var(--primary))', secondary: 'white' },
          },
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Products</h1>
            <p className="text-muted-foreground">Create and manage your product catalog</p>
          </div>
          <Button onClick={handleOpenCreate} className="btn-primary gap-2">
            <Plus size={18} /> New Product
          </Button>
        </motion.div>

        {/* Stats */}
        {!loading && products.length > 0 && (
          <motion.div variants={fadeInUp} className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-muted/60 rounded-full px-4 py-1.5 text-sm text-muted-foreground">
              <Package size={14} />
              <span>
                <strong className="text-foreground">{products.length}</strong> products total
              </span>
            </div>
          </motion.div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <LoadingSpinner />
          </div>
        ) : products.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            className="card-elevated p-20 rounded-2xl text-center space-y-4"
          >
            <Package size={48} className="mx-auto opacity-20" />
            <div>
              <p className="font-medium text-foreground">No products yet</p>
              <p className="text-sm text-muted-foreground">
                Add your first product to the catalog
              </p>
            </div>
            <Button onClick={handleOpenCreate} className="btn-primary mx-auto">
              Create your first product
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Product Create / Edit Modal */}
      <ProductModal
        open={productModalOpen}
        onClose={handleCloseProductModal}
        onSuccess={handleProductSuccess}
        editingItem={editingItem}
        seriesList={seriesList}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        deleting={deleting}
        itemName={deletingItem?.name}
        itemType="product"
        warningText="This action cannot be undone."
      />
    </main>
  );
}