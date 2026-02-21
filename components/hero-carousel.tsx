'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayGradient: string;
  icon: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: 'Premium Solar Solutions',
    subtitle: 'Harness unlimited clean energy with our state-of-the-art solar panels',
    backgroundImage: '/solar.png',
    overlayGradient: 'from-black/80 via-black/60 to-black/40',
    icon: '☀️',
  },
  {
    id: 2,
    title: 'Advanced Inverters',
    subtitle: 'Convert DC to AC power with maximum efficiency and reliability',
    backgroundImage: '/inverter.png',
    overlayGradient: 'from-black/70 via-black/50 to-black/80',
    icon: '⚡',
  },
  {
    id: 3,
    title: 'Energy Independence',
    subtitle: 'Reduce electricity bills by up to 80% with our complete systems',
    backgroundImage: '/inverter-list.png',
    overlayGradient: 'from-black/90 via-black/50 to-black/70',
    icon: '🔋',
  },
  {
    id: 4,
    title: 'Expert Installation',
    subtitle: 'Professional setup with 15+ years of industry experience',
    backgroundImage: '/installation.png',
    overlayGradient: 'from-black/80 via-black/60 to-black/90',
    icon: '🛠️',
  },
];

export function HeroCarousel() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent(([prev]) => [(prev + 1) % slides.length, 1]);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const next = () => {
    setCurrent(([prev]) => [(prev + 1) % slides.length, 1]);
    setAutoplay(false);
  };

  const prev = () => {
    setCurrent(([prev]) => [(prev - 1 + slides.length) % slides.length, -1]);
    setAutoplay(false);
  };

  const goTo = (index: number) => {
    setCurrent(([prev]) => [index, index > prev ? 1 : -1]);
    setAutoplay(false);
  };

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923001234567';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(
    /[^0-9]/g,
    ''
  )}?text=Hello%20Green%20Energy%20Pakistan`;

  const variants = {
    initial: {
      opacity: 0,
      scale: 1.08,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.8,
        ease: "easeIn",
      },
    },
  };
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[current].id}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slides[current].backgroundImage})`,
            }}
          />

          {/* Black Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slides[current].overlayGradient}`}
          />

          {/* Animated Icon Background */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
            }}
            className="absolute inset-0 opacity-5 text-9xl flex items-center justify-center"
          >
            {slides[current].icon}
          </motion.div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="container-wide w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-3xl mx-auto text-center text-white space-y-6"
              >
                <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-xl">
                  {slides[current].title}
                </h1>

                <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
                  {slides[current].subtitle}
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
                >
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base h-auto shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/products">Explore Products</Link>
                  </Button>

                  <Button
                    asChild
                    className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-8 py-3 text-base h-auto backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2" size={18} />
                      Contact Us
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full backdrop-blur-sm transition-all hover:scale-110"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full backdrop-blur-sm transition-all hover:scale-110"
      >
        <ChevronRight size={26} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goTo(index)}
            className={`rounded-full transition-all duration-300 ${index === current
              ? 'bg-white w-8 h-3'
              : 'bg-white/40 hover:bg-white/60 w-3 h-3'
              }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Resume Autoplay */}
      {!autoplay && (
        <div
          onClick={() => setAutoplay(true)}
          className="absolute top-4 right-4 z-30 bg-white/20 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-all"
        >
          Resume autoplay
        </div>
      )}
    </section>
  );
}
