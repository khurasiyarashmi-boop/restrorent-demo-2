import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  PackageCheck, 
  Bike, 
  Utensils, 
  Search, 
  Receipt, 
  PhoneCall, 
  ArrowRight, 
  AlertCircle,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { DigitalReceiptModal } from './DigitalReceiptModal';

export const OrderTrackingView: React.FC = () => {
  const { orders, activeOrderToTrack, setActiveOrderToTrack, setActivePage, siteContent } = useApp();

  const [lookupId, setLookupId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(activeOrderToTrack || (orders.length > 0 ? orders[0] : null));
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [lookupError, setLookupError] = useState('');

  // Keep selectedOrder in sync with app context updates (e.g. status changes from admin)
  useEffect(() => {
    if (selectedOrder) {
      const fresh = orders.find(o => o.id === selectedOrder.id || o.orderNumber === selectedOrder.orderNumber);
      if (fresh) {
        setSelectedOrder(fresh);
      }
    } else if (orders.length > 0) {
      setSelectedOrder(orders[0]);
    }
  }, [orders]);

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    if (!lookupId.trim()) return;

    const term = lookupId.trim().toUpperCase();
    const found = orders.find(o => o.orderNumber.toUpperCase() === term || o.id === term);
    if (found) {
      setSelectedOrder(found);
      setActiveOrderToTrack(found);
      setLookupId('');
    } else {
      setLookupError(`No order found matching "${lookupId}". Please check your order ID.`);
    }
  };

  const steps: { key: OrderStatus; label: string; icon: React.ElementType; description: string }[] = [
    { key: 'Pending', label: 'Received', icon: Clock, description: 'Order received & queued at kitchen' },
    { key: 'Confirmed', label: 'Confirmed', icon: CheckCircle2, description: 'Accepted by Yecha Barista team' },
    { key: 'Preparing', label: 'Handcrafting', icon: ChefHat, description: 'Dialing espresso shots & baking' },
    { key: 'Ready', label: 'Plated & Ready', icon: PackageCheck, description: 'Quality checked & ready for service' },
    { key: 'Completed', label: 'Delivered / Served', icon: Utensils, description: 'Enjoy your Yecha experience' },
  ];

  const getStepStatus = (stepKey: OrderStatus, currentStatus: OrderStatus) => {
    const statusOrder: OrderStatus[] = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Completed'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepKey);

    if (currentStatus === 'Cancelled') return 'cancelled';
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div id="order-tracking-view" className="min-h-screen bg-[#FAF7F2] text-[#241A15] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header and Lookup Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#8C6D58] uppercase block mb-1">
              Live Kitchen Telemetry
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#241A15]">
              Real-time Order Tracker
            </h1>
          </div>

          {/* Quick Lookup Form */}
          <form onSubmit={handleLookupSubmit} className="flex gap-2">
            <div className="relative">
              <input
                id="order-lookup-input"
                type="text"
                value={lookupId}
                onChange={(e) => setLookupId(e.target.value)}
                placeholder="Lookup (e.g. YC-1082)"
                className="pl-3 pr-8 py-2 rounded-xl bg-[#F3ECE1] border border-[#D5C6B5] text-xs font-mono uppercase text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#241A15]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#241A15] text-[#FAF7F2] text-xs font-semibold hover:bg-[#3B281C]"
            >
              Track
            </button>
          </form>
        </div>

        {lookupError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/10 border border-red-500/30 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{lookupError}</span>
          </div>
        )}

        {!selectedOrder ? (
          <div className="py-20 text-center bg-[#F3ECE1] rounded-3xl border border-[#E0D3C1] p-8">
            <Clock className="w-12 h-12 text-[#8C6D58] mx-auto mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">No Active Order Selected</h3>
            <p className="text-xs text-[#735E4E] max-w-sm mx-auto mb-6">
              Enter your Order Number (e.g. YC-1082) above, or place a new order from our digital menu.
            </p>
            <button
              onClick={() => setActivePage('menu')}
              className="px-6 py-2.5 rounded-full bg-[#241A15] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider"
            >
              Browse Digital Menu
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Main Status Hero Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#241A15] text-[#FAF7F2] border border-[#3D291E] shadow-xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#3D291E]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">
                      Order #{selectedOrder.orderNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#3D291E] text-xs text-[#E5D7C5] font-mono capitalize">
                      {selectedOrder.orderType} {selectedOrder.customer.tableNumber ? `• ${selectedOrder.customer.tableNumber}` : ''}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white mt-1">
                    {selectedOrder.status === 'pending' && 'Order Transmitted to Kitchen'}
                    {selectedOrder.status === 'confirmed' && 'Barista Team Confirmed Order'}
                    {selectedOrder.status === 'preparing' && 'Handcrafting Your Items'}
                    {selectedOrder.status === 'ready' && 'Order Plated & Ready!'}
                    {(selectedOrder.status === 'served' || selectedOrder.status === 'completed') && 'Order Served & Completed'}
                    {selectedOrder.status === 'cancelled' && 'Order Cancelled'}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowReceiptModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#3D291E] hover:bg-[#523829] text-xs font-medium text-[#FAF7F2] flex items-center gap-2 border border-[#644733] transition-colors"
                  >
                    <Receipt className="w-4 h-4 text-[#D4AF37]" />
                    <span>View Digital Receipt</span>
                  </button>
                </div>
              </div>

              {/* Multi-Step Timeline */}
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-5 gap-4">
                {steps.map((step, idx) => {
                  const state = getStepStatus(step.key, selectedOrder.status);
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="flex flex-col items-start sm:items-center text-left sm:text-center relative">
                      <div className="flex items-center gap-3 sm:flex-col sm:gap-2 w-full">
                        
                        {/* Step Circle */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          state === 'completed'
                            ? 'bg-[#D4AF37] text-[#1A120D] shadow-lg shadow-[#D4AF37]/20'
                            : state === 'current'
                            ? 'bg-white text-[#241A15] ring-4 ring-[#D4AF37]/50 animate-pulse'
                            : 'bg-[#3D291E] text-[#8C6D58]'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <div>
                          <span className={`text-xs font-semibold block ${
                            state === 'upcoming' ? 'text-[#8C6D58]' : 'text-white'
                          }`}>
                            {step.label}
                          </span>
                          <span className="text-[10px] text-[#A89887] leading-tight block sm:max-w-[120px] mx-auto mt-0.5 font-light">
                            {step.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Estimated Prep Timer Banner */}
              <div className="mt-8 pt-6 border-t border-[#3D291E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-[#E5D7C5]">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    Estimated Preparation: <strong>{selectedOrder.estimatedTimeMinutes} Minutes</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${siteContent.phone}`}
                    className="text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Call Yecha Concierge ({siteContent.phone})
                  </a>
                </div>
              </div>
            </div>

            {/* Order Items & Breakdown Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F3ECE1] border border-[#E0D3C1] space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E0D3C1] pb-4">
                <h3 className="font-serif text-xl font-medium text-[#241A15]">
                  Items in this Order ({selectedOrder.items.reduce((a, b) => a + b.quantity, 0)})
                </h3>
                <span className="font-mono text-xs text-[#8C6D58] uppercase">
                  Placed: {new Date(selectedOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="divide-y divide-[#E0D3C1]">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3.5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-12 h-12 rounded-xl object-cover bg-[#1A120D] shrink-0"
                      />
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-[#241A15]">
                          {item.quantity}x {item.menuItem.name}
                        </h4>
                        {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
                          <p className="text-xs text-[#8C6D58] mt-0.5">
                            {item.selectedCustomizations.map(c => c.choiceLabel).join(', ')}
                          </p>
                        )}
                        {item.specialInstructions && (
                          <p className="text-[11px] italic text-[#735E4E] mt-0.5">
                            Note: "{item.specialInstructions}"
                          </p>
                        )}
                      </div>
                    </div>

                    <span className="font-mono text-sm font-bold text-[#241A15] shrink-0">
                      ₹{item.totalPrice}
                    </span>
                  </div>
                ))}
              </div>

              {/* Customer & Delivery Details */}
              <div className="pt-4 border-t border-[#E0D3C1] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5E4C3E]">
                <div>
                  <span className="font-mono text-[#8C6D58] uppercase block">Guest Info:</span>
                  <p className="font-medium text-[#241A15] mt-0.5">
                    {selectedOrder.customer.name} • {selectedOrder.customer.phone}
                  </p>
                </div>
                {selectedOrder.customer.deliveryAddress && (
                  <div>
                    <span className="font-mono text-[#8C6D58] uppercase block">Delivery Destination:</span>
                    <p className="font-medium text-[#241A15] mt-0.5">
                      {selectedOrder.customer.deliveryAddress}
                    </p>
                  </div>
                )}
              </div>

              {/* Bill Totals */}
              <div className="pt-4 border-t border-[#E0D3C1] space-y-1.5 text-xs text-[#6B5646]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#241A15]">₹{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-mono text-[#241A15]">₹{selectedOrder.tax}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Discount</span>
                    <span className="font-mono">-₹{selectedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#E0D3C1] font-serif text-base font-bold text-[#241A15]">
                  <span>Paid Amount ({selectedOrder.paymentMethod.toUpperCase()})</span>
                  <span className="font-mono text-lg text-[#8C6D58]">₹{selectedOrder.total}</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 flex justify-between items-center">
                <button
                  onClick={() => setActivePage('menu')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-[#241A15] hover:text-[#8C6D58]"
                >
                  <span>Order More Delicious Treats</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Digital Receipt Modal */}
      {showReceiptModal && selectedOrder && (
        <DigitalReceiptModal
          order={selectedOrder}
          onClose={() => setShowReceiptModal(false)}
        />
      )}
    </div>
  );
};
