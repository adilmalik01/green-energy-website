'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/loading-spinner';

interface SeriesModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingItem?: { _id: string; name: string; description: string } | null;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

export function SeriesModal({ open, onClose, onSuccess, editingItem }: SeriesModalProps) {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  const isEditing = !!editingItem;

  // Populate form when editing
  useEffect(() => {
    if (editingItem) {
      setFormData({ name: editingItem.name, description: editingItem.description });
    } else {
      setFormData({ name: '', description: '' });
    }
    setErrors({});
  }, [editingItem, open]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Series name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const url = isEditing ? `/api/series/${editingItem._id}` : '/api/series';
      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const err = await response.json().catch(() => ({}));
        setErrors({ name: err.message || 'Something went wrong' });
      }
    } catch {
      setErrors({ name: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-muted/30">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {isEditing ? 'Edit Series' : 'Add New Series'}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {isEditing ? 'Update the series details below' : 'Fill in the details to create a new series'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Series Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Series Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g., Premium Solar Panels"
                    className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
                    autoFocus
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Description <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      if (errors.description) setErrors({ ...errors, description: undefined });
                    }}
                    placeholder="Describe this series…"
                    rows={4}
                    className={`resize-none ${errors.description ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                  {errors.description && (
                    <p className="text-xs text-destructive">{errors.description}</p>
                  )}
                </div>

                {/* Modal Footer / Actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex-1 gap-2"
                  >
                    {submitting ? (
                      <><LoadingSpinner /> Saving…</>
                    ) : isEditing ? (
                      'Update Series'
                    ) : (
                      'Create Series'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}