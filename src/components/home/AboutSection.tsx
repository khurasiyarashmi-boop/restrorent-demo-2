import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Heart, Award, Coffee, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const { setActivePage } = useApp();
  const [activeStoryTab, setActiveStoryTab] = useState<'roast' | 'patisserie' | 'space'>('roast');

  const storyDetails = {
    roast: {
      title: 'Obsessive 100% Arabica Micro-Lot Roasting',
      desc: 'We partner directly with high-altitude estates in Chikmagalur & Coorg. Each batch is roasted to a medium-dark caramel profile to accentuate notes of roasted macadamia, molten cocoa, and ripe wild berries.',
      stat: '9.2 Bar',
      statLabel: 'Extraction Pressure Precision'
    },
    patisserie: {
      title: 'Authentic European Pâtisserie & Ladyfingers',
      desc: 'Our mascarpone is chilled to exact cellar temperatures and whipped with cage-free cream. No shortcuts, premixes, or synthetic stabilizing gels — pure culinary devotion.',
      stat: '0 Preservatives',
      statLabel: 'Baked & Layered Fresh Daily'
    },
    space: {
      title: 'Architectural Warmth & Quiet Sanctuary',
      desc: 'Designed with warm fluted travertine stone, acoustic isolation, natural linen textures, and sun-dappled foliage to provide a serene oasis from urban hustle.',
      stat: '45+ Seats',
      statLabel: 'Indoor Lounge & Garden Patio'
    }
  };

  return (
    <section 
      id="about-section"
      className="py-28 bg-[#120B07] text-[#FAF7F2] border-b border-[#2D1B11] relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#120B07]"
    >
      {/* Mesh Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Composition (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#3D2618] h-[500px]"
            >
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
                alt="Yecha Cafe Artisanal Coffee Craft"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0805] via-transparent to-black/30" />
              
              {/* Overlay Stat Pill */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#140D09]/90 backdrop-blur-xl border border-[#D4AF37]/30 shadow-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block">
                    Salaiya, Bhopal Flagship
                  </span>
                  <p className="font-serif text-base font-semibold text-white">Mahindra Business Square</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xl font-bold text-[#D4AF37]">4.9 ★</span>
                  <span className="text-[10px] text-[#A89887] block font-mono">Google Verified</span>
                </div>
              </div>
            </motion.div>

            {/* Accent Floating Badge */}
            <div className="absolute -top-5 -right-5 w-28 h-28 rounded-full bg-[#1C120B] text-[#FAF7F2] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.3)] flex flex-col items-center justify-center text-center p-2 hidden sm:flex animate-float">
              <Sparkles className="w-4 h-4 text-[#D4AF37] mb-0.5" />
              <span className="font-serif text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">Est. 2024</span>
              <span className="font-serif text-xs font-semibold leading-tight">YECHA CAFE</span>
            </div>
          </div>

          {/* Right Column: Editorial Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C120B] text-[#D4AF37] text-xs font-mono tracking-widest uppercase border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Origins & Culinary Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-5xl font-normal text-[#FAF7F2] leading-tight">
              A Passionate Ode to Specialty Roast & Venetian Pâtisserie.
            </h2>

            <p className="text-sm sm:text-base text-[#C4B3A3] font-light leading-relaxed">
              Yecha Cafe was created in Salaiya, Bhopal with a singular ambition: to offer a sanctuary where specialty coffee is dialled with scientific rigor, authentic desserts are crafted without compromise, and every guest feels deeply cared for.
            </p>

            {/* Interactive Story Tabs */}
            <div className="flex gap-2 p-1 rounded-xl bg-[#1A110A] border border-white/10 w-fit">
              {[
                { id: 'roast', label: 'Bean Roastology' },
                { id: 'patisserie', label: 'Pastry Craft' },
                { id: 'space', label: 'Spatial Sanctuary' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveStoryTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
                    activeStoryTab === tab.id
                      ? 'bg-[#D4AF37] text-[#0D0805] font-bold shadow'
                      : 'text-[#C4B3A3] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Story Card */}
            <div className="p-6 rounded-2xl bg-[#18100A] border border-[#3D2618]">
              <h4 className="font-serif text-xl font-medium text-[#FAF7F2] mb-2">
                {storyDetails[activeStoryTab].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#A89887] font-light leading-relaxed mb-4">
                {storyDetails[activeStoryTab].desc}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#2D1B11]">
                <span className="font-mono text-lg font-bold text-[#D4AF37]">
                  {storyDetails[activeStoryTab].stat}
                </span>
                <span className="text-xs text-[#C4B3A3] font-mono">
                  {storyDetails[activeStoryTab].statLabel}
                </span>
              </div>
            </div>

            {/* Highlights Trio */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#18100A] border border-white/10 flex items-center gap-3">
                <Coffee className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <h5 className="font-serif text-xs font-semibold text-white">Arabica Lots</h5>
                  <p className="text-[10px] text-[#A89887]">Single-origin estates</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#18100A] border border-white/10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <h5 className="font-serif text-xs font-semibold text-white">Mascarpone</h5>
                  <p className="text-[10px] text-[#A89887]">Hand-whipped daily</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#18100A] border border-white/10 flex items-center gap-3">
                <Heart className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <h5 className="font-serif text-xs font-semibold text-white">Garden Patio</h5>
                  <p className="text-[10px] text-[#A89887]">Natural tranquil seating</p>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-4">
              <button
                onClick={() => setActivePage('about')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4AF37] text-[#0D0805] text-xs font-mono font-bold uppercase tracking-wider hover:brightness-110 shadow-lg transition-all"
              >
                <span>Read Full Story & Heritage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
