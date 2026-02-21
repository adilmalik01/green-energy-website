'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Edit2, Plus, X, Layers } from 'lucide-react';
import { LoadingSpinner } from '@/components/loading-spinner';
import toast, { Toaster } from 'react-hot-toast';

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

// ─── Series Card ──────────────────────────────────────────────────────────────
function SeriesCard({
  item,
  index,
  onEdit,
  onDelete,
  deletingId,
}: {
  item: any;
  index: number;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}) {
  const isDeleting = deletingId === item._id;

  // A set of subtle accent colors cycling through cards
  const accents = [
    'from-blue-500/10 to-cyan-500/5 border-blue-500/20',
    'from-violet-500/10 to-purple-500/5 border-violet-500/20',
    'from-emerald-500/10 to-teal-500/5 border-emerald-500/20',
    'from-orange-500/10 to-amber-500/5 border-orange-500/20',
    'from-rose-500/10 to-pink-500/5 border-rose-500/20',
    'from-sky-500/10 to-indigo-500/5 border-sky-500/20',
  ];
  const accent = accents[index % accents.length];

  const dotColors = [
    'bg-blue-500', 'bg-violet-500', 'bg-emerald-500',
    'bg-orange-500', 'bg-rose-500', 'bg-sky-500',
  ];
  const dot = dotColors[index % dotColors.length];

  return (
    <motion.div
      variants={fadeInUp}
      layout
      className={`relative rounded-2xl border bg-gradient-to-br ${accent} p-6 flex flex-col gap-4 transition-shadow duration-200 hover:shadow-lg`}
    >
      {/* Index badge */}
      <span className={`absolute top-4 right-4 w-7 h-7 rounded-full ${dot} flex items-center justify-center text-white text-xs font-bold`}>
        {index + 1}
      </span>

      {/* Content */}
      <div className="space-y-2 pr-8">
        <h3 className="font-bold text-foreground text-lg leading-tight">{item.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <span className="text-xs text-muted-foreground">
          {item.products?.length ?? 0} product{item.products?.length !== 1 ? 's' : ''}
        </span>
        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(item)}
            size="sm"
            variant="outline"
            className="gap-1.5 h-8 text-xs"
          >
            <Edit2 size={13} /> Edit
          </Button>
          <Button
            onClick={() => onDelete(item._id)}
            size="sm"
            disabled={isDeleting}
            className="gap-1.5 h-8 text-xs bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {isDeleting ? (
              <span className="flex items-center gap-1.5">
                <LoadingSpinner /> Deleting…
              </span>
            ) : (
              <><Trash2 size={13} /> Delete</>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SeriesManagement() {
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => { fetchSeries(); }, []);

  const fetchSeries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/series');
      if (response.ok) {
        const data = await response.json();
        setSeries(Array.isArray(data) ? data : []);
      }
    } catch {
      toast.error('Failed to load series');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingId ? `/api/series/${editingId}` : '/api/series';
      const method = editingId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingId ? 'Series updated!' : 'Series created!');
        resetForm();
        fetchSeries();
      } else {
        const err = await response.json().catch(() => ({}));
        toast.error(err.message || 'Something went wrong');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({ name: item.name, description: item.description });
    setEditingId(item._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-sm">Delete this series?</p>
          <p className="text-xs text-muted-foreground">
            All associated products may be affected.
          </p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setDeletingId(id);
                try {
                  const res = await fetch(`/api/series/${id}`, { method: 'DELETE' });
                  if (res.ok) {
                    toast.success('Series deleted');
                    fetchSeries();
                  } else {
                    toast.error('Failed to delete series');
                  }
                } catch {
                  toast.error('Network error');
                } finally {
                  setDeletingId(null);
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-destructive text-white text-xs font-medium hover:bg-destructive/90 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  return (
    <main className="space-y-8">
      {/* Toaster */}
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
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Series</h1>
            <p className="text-muted-foreground">Create and manage product series</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="btn-primary gap-2">
              <Plus size={18} /> New Series
            </Button>
          )}
        </motion.div>

        {/* Stats bar */}
        {!loading && series.length > 0 && (
          <motion.div variants={fadeInUp} className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-muted/60 rounded-full px-4 py-1.5 text-sm text-muted-foreground">
              <Layers size={14} />
              <span><strong className="text-foreground">{series.length}</strong> series total</span>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              key="form"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="card-elevated p-8 rounded-2xl space-y-6 border border-border/50"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  {editingId ? 'Edit Series' : 'Add New Series'}
                </h2>
                <button onClick={resetForm} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Series Name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Premium Solar Panels"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe this series…"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-4 pt-1">
                  <Button type="submit" disabled={submitting} className="btn-primary flex-1 gap-2">
                    {submitting
                      ? <><LoadingSpinner /> Saving…</>
                      : editingId ? 'Update Series' : 'Create Series'}
                  </Button>
                  <Button type="button" onClick={resetForm} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Series Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
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
                onEdit={handleEdit}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            className="card-elevated p-16 rounded-2xl text-center space-y-4"
          >
            <Layers size={48} className="mx-auto opacity-20" />
            <p className="text-muted-foreground">No series yet</p>
            <Button onClick={() => setShowForm(true)} className="btn-primary mx-auto">
              Create your first series
            </Button>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}