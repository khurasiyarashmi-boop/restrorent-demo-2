import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderType, PaymentMethod, OrderCustomerInfo } from '../../types';
import { 
  ArrowLeft, 
  Utensils, 
  ShoppingBag, 
  Bike, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartTax,
    cartDeliveryFee,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    placeOrder,
    setActivePage,
    tableNumber,
    businessSettings
  } = useApp();

  const [orderType, setOrderType] = useState<OrderType>(tableNumber ? 'dine-in' : 'dine-in');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryLandmark, setDeliveryLandmark] = useState('');
  const [selectedTable, setSelectedTable] = useState(tableNumber || 'Table 04');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#FAF7F2] text-[#241A15]">
        <div className="w-16 h-16 rounded-full bg-[#F3ECE1] text-[#8C6D58] flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-semibold mb-2">Your Cart is Empty</h2>
        <p className="text-xs text-[#735E4E] max-w-sm mb-6 font-light">
          Please add some handcrafted items from our digital menu before proceeding to checkout.
        </p>
        <button
          onClick={() => setActivePage('menu')}
          className="px-6 py-3 rounded-full bg-[#241A15] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider shadow"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Form Validations
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMessage('Please provide your complete delivery address in Bhopal');
      return;
    }

    try {
      setIsSubmitting(true);

      const customerInfo: OrderCustomerInfo = {
        name: customerName.trim(),
        phone: customerPhone.trim(),
        email: customerEmail.trim() || undefined,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : undefined,
        deliveryLandmark: orderType === 'delivery' ? deliveryLandmark.trim() : undefined,
        tableNumber: orderType === 'dine-in' ? selectedTable : undefined,
        notes: orderNotes.trim() || undefined
      };

      const createdOrder = await placeOrder(customerInfo, orderType, paymentMethod);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#241A15', '#8C6D58', '#E5D7C5']
      });

      // Navigate to live tracking
      setActivePage('tracking');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="checkout-view" className="min-h-screen bg-[#FAF7F2] text-[#241A15] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => setActivePage('menu')}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#8C6D58] hover:text-[#241A15] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#241A15] mb-8">
          Complete Your Dining Order
        </h1>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/10 border border-red-500/30 text-red-700 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Order Type Selection */}
            <div className="p-6 rounded-3xl bg-[#F3ECE1] border border-[#E0D3C1] space-y-4 shadow-sm">
              <span className="text-xs font-mono tracking-widest text-[#8C6D58] uppercase block">
                Step 1 • Dining Preference
              </span>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                    orderType === 'dine-in'
                      ? 'bg-[#241A15] text-[#FAF7F2] border-[#241A15] shadow-md'
                      : 'bg-[#FAF7F2] text-[#5E4C3E] border-[#D5C6B5] hover:border-[#8C6D58]'
                  }`}
                >
                  <Utensils className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-xs font-semibold">Dine-in</span>
                  <span className="text-[10px] text-[#A89887] font-mono">At Cafe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                    orderType === 'pickup'
                      ? 'bg-[#241A15] text-[#FAF7F2] border-[#241A15] shadow-md'
                      : 'bg-[#FAF7F2] text-[#5E4C3E] border-[#D5C6B5] hover:border-[#8C6D58]'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-xs font-semibold">Takeaway</span>
                  <span className="text-[10px] text-[#A89887] font-mono">Self Pickup</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                    orderType === 'delivery'
                      ? 'bg-[#241A15] text-[#FAF7F2] border-[#241A15] shadow-md'
                      : 'bg-[#FAF7F2] text-[#5E4C3E] border-[#D5C6B5] hover:border-[#8C6D58]'
                  }`}
                >
                  <Bike className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-xs font-semibold">Delivery</span>
                  <span className="text-[10px] text-[#A89887] font-mono">Bhopal Local</span>
                </button>
              </div>

              {/* Conditional Dine-in Table Selector */}
              {orderType === 'dine-in' && (
                <div className="pt-2">
                  <label htmlFor="table-select" className="block text-xs font-medium text-[#241A15] mb-1.5">
                    Select Your Table Number
                  </label>
                  <select
                    id="table-select"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs font-medium text-[#241A15] focus:outline-none focus:border-[#241A15]"
                  >
                    {['Table 01', 'Table 02', 'Table 03', 'Table 04', 'Table 05', 'Table 06', 'Table 07', 'Table 08', 'Patio P1', 'Patio P2', 'Lounge L1'].map((t) => (
                      <option key={t} value={t}>{t} (Indoor / Patio)</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Conditional Delivery Address */}
              {orderType === 'delivery' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label htmlFor="delivery-address" className="block text-xs font-medium text-[#241A15] mb-1">
                      Delivery Address in Bhopal *
                    </label>
                    <textarea
                      id="delivery-address"
                      required
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House/Flat No., Building Name, Area (e.g. Aakriti Ecocity, Salaiya, Bhopal)"
                      className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#241A15]"
                    />
                  </div>
                  <div>
                    <label htmlFor="delivery-landmark" className="block text-xs font-medium text-[#241A15] mb-1">
                      Nearby Landmark (Optional)
                    </label>
                    <input
                      id="delivery-landmark"
                      type="text"
                      value={deliveryLandmark}
                      onChange={(e) => setDeliveryLandmark(e.target.value)}
                      placeholder="e.g. Near Mahindra Square, Club Gate"
                      className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#241A15]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Customer Contact Information */}
            <div className="p-6 rounded-3xl bg-[#F3ECE1] border border-[#E0D3C1] space-y-4 shadow-sm">
              <span className="text-xs font-mono tracking-widest text-[#8C6D58] uppercase block">
                Step 2 • Guest Details
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkout-name" className="block text-xs font-medium text-[#241A15] mb-1">
                    Full Name *
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Aditya Sharma"
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#241A15]"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-phone" className="block text-xs font-medium text-[#241A15] mb-1">
                    Mobile Number *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98260 XXXXX"
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#241A15]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkout-email" className="block text-xs font-medium text-[#241A15] mb-1">
                  Email Address (For digital receipt)
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#241A15]"
                />
              </div>

              <div>
                <label htmlFor="checkout-notes" className="block text-xs font-medium text-[#241A15] mb-1">
                  Kitchen Notes & Instructions
                </label>
                <input
                  id="checkout-notes"
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Extra napkins, less sugar in latte"
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#241A15]"
                />
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="p-6 rounded-3xl bg-[#F3ECE1] border border-[#E0D3C1] space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-[#8C6D58] uppercase">
                  Step 3 • Payment Selection
                </span>
                <span className="text-[10px] text-emerald-700 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  UPI & Cards Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    paymentMethod === 'upi'
                      ? 'bg-[#241A15] text-[#FAF7F2] border-[#241A15] shadow-md'
                      : 'bg-[#FAF7F2] text-[#5E4C3E] border-[#D5C6B5] hover:border-[#8C6D58]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                  <div>
                    <span className="text-xs font-semibold block">Instant UPI</span>
                    <span className="text-[10px] text-[#A89887]">GPay, PhonePe, QR</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    paymentMethod === 'card'
                      ? 'bg-[#241A15] text-[#FAF7F2] border-[#241A15] shadow-md'
                      : 'bg-[#FAF7F2] text-[#5E4C3E] border-[#D5C6B5] hover:border-[#8C6D58]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                  <div>
                    <span className="text-xs font-semibold block">Debit / Credit</span>
                    <span className="text-[10px] text-[#A89887]">Visa, MC, RuPay</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    paymentMethod === 'cash'
                      ? 'bg-[#241A15] text-[#FAF7F2] border-[#241A15] shadow-md'
                      : 'bg-[#FAF7F2] text-[#5E4C3E] border-[#D5C6B5] hover:border-[#8C6D58]'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-[#D4AF37]" />
                  <div>
                    <span className="text-xs font-semibold block">
                      {orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter'}
                    </span>
                    <span className="text-[10px] text-[#A89887]">Cash / In-person</span>
                  </div>
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs space-y-2">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[#8C6D58]">Yecha UPI VPA:</span>
                    <span className="font-bold text-[#241A15]">yechacafe@okhdfcbank</span>
                  </div>
                  <p className="text-[11px] text-[#735E4E]">
                    A payment prompt / simulated instant QR verification will confirm your order upon submission.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl bg-[#F3ECE1] border border-[#E0D3C1] p-6 space-y-6 shadow-sm">
              <h3 className="font-serif text-xl font-medium text-[#241A15] pb-3 border-b border-[#E0D3C1]">
                Order Summary
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex items-start justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-medium text-[#241A15]">
                        <span>{item.quantity}x</span>
                        <span className="truncate">{item.menuItem.name}</span>
                      </div>
                      {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
                        <p className="text-[10px] text-[#8C6D58] truncate">
                          {item.selectedCustomizations.map(c => c.choiceLabel).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-mono font-semibold text-[#241A15] shrink-0">
                      ₹{item.totalPrice}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bill Calculations */}
              <div className="space-y-2 pt-4 border-t border-[#E0D3C1] text-xs text-[#6B5646]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#241A15]">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5% Restaurant Service)</span>
                  <span className="font-mono text-[#241A15]">₹{cartTax}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="font-mono text-[#241A15]">
                      {cartDeliveryFee === 0 ? 'FREE' : `₹${cartDeliveryFee}`}
                    </span>
                  </div>
                )}
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Discount Code ({appliedCoupon.code})</span>
                    <span className="font-mono">-₹{cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-[#E0D3C1] font-serif text-lg font-bold text-[#241A15]">
                  <span>Total Amount</span>
                  <span className="font-mono text-xl text-[#8C6D58]">₹{cartTotal}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="place-order-submit-btn"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#241A15] text-[#FAF7F2] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#3B281C] active:scale-98 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Transmitting Order...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Confirm & Place Order (₹{cartTotal})</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#8C6D58] font-mono">
                Order will be transmitted instantly to Yecha kitchen.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
