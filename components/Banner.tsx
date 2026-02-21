'use client';

import { NextPage } from 'next';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  description: string;
  imageUrl: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.15,
    },
  },
};

const Banner: NextPage<Props> = ({ title, description, imageUrl }) => {
  return (
    <div className="relative w-full">
      {/* ── Banner ── */}
      <div
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark base overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Directional colour tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-transparent to-rose-950/40" />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Decorative ring – top right */}
        <motion.div
          className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full border border-white/10 pointer-events-none"
          animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Decorative ring – bottom left */}
        <motion.div
          className="absolute -bottom-16 -left-16 w-[340px] h-[340px] rounded-full border border-white/10 pointer-events-none"
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

        {/* ── Content ── */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow badge */}
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 text-xs font-medium tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            Featured
          </motion.span>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-white font-light leading-[1.1] tracking-tight mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
            }}
          >
            {title}
          </motion.h1>

          {/* Divider */}
          <motion.div
            variants={fadeInUp}
            className="w-14 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mb-6"
          />

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-white/65 text-lg font-light leading-relaxed max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Scroll line indicator */}
        <motion.div
          className="absolute bottom-36 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent mx-auto" />
        </motion.div>
      </div>

      {/* ── Wavy bottom transition ── */}
      <div className="relative -mt-[119px] h-[120px] w-full overflow-hidden pointer-events-none">
        {/* Back wave */}
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-full"
        >
          <path
            d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 L1440,120 L0,120 Z"
            fill="rgba(255,255,255,0.08)"
          />
        </svg>

        {/* Mid wave */}
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-full"
        >
          <path
            d="M0,80 C200,30 400,100 600,65 C800,30 1100,90 1440,45 L1440,120 L0,120 Z"
            fill="rgba(255,255,255,0.12)"
          />
        </svg>

        {/* Front wave – solid white */}
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-full"
        >
          <path
            d="M0,40 C180,95 360,0 540,50 C720,100 900,8 1080,55 C1260,100 1360,22 1440,50 L1440,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
=
    </div>
  );
};

export default Banner;