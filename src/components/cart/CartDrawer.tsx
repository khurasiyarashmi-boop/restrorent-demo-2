import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  AlertCircle,
  Coffee,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartSubtotal,
    cartTax,
    cartDeliveryFee,
    cartDiscount,
    cartTotal,
    setActivePage,
    coupons,
    businessSettings
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div 
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm"
      onClick={() => setIsCartOpen(false)}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          id="cart-drawer-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md bg-[#FAF7F2] text-[#241A15] shadow-2xl flex flex-col justify-between border-l border-[#E0D3C1]"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E0D3C1] flex items-center justify-between bg-[#F3ECE1]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#241A15] text-[#FAF7F2] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#241A15]">Your Order Cart</h3>
                <p className="text-[11px] font-mono text-[#8C6D58] uppercase">
                  {cart.reduce((acc, i) => acc + i.quantity, 0)} items selected
                </p>
              </div>
            </div>

            <button
              id="close-cart-drawer-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-[#EAE1D5] text-[#5E4C3E] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Items Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EAE1D5] text-[#8C6D58] flex items-center justify-center mx-auto">
                  <Coffee className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#241A15]">Your table is waiting</h4>
                  <p className="text-xs text-[#735E4E] max-w-xs mx-auto mt-1 font-light leading-relaxed">
                    Add handcrafted iced lattes, fresh tiramisu, or artisanal crunchwiches to begin your order.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('menu');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#241A15] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase shadow hover:bg-[#3B281C]"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-4 rounded-2xl bg-[#F3ECE1] border border-[#E0D3C1] flex flex-col gap-3 relative group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#1A120D]"
                        />
                        <div>
                          <h4 className="font-serif text-sm font-medium text-[#241A15] leading-snug">
                            {item.menuItem.name}
                          </h4>
                          <span className="font-mono text-xs font-semibold text-[#8C6D58] block mt-0.5">
                            ₹{item.unitPrice} each
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[#9E8B7A] hover:text-red-600 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Customizations tags */}
                    {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
                      <div className="flex flex-wrap gap-1 text-[11px] text-[#735E4E]">
                        {item.selectedCustomizations.map((c, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-[#EAE1D5] text-[10px] font-medium">
                            {c.choiceLabel} {c.price > 0 && `(+₹${c.price})`}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.specialInstructions && (
                      <p className="text-[11px] italic text-[#8C6D58] bg-[#FAF7F2] p-2 rounded-lg border border-[#E0D3C1]">
                        "{item.specialInstructions}"
                      </p>
                    )}

                    {/* Bottom row with quantity modifiers and total */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#E0D3C1]/70">
                      <div className="flex items-center gap-2 bg-[#FAF7F2] px-2 py-1 rounded-full border border-[#D5C6B5]">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#EAE1D5] text-[#241A15]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold w-5 text-center text-[#241A15]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#EAE1D5] text-[#241A15]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-bold text-[#241A15]">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <div className="flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#8C6D58] hover:text-red-600 underline font-mono"
                  >
                    Clear All Items
                  </button>
                </div>

                {/* Coupon Code Section */}
                <div className="pt-4 border-t border-[#E0D3C1]">
                  {appliedCoupon ? (
                    <div className="p-3 rounded-xl bg-[#241A15] text-[#FAF7F2] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#D4AF37]" />
                        <div>
                          <span className="text-xs font-bold font-mono text-[#D4AF37] uppercase">{appliedCoupon.code}</span>
                          <p className="text-[10px] text-[#C4B099]">{appliedCoupon.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-[#C4B099] hover:text-white underline font-mono"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value.toUpperCase());
                            setCouponError('');
                          }}
                          placeholder="PROMO CODE (e.g. YECHA10)"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-[#F3ECE1] border border-[#D5C6B5] text-xs uppercase font-mono text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#241A15]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-[#241A15] text-[#FAF7F2] text-xs font-semibold uppercase hover:bg-[#3B281C]"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-red-600 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          {couponError}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {coupons.filter(c => c.isActive).map(c => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => applyCoupon(c.code)}
                            className="px-2 py-0.5 rounded text-[10px] bg-[#EAE1D5] text-[#5E4C3E] hover:bg-[#D5C6B5] font-mono"
                          >
                            {c.code}
                          </button>
                        ))}
                      </div>
                    </form>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Drawer Footer & Bill Breakdown */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F3ECE1] border-t border-[#E0D3C1] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6B5646]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#241A15]">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Restaurant GST (5%)</span>
                  <span className="font-mono text-[#241A15]">₹{cartTax}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span className="font-mono">-₹{cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#E0D3C1] font-serif text-base text-[#241A15] font-bold">
                  <span>Estimated Total</span>
                  <span className="font-mono text-lg text-[#8C6D58]">₹{cartTotal}</span>
                </div>
              </div>

              <button
                id="drawer-proceed-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-2xl bg-[#241A15] text-[#FAF7F2] font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-between px-6 hover:bg-[#3B281C] active:scale-98 transition-all shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <span className="flex items-center gap-2 font-mono">
                  ₹{cartTotal}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
