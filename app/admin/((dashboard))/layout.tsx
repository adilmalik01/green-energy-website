'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, LayoutDashboard, Package, Layers, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { LoadingSpinner } from '@/components/loading-spinner';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Series', href: '/admin/series', icon: Layers },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // Base styles — fixed on all screen sizes for true sticky behaviour
          'fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-card border-r border-border',
          // Mobile: slide in/out
          'transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : '-translate-x-full',
          // Desktop: always visible
          'lg:translate-x-0 lg:static lg:z-auto lg:flex'
        )}
      >
        {/* Brand */}
        <div className="flex h-20 shrink-0 items-center gap-3 border-b border-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-bold text-primary-foreground">GE</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground">Green Energy</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="ml-auto rounded-md p-1 text-muted-foreground hover:text-foreground lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation — grows to fill space */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-primary/10 hover:text-primary'
                )}
              >
                <Icon
                  size={20}
                  className={cn(isActive ? 'text-primary' : 'text-muted-foreground')}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout — always at bottom, never overlaps nav */}
        <div className="shrink-0 border-t border-border p-4">
          <Button
            onClick={() => signOut({ redirect: true, callbackUrl: '/admin/login' })}
            variant="destructive"
            className="w-full gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    // Outer wrapper: full viewport height, no overflow
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Right-hand column: header + scrollable content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar — sticky, never scrolls away */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-border bg-card px-4 sm:px-8">
          <div className="flex items-center gap-4">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Admin Dashboard</h2>
              <p className="text-xs text-muted-foreground">
                Welcome back,{' '}
                <span className="font-medium text-foreground">{session?.user?.name}</span>
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{session?.user?.email}</p>
          </div>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}