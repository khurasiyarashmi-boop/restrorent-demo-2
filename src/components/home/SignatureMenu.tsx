import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '../../types';
import { Plus, Eye, Sparkles, Flame, Star, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SignatureMenu: React.FC = () => {
  const { menuItems, setSelectedProductForModal, addToCart, setActivePage } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Filter items
  const baseItems = menuItems.filter(item => item.isSignature || item.isBestseller);
  
  const filteredItems = baseItems.filter(item => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'coffee') return item.category.toLowerCase().includes('coffee') || item.category.toLowerCase().includes('latte');
    if (selectedFilter === 'dessert') return item.category.toLowerCase().includes('dessert') || item.category.toLowerCase().includes('pastry');
    if (selectedFilter === 'food') return item.category.toLowerCase().includes('sandwich') || item.category.toLowerCase().includes('pasta') || item.category.toLowerCase().includes('crunchwich');
    if (selectedFilter === 'drinks') return item.category.toLowerCase().includes('shake') || item.category.toLowerCase().includes('mocktail') || item.category.toLowerCase().includes('tea');
    return true;
  }).slice(0, 8);

  const handleCardClick = (item: MenuItem) => {
    setSelectedProductForModal(item);
  };

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    if (item.customizations && item.customizations.length > 0) {
      setSelectedProductForModal(item);
    } else {
      addToCart(item, 1);
    }
  };

  return (
    <section 
      id="signature-menu-section"
      className="py-28 bg-[#0D0805] text-[#FAF7F2] relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#0D0805]"
    >
      {/* Mesh Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#D4AF37]/5 via-[#C86432]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C120B] text-[#D4AF37] text-xs font-mono tracking-widest uppercase mb-4 border border-[#D4AF37]/30 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Epicurean Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#FAF7F2] tracking-tight leading-[1.1]">
              Crafted with Passion.<br />
              <span className="italic font-light text-[#E5C378]">Celebrated Across Bhopal.</span>
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#140D09]/90 border border-white/10 backdrop-blur-xl">
              {[
                { id: 'all', label: 'All Signatures' },
                { id: 'coffee', label: 'Coffee Mastery' },
                { id: 'dessert', label: 'Pâtisserie' },
                { id: 'food', label: 'Bistro Food' },
                { id: 'drinks', label: 'Shakes & Coolers' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all uppercase tracking-wider ${
                    selectedFilter === tab.id
                      ? 'bg-[#D4AF37] text-[#0D0805] font-bold shadow-[0_2px_12px_rgba(212,175,55,0.4)]'
                      : 'text-[#C4B3A3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              id="view-full-menu-btn"
              onClick={() => setActivePage('menu')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1C120B] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-mono font-semibold tracking-wider uppercase hover:bg-[#D4AF37] hover:text-[#0D0805] transition-all transform hover:-translate-y-0.5 shadow-xl shrink-0"
            >
              <span>Full Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-column Luxury Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedFilter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, idx) => {
              return (
                <motion.div
                  key={item.id}
                  id={`signature-item-${item.id}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  data-cursor="view"
                  onClick={() => handleCardClick(item)}
                  className="group relative rounded-3xl bg-[#140D09]/90 border border-[#2D1B11] hover:border-[#D4AF37]/60 overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                >
                  {/* Image Container with Badges */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#0D0805]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140D09] via-transparent to-black/30" />

                    {/* Dietary Indicator */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md border text-[10px] font-bold ${
                        item.dietary === 'veg'
                          ? 'border-emerald-500 bg-emerald-950/90 text-emerald-400'
                          : 'border-red-500 bg-red-950/90 text-red-400'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${item.dietary === 'veg' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                      </span>
                    </div>

                    {/* Bestseller & Signature Badges */}
                    <div className="absolute top-3.5 right-3.5 z-10 flex flex-col items-end gap-1.5">
                      {item.isBestseller && (
                        <div className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0D0805] text-[10px] font-bold tracking-wider uppercase shadow-lg flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#0D0805]" />
                          <span>Bestseller</span>
                        </div>
                      )}
                      {item.isSignature && (
                        <div className="px-2.5 py-0.5 rounded-full bg-[#24160E]/90 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-mono font-semibold tracking-wider uppercase shadow-md">
                          Signature
                        </div>
                      )}
                    </div>

                    {/* Quick View Pill on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-[3px]">
                      <span className="px-4 py-2 rounded-full bg-[#FAF7F2] text-[#0D0805] text-xs font-semibold tracking-wider uppercase shadow-2xl flex items-center gap-1.5 transform group-hover:scale-100 scale-90 transition-transform">
                        <Eye className="w-3.5 h-3.5" />
                        Explore Dish
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {item.hindiName && (
                        <span className="text-[11px] font-serif text-[#D4AF37]/90 tracking-widest block mb-1">
                          {item.hindiName}
                        </span>
                      )}
                      <h3 className="font-serif text-lg font-medium text-[#FAF7F2] group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#A89887] line-clamp-2 mt-2 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer with Price & Quick Action */}
                    <div className="pt-4 mt-4 border-t border-[#2D1B11] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#A89887] block font-mono uppercase tracking-wider">Price</span>
                        <span className="font-mono text-lg font-bold text-[#D4AF37]">
                          ₹{item.price}
                        </span>
                      </div>

                      <button
                        id={`quick-add-${item.id}`}
                        onClick={(e) => handleQuickAdd(e, item)}
                        disabled={!item.isAvailable}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all transform active:scale-95 ${
                          item.isAvailable
                            ? 'bg-gradient-to-r from-[#D4AF37] to-[#C99D2A] text-[#0D0805] hover:brightness-110 shadow-[0_2px_10px_rgba(212,175,55,0.3)]'
                            : 'bg-[#241711] text-[#7A6759] cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{item.isAvailable ? 'Add' : 'Sold Out'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Menu Banner CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#1A110A] via-[#24160E] to-[#1A110A] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-1">
              Customizable Delights
            </span>
            <h4 className="font-serif text-2xl font-normal text-white">
              Looking for Vegan, Sugar-Free, or Oat Milk Options?
            </h4>
            <p className="text-xs text-[#C4B3A3] mt-1 font-light">
              Explore 50+ dishes with custom dairy swaps, syrups, extra espresso shots, and spice levels.
            </p>
          </div>
          <button
            onClick={() => setActivePage('menu')}
            className="px-8 py-3.5 rounded-full bg-[#FAF7F2] text-[#0D0805] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#D4AF37] transition-all transform hover:scale-105 shadow-xl shrink-0"
          >
            Open Full Menu →
          </button>
        </div>

      </div>
    </section>
  );
};
