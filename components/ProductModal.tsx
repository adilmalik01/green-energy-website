'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUploader } from './image-uploader';

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

interface FormData {
  name: string;
  series: string;
  description: string;
  features: string;
  deliveryInfo: string;
  warrantyInfo: string;
}

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingItem?: Product | null;
  seriesList: Series[];
}

// ─── Animations ───────────────────────────────────────────────────────────────
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 24 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 26 },
  },
  exit: { opacity: 0, scale: 0.97, y: 24, transition: { duration: 0.2 } },
};

// ─── Component ────────────────────────────────────────────────────────────────
export function ProductModal({
  open,
  onClose,
  onSuccess,
  editingItem,
  seriesList,
}: ProductModalProps) {
  const isEditing = !!editingItem;

  const emptyForm: FormData = {
    name: '', series: '', description: '',
    features: '', deliveryInfo: '', warrantyInfo: '',
  };

  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Populate form when editing
  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        series:
          editingItem.series && typeof editingItem.series === 'object'
            ? editingItem.series._id
            : (editingItem.series as string) ?? '',
        description: editingItem.description,
        features: Array.isArray(editingItem.features)
          ? editingItem.features.join('\n')
          : '',
        deliveryInfo: editingItem.deliveryInfo ?? '',
        warrantyInfo: editingItem.warrantyInfo ?? '',
      });
      setImagePreview(editingItem.thumbnailImage ?? null);
    } else {
      setFormData(emptyForm);
      setImagePreview(null);
    }
    setImageFile(null);
    setErrors({});
  }, [editingItem, open]);

  // Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !submitting) onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, submitting, onClose]);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('series', formData.series);
      fd.append('description', formData.description);
      fd.append('deliveryInfo', formData.deliveryInfo);
      fd.append('warrantyInfo', formData.warrantyInfo);
      fd.append('slug', formData.name.toLowerCase().replace(/\s+/g, '-'));

      const features = formData.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);
      features.forEach((feature, i) => fd.append(`features[${i}]`, feature));

      if (imageFile) fd.append('image', imageFile);

      const url = isEditing ? `/api/products/${editingItem!._id}` : '/api/products';
      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, { method, body: fd });

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

  const field = <K extends keyof FormData>(key: K) => ({
    value: formData[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Submitting full-screen overlay ── */}
          <AnimatePresence>
            {submitting && (
              <motion.div
                key="submit-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-md"
              >
                <Loader2 size={42} className="animate-spin text-primary" />
                <p className="text-sm font-medium text-muted-foreground">
                  {isEditing ? 'Updating product…' : 'Creating product…'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={!submitting ? onClose : undefined}
          />

          {/* ── Modal ── */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-muted/30 shrink-0">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {isEditing
                      ? 'Update the product details below'
                      : 'Fill in the details to add a new product'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  disabled={submitting}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto flex-1 px-6 py-6">
                <form
                  id="product-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Image */}
                  <ImageUploader
                    value={imageFile}
                    preview={imagePreview}
                    onChange={(file, preview) => {
                      setImageFile(file);
                      setImagePreview(preview);
                    }}
                  />

                  {/* Name + Series */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Product Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        {...field('name')}
                        placeholder="e.g., 400W Solar Panel"
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Series</label>
                      <Select
                        value={formData.series}
                        onValueChange={(v) =>
                          setFormData((prev) => ({ ...prev, series: v }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a series" />
                        </SelectTrigger>
                        <SelectContent>
                          {seriesList.map((s) => (
                            <SelectItem key={s._id} value={s._id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Description <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      {...field('description')}
                      placeholder="Describe this product…"
                      rows={3}
                      className={`resize-none ${errors.description ? 'border-destructive' : ''}`}
                    />
                    {errors.description && (
                      <p className="text-xs text-destructive">{errors.description}</p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Features{' '}
                      <span className="text-muted-foreground font-normal text-xs">
                        (one per line)
                      </span>
                    </label>
                    <Textarea
                      {...field('features')}
                      placeholder={'High efficiency\nDurable design\n25-year warranty'}
                      rows={4}
                      className="resize-none font-mono text-sm"
                    />
                  </div>

                  {/* Delivery + Warranty */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Delivery Info
                      </label>
                      <Input
                        {...field('deliveryInfo')}
                        placeholder="3–5 business days"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Warranty Info
                      </label>
                      <Input
                        {...field('warrantyInfo')}
                        placeholder="25-year warranty"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border bg-muted/20 shrink-0 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={submitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="product-form"
                  disabled={submitting}
                  className="btn-primary flex-1"
                >
                  {isEditing ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}