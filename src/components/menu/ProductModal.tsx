import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem } from '../../types';
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Clock, 
  Flame, 
  Info, 
  AlertCircle,
  Check,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductModal: React.FC = () => {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useApp();
  const item = selectedProductForModal;

  const [quantity, setQuantity] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, { label: string; price: number }>>({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset state when a new product is selected
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setSpecialInstructions('');
      const defaults: Record<string, { label: string; price: number }> = {};
      if (item.customizations) {
        item.customizations.forEach((group) => {
          if (group.defaultChoice) {
            const foundChoice = group.choices.find(c => c.label === group.defaultChoice);
            if (foundChoice) {
              defaults[group.name] = { label: foundChoice.label, price: foundChoice.price };
            }
          } else if (group.required && group.choices.length > 0) {
            defaults[group.name] = { label: group.choices[0].label, price: group.choices[0].price };
          }
        });
      }
      setSelectedChoices(defaults);
    }
  }, [item]);

  if (!item) return null;

  const handleChoiceToggle = (groupName: string, label: string, price: number, required?: boolean) => {
    setSelectedChoices(prev => {
      if (prev[groupName]?.label === label && !required) {
        // Toggle off if optional
        const copy = { ...prev };
        delete copy[groupName];
        return copy;
      }
      return {
        ...prev,
        [groupName]: { label, price }
      };
    });
  };

  const customizationCost = Object.values(selectedChoices).reduce<number>(
    (sum, c) => sum + ((c as { label: string; price: number })?.price || 0), 
    0
  );
  const unitPrice = item.price + customizationCost;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const formattedCustomizations = Object.entries(selectedChoices).map(([groupName, choice]) => {
      const typedChoice = choice as { label: string; price: number };
      return {
        groupName,
        choiceLabel: typedChoice.label,
        price: typedChoice.price
      };
    });

    addToCart(item, quantity, formattedCustomizations, specialInstructions.trim() || undefined);
    setSelectedProductForModal(null);
  };

  return (
    <AnimatePresence>
      <div 
        id="product-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
        onClick={() => setSelectedProductForModal(null)}
      >
        <motion.div
          id="product-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#FAF7F2] text-[#241A15] rounded-3xl shadow-2xl overflow-hidden my-8 border border-[#E0D3C1]"
        >
          {/* Close Button */}
          <button
            id="close-product-modal-btn"
            onClick={() => setSelectedProductForModal(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1A120D]/70 hover:bg-[#1A120D] text-white flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Image */}
          <div className="relative h-64 sm:h-72 w-full bg-[#1A120D] overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/30" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow ${
                item.dietary === 'veg'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-red-800 text-white'
              }`}>
                <span className={`w-2 h-2 rounded-full ${item.dietary === 'veg' ? 'bg-emerald-300' : 'bg-red-300'}`} />
                <span>{item.dietary === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'}</span>
              </span>

              {item.isBestseller && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#1A120D] text-xs font-bold tracking-wider uppercase shadow">
                  <Star className="w-3 h-3 fill-[#1A120D]" />
                  Bestseller
                </span>
              )}
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            
            {/* Title & Price */}
            <div>
              {item.hindiName && (
                <span className="text-xs font-serif text-[#8C6D58] tracking-widest block mb-1">
                  {item.hindiName}
                </span>
              )}
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#241A15] leading-tight">
                  {item.name}
                </h2>
                <div className="text-right shrink-0">
                  <span className="font-mono text-2xl font-bold text-[#8C6D58]">
                    ₹{item.price}
                  </span>
                  {item.calories && (
                    <span className="text-[11px] text-[#8C6D58] block font-mono">
                      {item.calories}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-[#5E4C3E] font-light leading-relaxed mt-3">
                {item.description}
              </p>
            </div>

            {/* Preparation time & Info */}
            <div className="flex flex-wrap items-center gap-4 py-3 px-4 rounded-xl bg-[#EFE8DC] text-xs text-[#5E4C3E]">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#8C6D58]" />
                Freshly prepared in ~{item.preparationTimeMinutes} mins
              </span>
              {item.allergens && item.allergens.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Allergens: {item.allergens.join(', ')}
                </span>
              )}
            </div>

            {/* Ingredients Tags */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div>
                <h4 className="text-xs font-mono tracking-wider text-[#8C6D58] uppercase mb-2">Key Ingredients</h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.ingredients.map((ing) => (
                    <span key={ing} className="px-2.5 py-1 rounded-full bg-[#E5D7C5] text-[#342217] text-xs font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Groups */}
            {item.customizations && item.customizations.length > 0 && (
              <div className="space-y-4 pt-2 border-t border-[#EAE1D5]">
                <h3 className="text-xs font-mono tracking-widest text-[#8C6D58] uppercase">
                  Customization & Add-ons
                </h3>

                {item.customizations.map((group) => (
                  <div key={group.id} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-[#241A15]">
                      <span>{group.name}</span>
                      {group.required && (
                        <span className="text-[10px] text-[#8C6D58] uppercase tracking-wider">Required</span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.choices.map((choice) => {
                        const isSelected = selectedChoices[group.name]?.label === choice.label;
                        return (
                          <button
                            key={choice.label}
                            type="button"
                            onClick={() => handleChoiceToggle(group.name, choice.label, choice.price, group.required)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                              isSelected
                                ? 'bg-[#241A15] text-[#FAF7F2] border-[#241A15] shadow-sm'
                                : 'bg-[#F5EFE6] text-[#4A3222] border-[#DFCFC0] hover:border-[#8C6D58]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                                isSelected ? 'border-[#D4AF37] bg-[#D4AF37] text-[#1A120D]' : 'border-[#A89887]'
                              }`}>
                                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </span>
                              <span>{choice.label}</span>
                            </div>
                            <span className={`font-mono ${isSelected ? 'text-[#D4AF37]' : 'text-[#8C6D58]'}`}>
                              {choice.price > 0 ? `+₹${choice.price}` : 'Free'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Special Instructions */}
            <div className="pt-2 border-t border-[#EAE1D5]">
              <label htmlFor="special-instructions" className="block text-xs font-mono tracking-wider text-[#8C6D58] uppercase mb-2">
                Special Kitchen Notes (Optional)
              </label>
              <textarea
                id="special-instructions"
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Less ice, extra hot, separate packaging..."
                className="w-full p-3 rounded-xl bg-[#F5EFE6] border border-[#DFCFC0] text-xs text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#4A3222]"
              />
            </div>

          </div>

          {/* Sticky Bottom Bar */}
          <div className="p-4 sm:p-6 bg-[#EFE8DC] border-t border-[#E0D3C1] flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 bg-[#FAF7F2] p-1.5 rounded-full border border-[#D5C6B5]">
              <button
                id="modal-decrease-qty"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-[#EAE1D5] hover:bg-[#DFCFC0] flex items-center justify-center text-[#241A15] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-sm font-bold w-6 text-center text-[#241A15]">
                {quantity}
              </span>
              <button
                id="modal-increase-qty"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-[#EAE1D5] hover:bg-[#DFCFC0] flex items-center justify-center text-[#241A15] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Button with Dynamic Total */}
            <button
              id="modal-add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!item.isAvailable}
              className={`w-full sm:w-auto flex-1 flex items-center justify-between px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-xl transition-all ${
                item.isAvailable
                  ? 'bg-[#241A15] text-[#FAF7F2] hover:bg-[#3B2B20] active:scale-98'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                {item.isAvailable ? 'Add to Order' : 'Currently Unavailable'}
              </span>
              <span className="font-mono text-base font-bold text-[#D4AF37]">
                ₹{totalPrice}
              </span>
            </button>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
