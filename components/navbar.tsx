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
    <nav className="fixed top-0 left-0 right-0 flex justify-center items-center z-50 px-4 pt-4">
      <div className="max-w-[1500px] mx-auto w-full">
        <div
          className={`
            w-full h-[80px] 
            rounded-full 
            bg-white
            shadow-lg
            transition-all duration-300
            flex items-center
          `}
        >
          <div className="flex items-center justify-between w-full px-8 lg:px-12">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-14 transition-all duration-300 hover:scale-105">
                <img src="/green-logo.png" alt="Logo" className="h-full" />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    px-6 py-2.5 text-sm font-semibold
                    text-black
                    rounded-full
                    transition-all duration-300
                    hover:bg-black
                    hover:text-white
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <Button
                asChild
                className="
                  bg-green-600 hover:bg-green-700
                  text-white
                  text-sm font-semibold
                  rounded-full px-8 py-6
                  transition-all duration-300
                "
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="
                lg:hidden p-3 rounded-full
                bg-gray-100
                hover:bg-gray-200
                transition-all duration-300
              "
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden border-t px-6 py-6 space-y-3 bg-white">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    block px-6 py-3 rounded-full
                    text-black font-medium
                    hover:bg-black hover:text-white
                    transition-all duration-300
                  "
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Button
                asChild
                className="
                  w-full bg-green-600 hover:bg-green-700
                  text-white rounded-full py-6 font-semibold
                "
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}