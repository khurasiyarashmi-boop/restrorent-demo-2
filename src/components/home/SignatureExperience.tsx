import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Coffee, Utensils, Compass, ArrowUpRight, Flame, Droplets, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const SignatureExperience: React.FC = () => {
  const { setActivePage } = useApp();
  const [activeSensoryPill, setActiveSensoryPill] = useState<string>('espresso');

  return (
    <section 
      id="signature-experience-section"
      className="py-28 bg-[#120B07] text-[#FAF7F2] border-b border-[#2D1B11] relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#120B07]"
    >
      {/* Subtle Mesh Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#C86432]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24160E] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Yecha Philosophy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#FAF7F2] leading-[1.1]">
              Coffee. Pâtisserie. Food.<br />
              <span className="italic font-light text-[#E5C378]">Atmospheric Harmony.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#C4B3A3] font-light leading-relaxed mb-4">
              Yecha Cafe is engineered as a sensory retreat where specialty extraction, authentic Italian confectionery, and tactile serenity align in Bhopal.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">Explore Pillars:</span>
              <div className="flex gap-1.5">
                {[
                  { id: 'espresso', label: 'Espresso' },
                  { id: 'patisserie', label: 'Pâtisserie' },
                  { id: 'bistro', label: 'Bistro' }
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setActiveSensoryPill(pill.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
                      activeSensoryPill === pill.id
                        ? 'bg-[#D4AF37] text-[#120B07] font-bold'
                        : 'bg-white/5 text-[#A89887] hover:bg-white/10'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Asymmetric Luxury Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Precision Espresso (Large 7-Col Feature) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-12 lg:col-span-7 rounded-3xl bg-[#1B110A]/90 border border-[#3D2618] hover:border-[#D4AF37]/50 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 shadow-2xl"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop"
                alt="Precision Espresso Extraction"
                className="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B110A] via-[#1B110A]/80 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <Coffee className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37]">
                  01 / ROASTOLOGY
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FAF7F2] mb-3 group-hover:text-[#D4AF37] transition-colors">
                Micro-Gram Calibrated Espresso
              </h3>
              <p className="text-sm text-[#C4B3A3] font-light leading-relaxed max-w-lg mb-6">
                Single-origin 100% Arabica roasted in artisanal small batches. Every double shot is dialed in at 9 bars of pressure to extract complex tasting notes of dark cocoa, toasted hazelnut, and wild honey.
              </p>

              {/* Flavor Profile Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-[#E5C378]">
                  • Notes: Dark Cocoa & Cherry
                </span>
                <span className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-[#E5C378]">
                  • 100% Specialty Arabica
                </span>
                <span className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-[#E5C378]">
                  • House Tiramisu Infusion
                </span>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-[#3D2618] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#A89887]">
                <Droplets className="w-4 h-4 text-[#D4AF37]" />
                <span>Extracted fresh per order</span>
              </div>
              <button
                onClick={() => setActivePage('menu')}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors"
              >
                <span>View Coffee Collection</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Bento Card 2: Authentic Venetian Pâtisserie (5-Col Feature) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-12 lg:col-span-5 rounded-3xl bg-[#1B110A]/90 border border-[#3D2618] hover:border-[#D4AF37]/50 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 shadow-2xl"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop"
                alt="Venetian Tiramisu Pâtisserie"
                className="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B110A] via-[#1B110A]/85 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37]">
                  02 / PÂTISSERIE
                </span>
              </div>

              <h3 className="font-serif text-2xl font-medium text-[#FAF7F2] mb-3 group-hover:text-[#D4AF37] transition-colors">
                Authentic Venetian Tiramisu
              </h3>
              <p className="text-sm text-[#C4B3A3] font-light leading-relaxed mb-6">
                Freshly whipped Italian mascarpone, house-baked Savoiardi ladyfingers soaked in espresso, and dusted with premier Valrhona cocoa.
              </p>

              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 mb-4">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-[#D4AF37]">Daily Small-Batch Craft</span>
                  <span className="text-emerald-400 font-semibold">Zero Preservatives</span>
                </div>
                <p className="text-[11px] text-[#A89887]">Layered fresh every morning in Salaiya.</p>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-[#3D2618] flex items-center justify-between">
              <span className="text-xs text-[#A89887]">Chef's Special pot</span>
              <button
                onClick={() => setActivePage('menu')}
                className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors"
              >
                <span>Order Dessert</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Bento Card 3: Gourmet Gastronomy & Crunchwiches (5-Col Feature) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-12 lg:col-span-5 rounded-3xl bg-[#1B110A]/90 border border-[#3D2618] hover:border-[#D4AF37]/50 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 shadow-2xl"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop"
                alt="Crunchwich Sourdough Toasties"
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B110A] via-[#1B110A]/85 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <Utensils className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37]">
                  03 / GOURMET
                </span>
              </div>

              <h3 className="font-serif text-2xl font-medium text-[#FAF7F2] mb-3 group-hover:text-[#D4AF37] transition-colors">
                Artisanal Crunchwiches & Pastas
              </h3>
              <p className="text-sm text-[#C4B3A3] font-light leading-relaxed mb-6">
                Golden pressed artisan sourdough with slow-roasted spiced chicken, charred peppers, molten cheeses, and signature house-made peri-peri infusions.
              </p>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-center">
                  <span className="text-xs font-bold text-white block">Handmade</span>
                  <span className="text-[10px] text-[#A89887]">Pastas & Sauces</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-center">
                  <span className="text-xs font-bold text-white block">Crisp Press</span>
                  <span className="text-[10px] text-[#A89887]">Sourdough Sandwiches</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-[#3D2618] flex items-center justify-between mt-4">
              <span className="text-xs text-[#A89887]">Freshly Grilled</span>
              <button
                onClick={() => setActivePage('menu')}
                className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors"
              >
                <span>Bistro Menu</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Bento Card 4: Spatial Sanctuary (7-Col Feature) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="md:col-span-12 lg:col-span-7 rounded-3xl bg-[#1B110A]/90 border border-[#3D2618] hover:border-[#D4AF37]/50 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 shadow-2xl"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
                alt="Cafe Spatial Sanctuary in Bhopal"
                className="w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B110A] via-[#1B110A]/85 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37]">
                  04 / SANCTUARY
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FAF7F2] mb-3 group-hover:text-[#D4AF37] transition-colors">
                Mahindra Business Square, Salaiya
              </h3>
              <p className="text-sm text-[#C4B3A3] font-light leading-relaxed max-w-lg mb-6">
                Thoughtfully sculpted with warm fluted travertine, ambient acoustic tones, dedicated power outlets for digital nomads, and open garden patio seating.
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">Seating</span>
                  <span className="text-sm font-semibold text-white">Indoor & Patio</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">WiFi Speed</span>
                  <span className="text-sm font-semibold text-white">High-Speed Fiber</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">Parking</span>
                  <span className="text-sm font-semibold text-white">Ample Valet</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-[#3D2618] flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-[#A89887]">Live table reservations open</span>
              </div>
              <button
                onClick={() => setActivePage('reservation')}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors"
              >
                <span>Reserve a Table</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
