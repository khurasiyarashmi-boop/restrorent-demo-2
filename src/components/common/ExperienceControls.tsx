import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Volume2, VolumeX, Sparkles, CalendarDays, Utensils, QrCode, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ExperienceControls: React.FC = () => {
  const { setActivePage, setIsCartOpen, cart, activeOrderToTrack } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorIntervalRef = useRef<number | null>(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soft Ambient Jazz / Cafe Warmth Audio Synthesizer (Web Audio API)
  const toggleAmbientAudio = () => {
    if (isAudioPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
        setTimeout(() => {
          if (oscillatorIntervalRef.current) clearInterval(oscillatorIntervalRef.current);
          audioCtxRef.current?.suspend();
          setIsAudioPlaying(false);
        }, 500);
      } else {
        setIsAudioPlaying(false);
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0.001, ctx.currentTime);
        mainGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5);
        mainGain.connect(ctx.destination);
        gainNodeRef.current = mainGain;

        // Pentatonic warm chords for gentle cafe ambience
        const notes = [220.00, 277.18, 329.63, 440.00, 554.37, 659.25]; // A major warm chord
        const playTones = () => {
          if (!ctx || ctx.state === 'suspended') return;
          const note = notes[Math.floor(Math.random() * notes.length)];
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.0001, ctx.currentTime);
          noteGain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

          osc.connect(noteGain);
          noteGain.connect(mainGain);

          osc.start();
          osc.stop(ctx.currentTime + 4.6);
        };

        playTones();
        oscillatorIntervalRef.current = window.setInterval(playTones, 3200);
        setIsAudioPlaying(true);
      } catch (e) {
        console.warn('Web Audio ambience failed to initialize', e);
        setIsAudioPlaying(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div 
        id="scroll-progress-bar-container"
        className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-black/30 pointer-events-none"
      >
        <div 
          id="scroll-progress-indicator"
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F39C12] to-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Bottom Experience Pill for Quick Actions */}
      <div 
        id="floating-experience-controls"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 rounded-full bg-[#140D09]/85 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] text-[#FAF7F2]"
      >
        {/* Ambient Lounge Soundwave Button */}
        <button
          id="ambient-sound-btn"
          onClick={toggleAmbientAudio}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
            isAudioPlaying 
              ? 'bg-[#D4AF37] text-[#140D09] shadow-[0_0_15px_rgba(212,175,55,0.5)] font-semibold' 
              : 'bg-white/5 text-[#E0D3C1] hover:bg-white/10'
          }`}
          title={isAudioPlaying ? 'Mute Cafe Ambience' : 'Play Cafe Lounge Ambience'}
        >
          {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 opacity-70" />}
          <span className="hidden sm:inline">{isAudioPlaying ? 'Cafe Vibe: ON' : 'Cafe Vibe'}</span>
          {isAudioPlaying && (
            <span className="flex items-center gap-0.5 ml-0.5">
              <span className="w-0.5 h-2 bg-[#140D09] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-3.5 bg-[#140D09] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-1.5 bg-[#140D09] animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          )}
        </button>

        {/* Quick Reserve Table */}
        <button
          id="floating-reserve-btn"
          onClick={() => setActivePage('reservation')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-[#140D09] text-[11px] font-semibold uppercase tracking-wider hover:brightness-110 shadow-md active:scale-95 transition-all"
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Book Table</span>
        </button>

        {/* View Menu */}
        <button
          id="floating-menu-btn"
          onClick={() => setActivePage('menu')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-[#FAF7F2] text-[11px] font-medium tracking-wider hover:bg-white/10 active:scale-95 transition-all"
        >
          <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="hidden sm:inline">Menu</span>
        </button>

        {/* Scroll Back to Top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              id="back-to-top-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="p-1.5 rounded-full bg-white/10 text-[#FAF7F2] hover:bg-[#D4AF37] hover:text-[#140D09] transition-all"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
