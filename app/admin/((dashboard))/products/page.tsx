'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit2, Plus, Upload, X, ImageIcon, Package } from 'lucide-react';
import { LoadingSpinner } from '@/components/loading-spinner';
import toast, { Toaster } from 'react-hot-toast';

// ─── Animation Variants ──────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

// ─── Image Upload Component ───────────────────────────────────────────────────
function ImageUploader({
  value,
  preview,
  onChange,
}: {
  value: File | null;
  preview: string | null;
  onChange: (file: File | null, preview: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    onChange(file, url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Product Image</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative group cursor-pointer border-2 border-dashed border-border hover:border-primary/60 rounded-xl transition-colors duration-200 overflow-hidden"
        style={{ minHeight: 160 }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
              <p className="text-white text-sm font-medium flex items-center gap-2">
                <Upload size={16} /> Change image
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null, null); }}
              className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 gap-2 text-muted-foreground">
            <ImageIcon size={32} className="opacity-40" />
            <p className="text-sm">Drop an image or <span className="text-primary font-medium">click to upload</span></p>
            <p className="text-xs opacity-60">PNG, JPG, WEBP up to 10MB</p>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onEdit,
  onDelete,
  deletingId,
}: {
  product: any;
  onEdit: (p: any) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}) {
  const isDeleting = deletingId === product._id;

  return (
    <motion.div
      variants={fadeInUp}
      layout
      className="card-elevated rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {product.thumbnailImage ? (
          <img
            src={product.thumbnailImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Package size={48} className="opacity-20" />
          </div>
        )}
        {/* Series badge */}
        {product.series && (
          <span className="absolute top-3 left-3 bg-primary/90 backdrop-blur text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            {typeof product.series === 'object' ? product.series.name : product.series}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-semibold text-foreground text-lg leading-tight">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{product.description}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 text-xs">
          {product.warrantyInfo && (
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
              {product.warrantyInfo}
            </span>
          )}
          {product.deliveryInfo && (
            <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
              {product.deliveryInfo}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            onClick={() => onEdit(product)}
            size="sm"
            variant="outline"
            className="flex-1 gap-2"
          >
            <Edit2 size={14} /> Edit
          </Button>
          <Button
            onClick={() => onDelete(product._id)}
            size="sm"
            disabled={isDeleting}
            className="flex-1 gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {isDeleting ? (
              <span className="flex items-center gap-2"><span style={{ width: 16, height: 16, display: 'inline-flex' }}><LoadingSpinner /></span> Deleting…</span>
            ) : (
              <><Trash2 size={14} /> Delete</>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProductsManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    series: '',
    description: '',
    features: '',
    deliveryInfo: '',
    warrantyInfo: '',
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, seriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/series'),
      ]);
      if (productsRes.ok) {
        const data = await productsRes.json();
        setProducts(data.products || (Array.isArray(data) ? data : []));
      }
      if (seriesRes.ok) {
        const data = await seriesRes.json();
        setSeries(Array.isArray(data) ? data : []);
      }
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', series: '', description: '', features: '', deliveryInfo: '', warrantyInfo: '' });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
  }; const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const fd = new FormData();

      fd.append("name", formData.name);
      fd.append("series", formData.series);
      fd.append("description", formData.description);
      fd.append("deliveryInfo", formData.deliveryInfo);
      fd.append("warrantyInfo", formData.warrantyInfo);
      fd.append(
        "slug",
        formData.name.toLowerCase().replace(/\s+/g, "-")
      );

      // Convert features textarea into array
      const features = formData.features
        .split("\n")
        .filter((f) => f.trim());

      features.forEach((feature, index) => {
        fd.append(`features[${index}]`, feature);
      });

      // Append image file if exists
      if (imageFile) {
        fd.append("image", imageFile);
      }

      const url = editingId
        ? `/api/products/${editingId}`
        : "/api/products";

      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        body: fd, // ❌ DO NOT set headers manually
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error("Request failed");
      }

      const data = await response.json();

      toast.success(editingId ? "Product updated!" : "Product created!");
      resetForm();
      fetchData();

    } catch (error) {
      console.error("Client error:", error);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name,
      series: typeof item.series === 'object' ? item.series._id : item.series,
      description: item.description,
      features: Array.isArray(item.features) ? item.features.join('\n') : '',
      deliveryInfo: item.deliveryInfo || '',
      warrantyInfo: item.warrantyInfo || '',
    });
    setImagePreview(item.thumbnailImage || null);
    setImageFile(null);
    setEditingId(item._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-sm">Delete this product?</p>
        <p className="text-xs text-muted-foreground">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              setDeletingId(id);
              try {
                const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
                if (res.ok) {
                  toast.success('Product deleted');
                  fetchData();
                } else {
                  toast.error('Failed to delete product');
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
    ), { duration: 10000 });
  };

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
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Products</h1>
            <p className="text-muted-foreground">Create and manage your product catalog</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="btn-primary gap-2">
              <Plus size={18} /> New Product
            </Button>
          )}
        </motion.div>

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
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={resetForm} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Uploader */}
                <ImageUploader
                  value={imageFile}
                  preview={imagePreview}
                  onChange={(file, preview) => { setImageFile(file); setImagePreview(preview); }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Product Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., 400W Solar Panel"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Series</label>
                    <Select
                      value={formData.series}
                      onValueChange={(value) => setFormData({ ...formData, series: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a series" />
                      </SelectTrigger>
                      <SelectContent>
                        {series.map((s) => (
                          <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Product description"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Features <span className="text-muted-foreground font-normal">(one per line)</span></label>
                  <Textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder={'High efficiency\nDurable design\n25-year warranty'}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Delivery Info</label>
                    <Input
                      value={formData.deliveryInfo}
                      onChange={(e) => setFormData({ ...formData, deliveryInfo: e.target.value })}
                      placeholder="3-5 business days"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Warranty Info</label>
                    <Input
                      value={formData.warrantyInfo}
                      onChange={(e) => setFormData({ ...formData, warrantyInfo: e.target.value })}
                      placeholder="25-year warranty"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button type="submit" disabled={submitting} className="btn-primary flex-1 gap-2">
                    {submitting ? <><LoadingSpinner /> Saving…</> : editingId ? 'Update Product' : 'Create Product'}
                  </Button>
                  <Button type="button" onClick={resetForm} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
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
            <Package size={48} className="mx-auto opacity-20" />
            <p className="text-muted-foreground">No products yet</p>
            <Button onClick={() => setShowForm(true)} className="btn-primary mx-auto">
              Create your first product
            </Button>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}