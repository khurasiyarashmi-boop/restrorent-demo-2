import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Phone, Mail, ShoppingBag, Sparkles, Search, Award } from 'lucide-react';

interface CustomerSummary {
  phone: string;
  name: string;
  email?: string;
  totalOrders: number;
  lifetimeSpend: number;
  lastOrderDate: string;
  tier: 'VIP' | 'Regular' | 'New Guest';
}

export const AdminCustomerManager: React.FC = () => {
  const { orders } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const customerDirectory: CustomerSummary[] = useMemo(() => {
    const map = new Map<string, CustomerSummary>();

    orders.forEach((o) => {
      const p = o.customer.phone;
      if (!p) return;

      const existing = map.get(p);
      const isComplete = o.status !== 'cancelled';
      const orderTotal = isComplete ? o.total : 0;

      if (!existing) {
        map.set(p, {
          phone: p,
          name: o.customer.name,
          email: o.customer.email,
          totalOrders: 1,
          lifetimeSpend: orderTotal,
          lastOrderDate: o.createdAt,
          tier: 'New Guest'
        });
      } else {
        existing.totalOrders += 1;
        existing.lifetimeSpend += orderTotal;
        if (new Date(o.createdAt) > new Date(existing.lastOrderDate)) {
          existing.lastOrderDate = o.createdAt;
          existing.name = o.customer.name; // latest name
        }
      }
    });

    const list = Array.from(map.values());
    list.forEach(c => {
      if (c.lifetimeSpend >= 1500 || c.totalOrders >= 4) {
        c.tier = 'VIP';
      } else if (c.totalOrders > 1) {
        c.tier = 'Regular';
      } else {
        c.tier = 'New Guest';
      }
    });

    return list.sort((a, b) => b.lifetimeSpend - a.lifetimeSpend);
  }, [orders]);

  const filtered = customerDirectory.filter(c => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.phone.includes(q);
    }
    return true;
  });

  return (
    <div id="admin-customer-manager" className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-medium text-white">Customer CRM Directory</h1>
          <p className="text-xs text-[#A89887]">Track guest loyalty, lifetime spending, and repeat patrons</p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3 py-1.5 rounded-full bg-[#1C130E] border border-[#332218]">
          Total Patrons: {customerDirectory.length}
        </span>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-[#1C130E] border border-[#332218]">
        <div className="relative">
          <Search className="w-4 h-4 text-[#A89887] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patron by name or mobile number..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#2A1E17] border border-[#433024] text-xs text-white placeholder-[#7A6759] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* CRM Table */}
      <div className="rounded-3xl bg-[#1C130E] border border-[#332218] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#2D1E16] bg-[#241A15] text-[#C4B099] font-mono uppercase">
                <th className="p-4">Guest Name</th>
                <th className="p-4">Mobile & WhatsApp</th>
                <th className="p-4">Loyalty Tier</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">Last Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D1E16] text-[#FAF7F2]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-xs text-[#A89887]">
                    No customer records found.
                  </td>
                </tr>
              ) : (
                filtered.map((c, idx) => (
                  <tr key={idx} className="hover:bg-[#231710] transition-colors">
                    
                    <td className="p-4">
                      <strong className="text-white text-sm block font-serif">{c.name}</strong>
                      {c.email && <span className="text-[10px] text-[#A89887] block">{c.email}</span>}
                    </td>

                    <td className="p-4 font-mono">
                      <a href={`tel:${c.phone}`} className="text-[#D4AF37] hover:underline">
                        {c.phone}
                      </a>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        c.tier === 'VIP'
                          ? 'bg-[#D4AF37] text-[#140D09]'
                          : c.tier === 'Regular'
                          ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                          : 'bg-[#2A1E17] text-[#A89887]'
                      }`}>
                        {c.tier}
                      </span>
                    </td>

                    <td className="p-4 font-mono font-bold text-white">
                      {c.totalOrders}
                    </td>

                    <td className="p-4 font-mono font-bold text-white text-sm">
                      ₹{c.lifetimeSpend.toLocaleString()}
                    </td>

                    <td className="p-4 font-mono text-[#A89887]">
                      {new Date(c.lastOrderDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
