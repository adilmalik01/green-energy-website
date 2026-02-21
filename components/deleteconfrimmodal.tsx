'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deleting: boolean;
  itemName?: string;
  itemType?: string;   // e.g. "series" | "product"
  warningText?: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

export function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  deleting,
  itemName,
  itemType = 'item',
  warningText,
}: DeleteConfirmModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !deleting) onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, deleting, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Full-screen loading overlay while deleting ── */}
          <AnimatePresence>
            {deleting && (
              <motion.div
                key="deleting-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-md"
              >
                <Loader2 size={42} className="animate-spin text-destructive" />
                <p className="text-sm font-medium text-muted-foreground">
                  Deleting {itemName ? `"${itemName}"` : itemType}…
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
            onClick={!deleting ? onClose : undefined}
          />

          {/* ── Modal ── */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle size={18} className="text-destructive" />
                  </div>
                  <h3 className="font-semibold text-foreground capitalize">
                    Delete {itemType}
                  </h3>
                </div>
                {!deleting && (
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-1.5">
                <p className="text-sm text-foreground font-medium">
                  Are you sure you want to delete{itemName ? ` "${itemName}"` : ` this ${itemType}`}?
                </p>
                <p className="text-sm text-muted-foreground">
                  {warningText ?? 'This action cannot be undone.'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 pb-6">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={deleting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onConfirm}
                  disabled={deleting}
                  className="flex-1 gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}