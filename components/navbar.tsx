'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Contact', href: '/contact' },
    { label: 'Policies', href: '/policies' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0  flex justify-center   items-center z-50  px-2 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-[1500px] mx-auto w-full ">
        <div
          className={`
             w-full h-[80px] 
            relative overflow-hidden rounded-full border border-white/20
            transition-all duration-500
            flex justify-center items-center
            ${scrolled
              ? 'bg-white/10 dark:bg-gray-950/80 backdrop-blur-2xl shadow-2xl shadow-black/10'
              : 'bg-white/10 dark:bg-gray-950/50 backdrop-blur-xl shadow-lg shadow-black/5'
            }
          `}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/5 to-primary/10 pointer-events-none opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent dark:from-white/5 pointer-events-none" />

          <div className="relative flex items-center justify-between  w-full h-24 px-8 lg:px-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 relative z-10">
              <div className="h-16 transition-all duration-300 hover:scale-110">
                <img src="/green-logo.png" alt="Logo" className="h-full drop-shadow-lg" />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-3 bg-transparent  dark:bg-black rounded-full px-3 py-2  ">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    relative px-6 py-2.5 text-sm font-semibold
                    text-black hover:text-primary
                    transition-all duration-300
                    rounded-full
                    hover:bg-white dark:hover:bg-gray-800
                    hover:shadow-lg hover:shadow-primary/20
                    hover:-translate-y-0.5
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4 relative z-10">
              <Button
                asChild
                className="
                  btn-primary text-sm font-semibold rounded-full px-8 py-6
                  shadow-xl shadow-primary/30
                  hover:shadow-2xl hover:shadow-primary/40
                  hover:scale-110 transition-all duration-300
                  border-2 border-primary/20
                "
              >
                <a href="/contact">Get Started</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="
                lg:hidden p-3 rounded-full
                bg-white/50 dark:bg-gray-800/50
                hover:bg-white dark:hover:bg-gray-800
                hover:shadow-lg
                transition-all duration-300
                relative z-10
              "
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="
              lg:hidden border-t border-white/20 
              px-8 py-6 space-y-2
              bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl
            ">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    block px-6 py-3.5 rounded-full
                    text-foreground/70 hover:text-primary
                    font-medium
                    bg-white/40 dark:bg-gray-900/40
                    hover:bg-white dark:hover:bg-gray-800
                    hover:shadow-lg hover:shadow-primary/20
                    transition-all duration-300
                    border border-white/30
                  "
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <Button
                  asChild
                  className="
                    w-full btn-primary rounded-full py-6
                    shadow-xl shadow-primary/30 font-semibold
                    border-2 border-primary/20
                  "
                >
                  <a href="/contact">Get Started</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}