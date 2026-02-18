'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { LoadingSpinner } from '@/components/loading-spinner';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SeriesManagement() {
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/series');
      if (response.ok) {
        const data = await response.json();
        setSeries(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching series:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId ? `/api/series/${editingId}` : '/api/series';
      const method = editingId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', description: '' });
        setEditingId(null);
        setShowForm(false);
        fetchSeries();
      }
    } catch (error) {
      console.error('Error saving series:', error);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name,
      description: item.description,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this series?')) {
      try {
        await fetch(`/api/series/${id}`, { method: 'DELETE' });
        fetchSeries();
      } catch (error) {
        console.error('Error deleting series:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', description: '' });
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
            <h1 className="text-3xl font-bold text-foreground">Manage Series</h1>
            <p className="text-muted-foreground">Create and manage product series</p>
          </div>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="btn-primary gap-2"
            >
              <Plus size={18} />
              New Series
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
              {editingId ? 'Edit Series' : 'Add New Series'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Series Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Premium Solar Panels"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe this series"
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="btn-primary flex-1">
                  {editingId ? 'Update Series' : 'Create Series'}
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

        {/* Series List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : series.length > 0 ? (
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
            {series.map((item) => (
              <motion.div
                key={item._id}
                variants={fadeInUp}
                className="card-elevated p-6 rounded-lg flex items-start justify-between"
              >
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(item)}
                    size="sm"
                    className="btn-outline gap-2"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDelete(item._id)}
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
