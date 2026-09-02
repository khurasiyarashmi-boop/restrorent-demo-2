import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GalleryItem } from '../../types';
import { Eye, X, Sparkles, Camera, MapPin, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AmbienceGallery: React.FC = () => {
  const { gallery = [] } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const galleryItems = gallery || [];

  const filtered = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => {
        if (!item.category) return false;
        const cat = item.category.toLowerCase();
        if (activeFilter === 'interior' || activeFilter === 'ambience') return cat.includes('ambience') || cat.includes('interior');
        if (activeFilter === 'food') return cat.includes('food') || cat.includes('pasta') || cat.includes('sandwich');
        if (activeFilter === 'coffee' || activeFilter === 'drinks') return cat.includes('drink') || cat.includes('coffee') || cat.includes('matcha');
        if (activeFilter === 'desserts') return cat.includes('dessert');
        return cat === activeFilter.toLowerCase();
      });

  return (
    <section 
      id="ambience-gallery-section"
      className="py-28 bg-[#0B0604] text-[#FAF7F2] relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#0B0604]"
    >
      {/* Mesh Glow Background */}
      <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C120B] text-[#D4AF37] text-xs font-mono tracking-widest uppercase mb-4 border border-[#D4AF37]/30 shadow-lg">
              <Camera className="w-3.5 h-3.5" />
              <span>Spatial Atmosphere</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.1]">
              The Yecha Visual Canvas
            </h2>
            <p className="text-xs sm:text-sm text-[#C4B3A3] font-light mt-3 max-w-lg leading-relaxed">
              Step inside our warm oak interiors, botanical patio breeze, and meticulously styled gastronomic craft in Salaiya, Bhopal.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#140D09] border border-white/10 backdrop-blur-xl">
            {[
              { id: 'all', label: 'All Perspectives' },
              { id: 'interior', label: 'Sanctuary Interior' },
              { id: 'coffee', label: 'Coffee Alchemy' },
              { id: 'food', label: 'Gourmet Dishes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  activeFilter === tab.id
                    ? 'bg-[#D4AF37] text-[#0D0805] font-bold shadow-[0_2px_12px_rgba(212,175,55,0.4)]'
                    : 'text-[#C4B3A3] hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-Style Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo, idx) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              data-cursor="view"
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-3xl overflow-hidden bg-[#140D09] border border-[#2D1B11] hover:border-[#D4AF37]/50 cursor-pointer h-72 sm:h-80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase border border-white/10">
                  {photo.category}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
                <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
              </div>

              {/* Hover Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-serif text-lg font-medium text-white leading-tight">
                  {photo.title}
                </h4>
                {(photo.caption || photo.description) && (
                  <p className="text-xs text-[#C4B3A3] font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {photo.caption || photo.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#140D09] rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 bg-[#18100A] border-t border-[#2D1B11] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{selectedPhoto.category}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-white">{selectedPhoto.title}</h3>
                  <p className="text-xs sm:text-sm text-[#C4B3A3] mt-1 font-light max-w-xl">
                    {selectedPhoto.caption || selectedPhoto.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] shrink-0 bg-[#0D0805] px-4 py-2 rounded-xl border border-[#D4AF37]/20">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Yecha Cafe, Salaiya</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
