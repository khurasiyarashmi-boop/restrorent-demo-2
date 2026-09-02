import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '../../types';
import { 
  Search, 
  Filter, 
  Star, 
  Flame, 
  Sparkles, 
  Plus, 
  Grid, 
  List, 
  SlidersHorizontal,
  X,
  Tag,
  Clock,
  ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DigitalMenu: React.FC = () => {
  const { 
    menuItems, 
    categories, 
    setSelectedProductForModal, 
    addToCart, 
    offers, 
    applyCoupon,
    tableNumber
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'prep-time'>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter & Sort Pipeline
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && item.dietary !== 'veg') return false;
      if (dietaryFilter === 'non-veg' && item.dietary !== 'non-veg') return false;

      // Special tags
      if (onlyBestsellers && !item.isBestseller) return false;
      if (onlySpicy && !item.isSpicy) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesHindi = item.hindiName?.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesIngredients = item.ingredients?.some(i => i.toLowerCase().includes(q));
        if (!matchesName && !matchesHindi && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'prep-time') return a.preparationTimeMinutes - b.preparationTimeMinutes;
      // Recommended: signatures & bestsellers first
      if (a.isSignature && !b.isSignature) return -1;
      if (!a.isSignature && b.isSignature) return 1;
      if (a.isBestseller && !b.isBestseller) return -1;
      if (!a.isBestseller && b.isBestseller) return 1;
      return 0;
    });
  }, [menuItems, selectedCategory, dietaryFilter, onlyBestsellers, onlySpicy, searchQuery, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    if (item.customizations && item.customizations.length > 0) {
      setSelectedProductForModal(item);
    } else {
      addToCart(item, 1);
    }
  };

  return (
    <div id="digital-menu-view" className="min-h-screen bg-[#FAF7F2] text-[#241A15] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono tracking-[0.25em] text-[#8C6D58] uppercase block mb-2">
            Yecha Artisanal Selections
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#241A15] tracking-tight">
            Digital Dining Menu
          </h1>
          <p className="text-xs sm:text-sm text-[#735E4E] font-light mt-3">
            {tableNumber 
              ? `Currently ordering for ${tableNumber}. Add items directly to your table bill.` 
              : 'Hand-pulled espresso, freshly baked viennoiserie, and contemporary plates in Salaiya, Bhopal.'}
          </p>
        </div>

        {/* Promotional Offers Banner */}
        {offers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {offers.map((offer) => (
              <div 
                key={offer.id} 
                className="rounded-2xl p-4 bg-[#241711] text-[#FAF7F2] border border-[#433024] flex items-center justify-between gap-4 shadow-md relative overflow-hidden"
              >
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">
                    {offer.badge}
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-white">{offer.title}</h4>
                  <p className="text-[11px] text-[#C4B099] line-clamp-1 mt-0.5">{offer.tagline}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#1A120D] text-xs font-bold font-mono">
                    {offer.discountText}
                  </span>
                  {offer.code && (
                    <button 
                      onClick={() => applyCoupon(offer.code!)}
                      className="block text-[10px] text-[#C4B099] hover:text-white underline mt-1 font-mono uppercase"
                    >
                      Use {offer.code}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search & Filter Controls Bar */}
        <div className="bg-[#F3ECE1] p-4 sm:p-6 rounded-3xl border border-[#E0D3C1] mb-8 space-y-4 shadow-sm">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C6D58] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, tiramisu, crunchwich, matcha, pasta..."
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-[#FAF7F2] border border-[#D5C6B5] text-xs sm:text-sm text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#4A3222] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C6D58] hover:text-[#241A15]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown & View Mode */}
            <div className="flex items-center gap-3 justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8C6D58]" />
                <select
                  id="menu-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] py-2 px-3 rounded-xl focus:outline-none focus:border-[#4A3222] font-medium"
                >
                  <option value="recommended">Featured / Signatures</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="prep-time">Quickest Prep Time</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center bg-[#FAF7F2] p-1 rounded-xl border border-[#D5C6B5]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-[#241A15] text-[#FAF7F2]' : 'text-[#8C6D58] hover:text-[#241A15]'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-[#241A15] text-[#FAF7F2]' : 'text-[#8C6D58] hover:text-[#241A15]'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E0D3C1]/60">
            <span className="text-xs font-mono text-[#8C6D58] uppercase mr-1">Filter:</span>
            
            {/* Dietary Buttons */}
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                dietaryFilter === 'all'
                  ? 'bg-[#241A15] text-[#FAF7F2]'
                  : 'bg-[#FAF7F2] text-[#5E4C3E] border border-[#D5C6B5] hover:bg-[#EAE1D5]'
              }`}
            >
              All Diet
            </button>
            <button
              onClick={() => setDietaryFilter(dietaryFilter === 'veg' ? 'all' : 'veg')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#FAF7F2] text-emerald-800 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Veg Only
            </button>
            <button
              onClick={() => setDietaryFilter(dietaryFilter === 'non-veg' ? 'all' : 'non-veg')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                dietaryFilter === 'non-veg'
                  ? 'bg-red-800 text-white'
                  : 'bg-[#FAF7F2] text-red-800 border border-red-300 hover:bg-red-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Non-Veg
            </button>

            {/* Bestseller Filter */}
            <button
              onClick={() => setOnlyBestsellers(!onlyBestsellers)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                onlyBestsellers
                  ? 'bg-[#D4AF37] text-[#1A120D] font-semibold'
                  : 'bg-[#FAF7F2] text-[#695446] border border-[#D5C6B5] hover:bg-[#EAE1D5]'
              }`}
            >
              <Star className="w-3 h-3" />
              Bestsellers
            </button>

            {/* Spicy Filter */}
            <button
              onClick={() => setOnlySpicy(!onlySpicy)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                onlySpicy
                  ? 'bg-[#B23B2B] text-white'
                  : 'bg-[#FAF7F2] text-[#695446] border border-[#D5C6B5] hover:bg-[#EAE1D5]'
              }`}
            >
              <Flame className="w-3 h-3" />
              Spicy
            </button>

            {(dietaryFilter !== 'all' || onlyBestsellers || onlySpicy || searchQuery) && (
              <button
                onClick={() => {
                  setDietaryFilter('all');
                  setOnlyBestsellers(false);
                  setOnlySpicy(false);
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs text-[#8C6D58] hover:text-[#241A15] underline ml-auto font-mono"
              >
                Reset Filters
              </button>
            )}
          </div>

        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#241A15] text-[#FAF7F2] shadow-md'
                : 'bg-[#F3ECE1] text-[#5E4C3E] border border-[#E0D3C1] hover:bg-[#EAE1D5]'
            }`}
          >
            All Items ({menuItems.length})
          </button>
          {categories.map((cat) => {
            const count = menuItems.filter(m => m.category === cat.slug).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                id={`cat-tab-${cat.slug}`}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#241A15] text-[#FAF7F2] shadow-md'
                    : 'bg-[#F3ECE1] text-[#5E4C3E] border border-[#E0D3C1] hover:bg-[#EAE1D5]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-[#D4AF37] text-[#1A120D]' : 'bg-[#E0D3C1] text-[#735E4E]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Count & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-[#8C6D58] font-mono uppercase mb-6 px-1">
          <span>Showing {filteredItems.length} curated dishes & beverages</span>
          {selectedCategory !== 'all' && (
            <span>Category: {categories.find(c => c.slug === selectedCategory)?.name}</span>
          )}
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-[#F3ECE1] rounded-3xl border border-[#E0D3C1] p-8">
            <div className="w-16 h-16 rounded-full bg-[#E4D5C2] text-[#8C6D58] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl text-[#241A15] font-medium mb-2">No matching dishes found</h3>
            <p className="text-xs text-[#735E4E] max-w-md mx-auto mb-6">
              We couldn't find any items matching your selected filters or search query. Try resetting filters or exploring our artisanal coffee categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                setSelectedCategory('all');
                setOnlyBestsellers(false);
                setOnlySpicy(false);
              }}
              className="px-6 py-2.5 rounded-full bg-[#241A15] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase"
            >
              View Full Menu
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedProductForModal(item)}
                className="group rounded-2xl bg-[#FAF7F2] border border-[#E0D3C1] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:border-[#8C6D58] cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 w-full bg-[#1A120D] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Dietary badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md border text-[10px] font-bold ${
                      item.dietary === 'veg'
                        ? 'border-emerald-600 bg-white text-emerald-700'
                        : 'border-red-600 bg-white text-red-700'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-red-600'}`} />
                    </span>
                  </div>

                  {/* Right Tags */}
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                    {item.isBestseller && (
                      <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#1A120D] text-[10px] font-bold tracking-wider uppercase shadow">
                        Bestseller
                      </span>
                    )}
                    {item.isSignature && (
                      <span className="px-2 py-0.5 rounded-full bg-[#241A15] text-[#FAF7F2] text-[10px] font-bold tracking-wider uppercase border border-[#D4AF37]/40 shadow">
                        Signature
                      </span>
                    )}
                  </div>

                  {/* Preparation time badge */}
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] text-white/90 font-mono drop-shadow">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>{item.preparationTimeMinutes}m</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {item.hindiName && (
                      <span className="text-[11px] font-serif text-[#8C6D58] block mb-1">
                        {item.hindiName}
                      </span>
                    )}
                    <h3 className="font-serif text-lg font-medium text-[#241A15] group-hover:text-[#8C6D58] transition-colors leading-snug line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6B5646] line-clamp-2 mt-1.5 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 mt-4 border-t border-[#EAE1D5] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#8C6D58] block">Price</span>
                      <span className="font-mono text-base font-bold text-[#241A15]">
                        ₹{item.price}
                      </span>
                    </div>

                    <button
                      id={`menu-add-${item.id}`}
                      onClick={(e) => handleQuickAdd(e, item)}
                      disabled={!item.isAvailable}
                      className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                        item.isAvailable
                          ? 'bg-[#241A15] text-[#FAF7F2] hover:bg-[#8C6D58] active:scale-95 shadow-sm'
                          : 'bg-[#E5D7C5] text-[#8C6D58] cursor-not-allowed'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{item.isAvailable ? (item.customizations?.length ? 'Customize' : 'Add') : 'Sold Out'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* COMPACT LIST VIEW */
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                onClick={() => setSelectedProductForModal(item)}
                className="group p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D3C1] hover:border-[#8C6D58] flex items-center justify-between gap-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#1A120D] shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-red-600'}`} />
                      <h3 className="font-serif text-base font-medium text-[#241A15] truncate group-hover:text-[#8C6D58]">
                        {item.name}
                      </h3>
                      {item.isBestseller && (
                        <span className="hidden sm:inline-block px-2 py-0.2 rounded bg-[#D4AF37] text-[#1A120D] text-[9px] font-bold uppercase">
                          Bestseller
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#735E4E] line-clamp-1 mt-0.5 font-light">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-mono text-base font-bold text-[#241A15]">₹{item.price}</span>
                  <button
                    onClick={(e) => handleQuickAdd(e, item)}
                    disabled={!item.isAvailable}
                    className="px-3.5 py-2 rounded-xl bg-[#241A15] text-[#FAF7F2] hover:bg-[#8C6D58] text-xs font-medium"
                  >
                    {item.isAvailable ? 'Add' : 'Sold Out'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
