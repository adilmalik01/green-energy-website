'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/loading-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { SeriesCard } from '@/components/seriescard';
import { SeriesModal } from '@/components/seriesmodel';
import { DeleteConfirmModal } from '@/components/deleteconfrimmodal';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Series {
  _id: string;
  name: string;
  description: string;
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
export default function SeriesManagement() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [seriesModalOpen, setSeriesModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Series | null>(null);

  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<Series | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ─── Data Fetching ──────────────────────────────────────────────────────────
  const fetchSeries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/series');
      if (response.ok) {
        const data = await response.json();
        setSeries(Array.isArray(data) ? data : []);
      } else {
        toast.error('Failed to load series');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSeries(); }, [fetchSeries]);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleOpenCreate = () => {
    setEditingItem(null);
    setSeriesModalOpen(true);
  };

  const handleOpenEdit = (item: Series) => {
    setEditingItem(item);
    setSeriesModalOpen(true);
  };

  const handleCloseSeriesModal = () => {
    setSeriesModalOpen(false);
    setEditingItem(null);
  };

  const handleSeriesSuccess = () => {
    toast.success(editingItem ? 'Series updated!' : 'Series created!');
    fetchSeries();
  };

  const handleOpenDelete = (id: string) => {
    const item = series.find((s) => s._id === id);
    if (item) {
      setDeletingItem(item);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/series/${deletingItem._id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Series deleted');
        fetchSeries();
        setDeleteModalOpen(false);
        setDeletingItem(null);
      } else {
        toast.error('Failed to delete series');
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
      {/* Toast Notifications */}
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
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        className="space-y-6"
      >
        {/* Page Header */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Series</h1>
            <p className="text-muted-foreground">Create and manage product series</p>
          </div>
          <Button onClick={handleOpenCreate} className="btn-primary gap-2">
            <Plus size={18} /> New Series
          </Button>
        </motion.div>

        {/* Stats Bar */}
        {!loading && series.length > 0 && (
          <motion.div variants={fadeInUp} className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-muted/60 rounded-full px-4 py-1.5 text-sm text-muted-foreground">
              <Layers size={14} />
              <span>
                <strong className="text-foreground">{series.length}</strong> series total
              </span>
            </div>
          </motion.div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <LoadingSpinner />
          </div>
        ) : series.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {series.map((item, index) => (
              <SeriesCard
                key={item._id}
                item={item}
                index={index}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
                deletingId={null} // Deletion handled via modal now
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            className="card-elevated p-20 rounded-2xl text-center space-y-4"
          >
            <Layers size={48} className="mx-auto opacity-20" />
            <div>
              <p className="font-medium text-foreground">No series yet</p>
              <p className="text-sm text-muted-foreground">Create your first series to get started</p>
            </div>
            <Button onClick={handleOpenCreate} className="btn-primary mx-auto">
              Create your first series
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Create / Edit Modal */}
      <SeriesModal
        open={seriesModalOpen}
        onClose={handleCloseSeriesModal}
        onSuccess={handleSeriesSuccess}
        editingItem={editingItem}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        deleting={deleting}
        itemName={deletingItem?.name}
        itemType="series"
        warningText="All associated products may be affected. This action cannot be undone."
      />
    </main>
  );
}