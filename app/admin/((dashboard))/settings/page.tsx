'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';

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

export default function AdminSettings() {
  const { data: session } = useSession();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setMessage('Password must be at least 8 characters');
      return;
    }

    // In a real app, you'd send this to an API endpoint
    setMessage('Password change functionality would be implemented here');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <main>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-8 max-w-2xl"
      >
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </motion.div>

        {/* Account Info */}
        <motion.div
          variants={fadeInUp}
          className="card-elevated p-8 rounded-lg space-y-6"
        >
          <h2 className="text-xl font-semibold text-foreground">Account Information</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="mt-2 p-3 bg-muted rounded-lg text-foreground">
                {session?.user?.email}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Name</label>
              <div className="mt-2 p-3 bg-muted rounded-lg text-foreground">
                {session?.user?.name || 'Admin'}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Your account information is managed by the system administrator.
            </p>
          </div>
        </motion.div>

        {/* Change Password */}
        <motion.div
          variants={fadeInUp}
          className="card-elevated p-8 rounded-lg space-y-6"
        >
          <h2 className="text-xl font-semibold text-foreground">Change Password</h2>

          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Current Password
              </label>
              <Input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                placeholder="Enter your current password"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                New Password
              </label>
              <Input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                placeholder="Enter a new password (min 8 characters)"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <Input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm your new password"
                required
              />
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-primary/10 text-primary rounded-lg text-sm"
              >
                {message}
              </motion.div>
            )}

            <Button type="submit" className="btn-primary w-full">
              Update Password
            </Button>
          </form>
        </motion.div>

        {/* Help & Support */}
        <motion.div
          variants={fadeInUp}
          className="card-elevated p-8 rounded-lg space-y-6"
        >
          <h2 className="text-xl font-semibold text-foreground">Help & Support</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Documentation</h3>
              <p className="text-sm text-muted-foreground">
                For help with managing your products and series, please contact support.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-foreground">System Status</h3>
              <p className="text-sm text-muted-foreground">
                All systems are operational. Last update: Today
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-foreground">API Documentation</h3>
              <p className="text-sm text-muted-foreground">
                REST API endpoints are available for programmatic access to your data.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Data & Privacy */}
        <motion.div
          variants={fadeInUp}
          className="card-elevated p-8 rounded-lg space-y-6"
        >
          <h2 className="text-xl font-semibold text-foreground">Data & Privacy</h2>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              All your data is encrypted and securely stored. We follow best practices for data protection and privacy.
            </p>

            <div className="flex gap-4">
              <Button className="btn-outline text-sm">
                Download My Data
              </Button>
              <Button className="btn-outline text-sm">
                Privacy Policy
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
