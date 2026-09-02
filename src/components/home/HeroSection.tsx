import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Star, 
  CalendarDays, 
  ShoppingBag, 
  MapPin, 
  Sparkles,
  QrCode,
  Clock,
  ChevronDown,
  Flame,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { setActivePage, siteContent, setTableNumber } = useApp();

  return (
    <section 
      id="hero-section"
      className="relative min-h-[94vh] flex items-center justify-center bg-[#0D0805] text-[#FAF7F2] overflow-hidden px-4 sm:px-6 lg:px-8 py-20 selection:bg-[#D4AF37] selection:text-[#0D0805]"
    >
      {/* Cinematic Background with Continuous Full-Frame Looping Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          id="hero-ambient-video"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-90 scale-100 pointer-events-none transition-opacity duration-700"
          poster="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000&auto=format&fit=crop"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
          <source src="https://v1.pinimg.com/videos/iht/expMp4/4c/e9/99/4ce999de0e9b72c67b79db3bfd7f91cc_720w.mp4" type="video/mp4" />
        </video>
        
        {/* Subtle Vignette & Blending Overlays for Optimal Visual Legibility */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#0D0805]/90 via-[#0D0805]/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#0D0805] via-[#0D0805]/70 to-transparent" />
      </div>

      {/* Floating Decorative Glass Accolade Badges (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hidden xl:flex absolute left-8 top-1/3 z-20 flex-col gap-3 pointer-events-auto"
      >
        <div className="p-3.5 rounded-2xl bg-[#140D09]/80 backdrop-blur-xl border border-[#D4AF37]/30 shadow-2xl max-w-[210px] hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
            </div>
            <span className="font-mono text-xs font-bold text-[#D4AF37]">4.9 / 5.0 Rating</span>
          </div>
          <p className="text-[11px] text-[#D8CCC0] font-light leading-snug">
            39+ Google verified reviews in Salaiya, Bhopal
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#140D09]/80 backdrop-blur-xl border border-white/10 shadow-2xl max-w-[210px] hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400">Open Daily</span>
          </div>
          <p className="text-[11px] text-[#D8CCC0] font-light">
            11:00 AM – 11:30 PM • Live Kitchen
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden xl:flex absolute right-8 top-1/3 z-20 flex-col gap-3 pointer-events-auto"
      >
        <div 
          onClick={() => setActivePage('menu')}
          className="p-3.5 rounded-2xl bg-[#140D09]/80 backdrop-blur-xl border border-[#D4AF37]/30 shadow-2xl max-w-[220px] hover:scale-105 transition-transform cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">House Legend</span>
            <span className="text-[10px] font-mono text-[#E5C378] font-bold">₹199</span>
          </div>
          <h4 className="font-serif text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors">Italian Tiramisu Latte</h4>
          <p className="text-[10px] text-[#A89887] mt-0.5 font-light">Espresso over mascarpone cream</p>
        </div>

        <div 
          onClick={() => {
            const simulatedTable = 'Table ' + (Math.floor(Math.random() * 8) + 1);
            if (setTableNumber) setTableNumber(simulatedTable);
            setActivePage('menu');
          }}
          className="p-3.5 rounded-2xl bg-[#140D09]/80 backdrop-blur-xl border border-white/10 shadow-2xl max-w-[220px] hover:scale-105 transition-transform cursor-pointer group"
        >
          <div className="flex items-center gap-2 mb-1">
            <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-mono font-semibold text-white group-hover:text-[#D4AF37] transition-colors">Dine-In QR Order</span>
          </div>
          <p className="text-[10px] text-[#D8CCC0] font-light">
            Order directly from your seat with instant kitchen sync
          </p>
        </div>
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Location & Rating Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#140D09]/85 border border-[#D4AF37]/40 backdrop-blur-xl text-xs tracking-wider uppercase text-[#FAF7F2] mb-6 shadow-2xl"
        >
          <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
            4.9 / 5.0
          </span>
          <span className="text-[#D4AF37]/50">•</span>
          <span className="flex items-center gap-1 text-[#FAF7F2]">
            <MapPin className="w-3 h-3 text-[#D4AF37]" />
            Salaiya, Bhopal
          </span>
          <span className="text-[#D4AF37]/50">•</span>
          <span className="text-[#D4AF37] font-medium">Mahindra Business Square</span>
        </motion.div>

        {/* Hindi Accent Title */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-sm sm:text-base text-[#D4AF37] tracking-[0.35em] uppercase mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
        >
          एच कैफे • भोपाल
        </motion.span>

        {/* Kinetic Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#FAF7F2] leading-[1.08] mb-6 max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
        >
          Not just coffee.<br />
          <span className="italic font-light text-[#F3E5D4] underline decoration-[#D4AF37]/40 decoration-wavy decoration-1 underline-offset-8">
            Not just dessert.
          </span><br />
          An experience.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-[#FAF7F2] max-w-2xl font-light leading-relaxed mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          {siteContent.heroSubtext}
        </motion.p>

        {/* Conversion-Optimized CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-order-online-btn"
            onClick={() => setActivePage('menu')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C99D2A] text-[#140D09] text-sm font-semibold tracking-wider uppercase hover:brightness-110 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_20px_rgba(212,175,55,0.4)] group cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Digital Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            id="hero-reserve-table-btn"
            onClick={() => setActivePage('reservation')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#1A120D]/90 text-[#FAF7F2] border border-[#D4AF37]/50 backdrop-blur-md text-sm font-medium tracking-wider uppercase hover:bg-[#2A1D15] hover:border-[#D4AF37] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg cursor-pointer"
          >
            <CalendarDays className="w-4 h-4 text-[#D4AF37]" />
            <span>Reserve VIP Table</span>
          </button>
        </motion.div>

        {/* House Specialties Quick Carousel / Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14 pt-8 border-t border-white/10 w-full max-w-3xl flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#D8CCC0] tracking-wider uppercase font-mono"
        >
          <span className="text-[#D4AF37] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            House Signatures:
          </span>
          <button onClick={() => setActivePage('menu')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
            Italian Tiramisu Latte
          </button>
          <span className="text-white/30">•</span>
          <button onClick={() => setActivePage('menu')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
            Pistachio Iced Matcha
          </button>
          <span className="text-white/30">•</span>
          <button onClick={() => setActivePage('menu')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
            Crunchwich Chicken
          </button>
          <span className="text-white/30">•</span>
          <button onClick={() => setActivePage('menu')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
            Nutella Brownie Shake
          </button>
        </motion.div>

      </div>

      {/* Downward Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#D4AF37] animate-bounce hidden md:block">
        <ChevronDown className="w-5 h-5 opacity-75" />
      </div>
    </section>
  );
};
