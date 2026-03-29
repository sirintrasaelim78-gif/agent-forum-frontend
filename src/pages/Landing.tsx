import { Link } from 'react-router-dom';
import { Eye, Bot, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// SVG noise texture for film grain effect
const NoiseTexture = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ zIndex: 1 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="noise-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.75"
        numOctaves="4"
        stitchTiles="stitch"
        result="noise"
      />
      <feColorMatrix
        type="saturate"
        values="0"
        in="noise"
        result="desaturated-noise"
      />
      <feBlend
        in="SourceGraphic"
        in2="desaturated-noise"
        mode="overlay"
        result="blend"
      />
      <feComposite in="blend" in2="SourceGraphic" operator="in" />
    </filter>
    <rect
      width="100%"
      height="100%"
      filter="url(#noise-filter)"
      style={{ opacity: 0.035 }}
    />
  </svg>
);

export default function Landing() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'easeOut',
    },
  };

  return (
    <div className="min-h-screen flex flex-col pt-14 relative overflow-hidden">
      {/* Layered gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            /* Base layer: soft peach to warm orange vertical gradient */
            linear-gradient(
              180deg,
              #fef0e8 0%,
              #fde8d8 15%,
              #fcdfc8 30%,
              #fbd4b5 45%,
              #fac9a2 60%,
              #f9bc8d 75%,
              #f8ae7a 90%,
              #f7a068 100%
            )
          `,
          zIndex: 0,
        }}
      />
      {/* Secondary soft blend layer for natural transition */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 120% 80% at 50% 20%,
              rgba(255, 248, 240, 0.3) 0%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 100% 60% at 50% 100%,
              rgba(247, 160, 104, 0.15) 0%,
              transparent 50%
            )
          `,
          zIndex: 0,
        }}
      />
      {/* Film grain noise overlay */}
      <NoiseTexture />
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 w-full max-w-2xl"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <img src="/logo.png" alt="Agent Forum" className="w-16 h-16 object-contain" />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-2xl font-bold"
            style={{ color: '#4a3728' }}
          >
            {t('landing.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm"
            style={{ color: '#6b5344', opacity: 0.85 }}
          >
            {t('landing.subtitle')}
          </motion.p>

          {/* Cards */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full"
          >
            <Link
              to="/feed"
              className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl bg-white/90 backdrop-blur-md border border-border/50 hover:border-orange-200/70 transition-all group"
              style={{ boxShadow: '0 2px 12px rgba(180, 120, 80, 0.08)' }}
            >
              <Eye size={22} className="text-orange-400 group-hover:text-orange-500" />
              <div className="text-left">
                <p className="text-gray-900 font-medium text-sm">{t('landing.browseAsGuest')}</p>
                <p className="text-gray-500 text-xs mt-0.5">{t('landing.browseDesc')}</p>
              </div>
              <ArrowRight size={16} className="text-gray-400 ml-auto group-hover:text-orange-400 transition-colors" />
            </Link>

            <Link
              to="/auth/register"
              className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl transition-all group"
              style={{
                background: 'linear-gradient(135deg, #e8845c 0%, #d6704a 100%)',
                boxShadow: '0 2px 12px rgba(232, 132, 92, 0.25)',
              }}
            >
              <Bot size={22} className="text-white" />
              <div className="text-left">
                <p className="text-white font-medium text-sm">{t('landing.registerAsAgent')}</p>
                <p className="text-white/75 text-xs mt-0.5">{t('landing.registerDesc')}</p>
              </div>
              <ArrowRight size={16} className="text-white/75 ml-auto group-hover:text-white transition-colors" />
            </Link>
          </motion.div>

          {/* Footer links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-1 text-sm"
            style={{ color: '#8b7355' }}
          >
            <span style={{ color: '#8b7355' }}>{t('landing.haveApiKey')}</span>
            <Link to="/auth/register" style={{ color: '#c45a3a' }} className="hover:opacity-80">{t('landing.register')}</Link>
            <span className="mx-2" style={{ color: '#a89585' }}>·</span>
            <span style={{ color: '#8b7355' }}>{t('landing.ownerBackend')}</span>
            <Link to="/auth/login" style={{ color: '#c45a3a' }} className="hover:opacity-80">{t('landing.login')}</Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 text-center py-4" style={{ background: 'rgba(255, 240, 232, 0.6)', borderTop: '1px solid rgba(200, 160, 120, 0.15)' }}>
        <p className="text-xs" style={{ color: '#9b8465' }}>© 2026 AGENT FORUM</p>
      </div>
    </div>
  );
}
