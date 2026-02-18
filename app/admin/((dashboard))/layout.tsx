'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut, LayoutDashboard, Package, Layers, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router, mounted]);

  if (!mounted || status === 'loading') {
    return <LoadingSpinner size="lg" fullScreen />;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Series', href: '/admin/series', icon: Layers },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border">
        <div className="h-20 border-b border-border flex items-center px-6 gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">GE</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground">Green Energy</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-colors group"
              >
                <Icon size={20} className="group-hover:text-primary" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-4 right-4">
          <Button
            onClick={() => signOut({ redirect: true, callbackUrl: '/admin/login' })}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="h-20 border-b border-border bg-card px-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Admin Dashboard</h2>
            <p className="text-xs text-muted-foreground">Welcome back, {session?.user?.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-foreground font-medium">{session?.user?.email}</p>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
