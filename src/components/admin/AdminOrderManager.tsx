import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { 
  Search, 
  Receipt, 
  Check, 
  Clock, 
  ChefHat, 
  PackageCheck, 
  XCircle 
} from 'lucide-react';
import { DigitalReceiptModal } from '../order/DigitalReceiptModal';

export const AdminOrderManager: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedOrder, setInspectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((ord) => {
    if (filterStatus !== 'All' && ord.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNum = ord.orderNumber.toLowerCase().includes(q);
      const matchName = ord.customer.name.toLowerCase().includes(q);
      const matchPhone = ord.customer.phone.includes(q);
      const matchTable = ord.customer.tableNumber?.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchPhone && !matchTable) return false;
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-950/80 text-amber-400 border border-amber-500/40">Pending</span>;
      case 'Confirmed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-950/80 text-blue-400 border border-blue-500/40">Confirmed</span>;
      case 'Preparing':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-yellow-950/80 text-yellow-400 border border-yellow-500/40">In Kitchen</span>;
      case 'Ready':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">Ready</span>;
      case 'Out for Delivery':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-purple-950/80 text-purple-400 border border-purple-500/40">On the Way</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-gray-800 text-gray-300 border border-gray-600">Completed</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-red-950/80 text-red-400 border border-red-500/40">Cancelled</span>;
    }
  };

  return (
    <div id="admin-orders-manager" className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-medium text-white">Live POS Order Manager</h1>
          <p className="text-xs text-[#A89887]">Track, modify, and advance restaurant orders in real-time</p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3 py-1.5 rounded-full bg-[#1C130E] border border-[#332218]">
          Total Orders: {orders.length}
        </span>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#1C130E] border border-[#332218] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A89887] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order #, Guest Name, Phone, Table..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#2A1E17] border border-[#433024] text-xs text-white placeholder-[#7A6759] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto scrollbar-none">
          {['All', 'Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                filterStatus === tab
                  ? 'bg-[#D4AF37] text-[#140D09] font-bold'
                  : 'bg-[#2A1E17] text-[#A89887] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-[#1C130E] border border-[#332218] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#2D1E16] bg-[#241A15] text-[#C4B099] font-mono uppercase">
                <th className="p-4">Order ID & Time</th>
                <th className="p-4">Type & Table</th>
                <th className="p-4">Guest Info</th>
                <th className="p-4">Dishes</th>
                <th className="p-4">Total & Payment</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Workflow Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D1E16] text-[#FAF7F2]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-xs text-[#A89887]">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#231710] transition-colors">
                    
                    {/* ID & Time */}
                    <td className="p-4 font-mono">
                      <strong className="text-white block text-sm">{ord.orderNumber}</strong>
                      <span className="text-[10px] text-[#A89887]">
                        {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    {/* Type & Table */}
                    <td className="p-4">
                      <span className="capitalize font-medium block text-white">{ord.orderType}</span>
                      <span className="text-[10px] font-mono text-[#D4AF37]">
                        {ord.customer.tableNumber || (ord.orderType === 'delivery' ? 'Delivery' : 'Pickup')}
                      </span>
                    </td>

                    {/* Guest */}
                    <td className="p-4">
                      <span className="font-semibold block text-white">{ord.customer.name}</span>
                      <span className="text-[10px] text-[#A89887] font-mono">{ord.customer.phone}</span>
                    </td>

                    {/* Dishes */}
                    <td className="p-4 max-w-xs">
                      <div className="line-clamp-2 text-[#C4B099]">
                        {ord.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                      </div>
                      {ord.customer.notes && (
                        <span className="text-[10px] italic text-amber-300 block mt-0.5">
                          Note: "{ord.customer.notes}"
                        </span>
                      )}
                    </td>

                    {/* Total & Payment */}
                    <td className="p-4 font-mono">
                      <strong className="text-white block">₹{ord.total}</strong>
                      <span className="text-[10px] text-emerald-400 uppercase">
                        {ord.paymentMethod} • {ord.paymentStatus}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {getStatusBadge(ord.status)}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Status Transition buttons */}
                        {ord.status === 'Pending' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Confirmed')}
                            className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-semibold"
                            title="Accept Order"
                          >
                            Accept
                          </button>
                        )}
                        {ord.status === 'Confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Preparing')}
                            className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-semibold"
                            title="Send to Kitchen"
                          >
                            Cook
                          </button>
                        )}
                        {ord.status === 'Preparing' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Ready')}
                            className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold"
                            title="Mark Order Ready"
                          >
                            Ready
                          </button>
                        )}
                        {ord.status === 'Ready' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'Completed')}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold"
                            title="Complete Order"
                          >
                            Done
                          </button>
                        )}

                        {/* View Receipt button */}
                        <button
                          onClick={() => setInspectedOrder(ord)}
                          className="p-1.5 rounded bg-[#2A1E17] hover:bg-[#3D2B20] text-[#C4B099] hover:text-white"
                          title="View Digital Receipt"
                        >
                          <Receipt className="w-4 h-4 text-[#D4AF37]" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Receipt Modal */}
      {inspectedOrder && (
        <DigitalReceiptModal
          order={inspectedOrder}
          onClose={() => setInspectedOrder(null)}
        />
      )}

    </div>
  );
};
