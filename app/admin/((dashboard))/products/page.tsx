'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { LoadingSpinner } from '@/components/loading-spinner';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductsManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    series: '',
    description: '',
    features: '',
    deliveryInfo: '',
    warrantyInfo: '',
    thumbnailImage: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

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
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        series: formData.series,
        description: formData.description,
        features: formData.features.split('\n').filter((f) => f.trim()),
        deliveryInfo: formData.deliveryInfo,
        warrantyInfo: formData.warrantyInfo,
        thumbnailImage: formData.thumbnailImage,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      };

      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormData({
          name: '',
          series: '',
          description: '',
          features: '',
          deliveryInfo: '',
          warrantyInfo: '',
          thumbnailImage: '',
        });
        setEditingId(null);
        setShowForm(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name,
      series: item.series,
      description: item.description,
      features: item.features.join('\n'),
      deliveryInfo: item.deliveryInfo,
      warrantyInfo: item.warrantyInfo,
      thumbnailImage: item.thumbnailImage,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      series: '',
      description: '',
      features: '',
      deliveryInfo: '',
      warrantyInfo: '',
      thumbnailImage: '',
    });
  };

  return (
    <main className="space-y-8">
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
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Products</h1>
            <p className="text-muted-foreground">Create and manage your product catalog</p>
          </div>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="btn-primary gap-2"
            >
              <Plus size={18} />
              New Product
            </Button>
          )}
        </motion.div>

        {/* Form */}
        {showForm && (
          <motion.div
            variants={fadeInUp}
            className="card-elevated p-8 rounded-lg space-y-6"
          >
            <h2 className="text-xl font-semibold text-foreground">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Product Name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., 400W Solar Panel"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Series</label>
                  <Select
                    value={formData.series}
                    onValueChange={(value) =>
                      setFormData({ ...formData, series: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a series" />
                    </SelectTrigger>
                    <SelectContent>
                      {series.map((s) => (
                        <SelectItem key={s._id} value={s._id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Product description"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Features (one per line)
                </label>
                <Textarea
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  placeholder="High efficiency&#10;Durable design&#10;25-year warranty"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Delivery Info</label>
                  <Input
                    type="text"
                    value={formData.deliveryInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryInfo: e.target.value })
                    }
                    placeholder="3-5 business days"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Warranty Info</label>
                  <Input
                    type="text"
                    value={formData.warrantyInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, warrantyInfo: e.target.value })
                    }
                    placeholder="25-year warranty"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Thumbnail Image URL</label>
                <Input
                  type="url"
                  value={formData.thumbnailImage}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnailImage: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="btn-primary flex-1">
                  {editingId ? 'Update Product' : 'Create Product'}
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  className="btn-outline flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Products List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : products.length > 0 ? (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="space-y-4"
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={fadeInUp}
                className="card-elevated p-6 rounded-lg flex items-start justify-between"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground text-lg">{product.name}</h3>
                    <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                      {product.series}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(product)}
                    size="sm"
                    className="btn-outline gap-2"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDelete(product._id)}
                    size="sm"
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeInUp}
            className="card-elevated p-12 rounded-lg text-center space-y-4"
          >
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
