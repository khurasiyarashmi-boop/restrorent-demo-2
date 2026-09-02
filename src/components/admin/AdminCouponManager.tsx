import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Coupon } from '../../types';
import { Plus, Tag, Trash2, Check, X } from 'lucide-react';

export const AdminCouponManager: React.FC = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useApp();
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState(20);
  const [minOrderValue, setMinOrderValue] = useState(300);
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('2026-12-31');

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      discountType: type,
      discountValue: Number(value),
      minOrderValue: Number(minOrderValue),
      expiryDate,
      isActive: true,
      description: description.trim() || `${value}% discount voucher`
    });

    setCode('');
    setValue(20);
    setDescription('');
  };

  const handleToggleActive = (id: string, current: boolean) => {
    updateCoupon(id, { isActive: !current });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this coupon code?')) {
      deleteCoupon(id);
    }
  };

  return (
    <div id="admin-coupon-manager" className="space-y-6">
      
      <div>
        <h1 className="font-serif text-2xl font-medium text-white">Coupons & Promotional Codes</h1>
        <p className="text-xs text-[#A89887]">Create discount vouchers for checkout campaigns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#1C130E] border border-[#332218] space-y-4">
          <h3 className="font-serif text-lg font-medium text-white">Create Promo Code</h3>

          <form onSubmit={handleAddCoupon} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. YECHA20"
                className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white uppercase font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#A89887] uppercase font-mono mb-1">Discount Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Flat Amount (₹)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#A89887] uppercase font-mono mb-1">Value *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#A89887] uppercase font-mono mb-1">Min Order (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={minOrderValue}
                  onChange={(e) => setMinOrderValue(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[#A89887] uppercase font-mono mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A89887] uppercase font-mono mb-1">Description / Tagline</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 20% off on artisanal coffee"
                className="w-full p-2.5 rounded-xl bg-[#2A1E17] border border-[#433024] text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-[#140D09] font-bold uppercase tracking-wider hover:bg-[#E5C358]"
            >
              Create Coupon
            </button>
          </form>
        </div>

        {/* Coupons List (8 Cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#1C130E] border border-[#332218] p-6 space-y-4">
          <h3 className="font-serif text-lg font-medium text-white">Active Promo Vouchers ({coupons.length})</h3>

          <div className="divide-y divide-[#2D1E16]">
            {coupons.map((cpn) => (
              <div key={cpn.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2A1E17] text-[#D4AF37] flex items-center justify-center font-mono font-bold">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white tracking-wider">{cpn.code}</span>
                      <span className="px-2 py-0.5 rounded bg-[#2D1E16] text-[#D4AF37] text-[10px] font-mono font-bold">
                        {cpn.discountType === 'percentage' ? `${cpn.discountValue}% OFF` : `₹${cpn.discountValue} OFF`}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A89887] block mt-0.5">
                      Min Order ₹{cpn.minOrderValue} • Expires {cpn.expiryDate} • {cpn.description}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleActive(cpn.id, cpn.isActive)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                      cpn.isActive
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {cpn.isActive ? 'Active' : 'Disabled'}
                  </button>

                  <button
                    onClick={() => handleDelete(cpn.id)}
                    className="p-1.5 rounded-lg bg-[#2A1E17] text-[#A89887] hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
