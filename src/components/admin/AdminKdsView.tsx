import React from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  Coffee, 
  AlertCircle 
} from 'lucide-react';

export const AdminKdsView: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();

  // Active kitchen orders
  const activeOrders = orders.filter((o) =>
    ['Pending', 'Confirmed', 'Preparing', 'Ready'].includes(o.status)
  );

  const getElapsedTimeMinutes = (createdAt: string) => {
    const elapsedMs = Date.now() - new Date(createdAt).getTime();
    return Math.max(1, Math.floor(elapsedMs / (1000 * 60)));
  };

  return (
    <div id="admin-kds-view" className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#2D1E16]">
        <div>
          <h1 className="font-serif text-2xl font-medium text-white flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-[#D4AF37]" />
            <span>Kitchen Display System (KDS)</span>
          </h1>
          <p className="text-xs text-[#A89887]">Live order bump station for barista & culinary staff</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
            {activeOrders.length} In Progress
          </span>
        </div>
      </div>

      {/* Ticket Cards Grid */}
      {activeOrders.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#1C130E] border border-[#332218] text-center space-y-3">
          <Coffee className="w-12 h-12 text-[#D4AF37] mx-auto opacity-40" />
          <h3 className="font-serif text-lg text-white">Kitchen Queue is Clear</h3>
          <p className="text-xs text-[#A89887]">All active orders have been prepared and served.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeOrders.map((ord) => {
            const elapsed = getElapsedTimeMinutes(ord.createdAt);
            const isLate = elapsed > 15;

            return (
              <div
                key={ord.id}
                className={`rounded-3xl p-5 border shadow-xl flex flex-col justify-between transition-all ${
                  isLate
                    ? 'bg-[#2B1414] border-red-500/40'
                    : ord.status === 'Preparing'
                    ? 'bg-[#221A12] border-[#D4AF37]/50'
                    : 'bg-[#1C130E] border-[#332218]'
                }`}
              >
                {/* Ticket Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="font-mono text-base font-bold text-white block">
                        {ord.orderNumber}
                      </span>
                      <span className="text-xs text-[#D4AF37] font-mono font-medium">
                        {ord.customer.tableNumber || ord.orderType.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className={`flex items-center gap-1 font-mono text-xs font-semibold ${isLate ? 'text-red-400 animate-pulse' : 'text-[#A89887]'}`}>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{elapsed} min ago</span>
                      </div>
                      <span className="text-[10px] text-white/60 capitalize">{ord.customer.name}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="py-4 space-y-3 divide-y divide-white/5">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="pt-2 first:pt-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-[#D4AF37] text-[#140D09] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                              {item.quantity}
                            </span>
                            <span className="text-sm font-medium text-white">{item.menuItem.name}</span>
                          </div>
                        </div>

                        {/* Customizations */}
                        {item.selectedCustomizations && item.selectedCustomizations.length > 0 && (
                          <div className="ml-8 mt-1 space-y-0.5">
                            {item.selectedCustomizations.map((c, cIdx) => (
                              <span key={cIdx} className="block text-[11px] font-mono text-[#D4AF37]">
                                • {c.choiceLabel}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Special Instructions */}
                        {item.specialInstructions && (
                          <div className="ml-8 mt-1 text-[11px] italic text-amber-300 bg-amber-950/40 p-1.5 rounded border border-amber-500/20">
                            Note: {item.specialInstructions}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bump Actions */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {ord.customer.notes && (
                    <p className="text-[11px] italic text-amber-200 mb-2">
                      Order note: "{ord.customer.notes}"
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    {ord.status !== 'Preparing' ? (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'Preparing')}
                        className="py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors"
                      >
                        Start Prep
                      </button>
                    ) : (
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'Ready')}
                        className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                      >
                        Mark Ready
                      </button>
                    )}

                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Completed')}
                      className="py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Bump Done</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
