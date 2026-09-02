import React from 'react';
import { Order } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Printer, Download, CheckCircle2, QrCode } from 'lucide-react';

interface DigitalReceiptModalProps {
  order: Order;
  onClose: () => void;
}

export const DigitalReceiptModal: React.FC<DigitalReceiptModalProps> = ({ order, onClose }) => {
  const { siteContent, businessSettings } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      id="receipt-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="receipt-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white text-[#241A15] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 font-mono my-8 border border-[#E0D3C1]"
      >
        {/* Close Button */}
        <button
          id="close-receipt-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500"
          aria-label="Close receipt"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Receipt Brand Header */}
        <div className="text-center pb-6 border-b border-dashed border-gray-300">
          <h2 className="font-serif text-2xl font-bold tracking-widest text-[#241A15]">YECHA CAFE</h2>
          <p className="text-xs text-gray-500 font-serif">एच कैफे • भोपाल</p>
          <p className="text-[11px] text-gray-500 mt-2 max-w-xs mx-auto leading-tight font-sans">
            {siteContent.address}
          </p>
          <p className="text-[11px] text-gray-500 font-sans mt-0.5">Tel: {siteContent.phone}</p>
        </div>

        {/* Order Meta */}
        <div className="py-4 border-b border-dashed border-gray-300 space-y-1.5 text-xs text-gray-700 font-sans">
          <div className="flex justify-between">
            <span className="font-semibold text-black">Order ID:</span>
            <span className="font-mono font-bold text-black">{order.orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Date & Time:</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Customer:</span>
            <span>{order.customer.name} ({order.customer.phone})</span>
          </div>
          <div className="flex justify-between">
            <span>Order Type:</span>
            <span className="uppercase font-semibold">
              {order.orderType} {order.customer.tableNumber ? `(${order.customer.tableNumber})` : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Payment Mode:</span>
            <span className="uppercase font-semibold text-emerald-700">{order.paymentMethod} • {order.paymentStatus}</span>
          </div>
        </div>

        {/* Itemized list */}
        <div className="py-4 border-b border-dashed border-gray-300 space-y-2 text-xs">
          <div className="flex justify-between font-bold text-black border-b border-gray-200 pb-1">
            <span>Item & Customization</span>
            <span>Amount</span>
          </div>
          {order.items.map((item, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="flex justify-between font-medium text-gray-900">
                <span>{item.quantity}x {item.menuItem.name}</span>
                <span>₹{item.totalPrice}</span>
              </div>
              {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
                <p className="text-[10px] text-gray-500 pl-4 font-sans">
                  {item.selectedCustomizations.map(c => c.choiceLabel).join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Totals Breakdown */}
        <div className="py-4 border-b border-dashed border-gray-300 space-y-1.5 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (5%):</span>
            <span>₹{order.tax}</span>
          </div>
          {order.deliveryFee > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee:</span>
              <span>₹{order.deliveryFee}</span>
            </div>
          )}
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Discount ({order.couponCode || 'PROMO'}):</span>
              <span>-₹{order.discount}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-gray-300">
            <span>Grand Total:</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {/* Receipt Verification Footer */}
        <div className="pt-6 text-center space-y-3 font-sans">
          <div className="w-20 h-20 mx-auto bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center p-2">
            <QrCode className="w-16 h-16 text-[#241A15]" />
          </div>
          <p className="text-[11px] text-gray-500 font-light">
            Thank you for dining with Yecha Cafe!
          </p>

          <div className="flex gap-2 pt-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 rounded-xl bg-[#241A15] text-[#FAF7F2] text-xs font-semibold uppercase flex items-center justify-center gap-2 hover:bg-[#3B281C]"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
