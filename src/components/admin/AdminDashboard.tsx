import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  Users, 
  CalendarDays, 
  TrendingUp, 
  ChefHat, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { orders, reservations, menuItems, updateOrderStatus } = useApp();

  // Calculations
  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'served');
  const activeOrders = orders.filter(o => ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status));
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const pendingReservations = reservations.filter(r => r.status === 'pending');

  // Chart Data: Hourly Volume Demo
  const hourlyData = [
    { time: '10 AM', sales: 1200, orders: 3 },
    { time: '12 PM', sales: 4800, orders: 11 },
    { time: '02 PM', sales: 3400, orders: 8 },
    { time: '04 PM', sales: 6200, orders: 15 },
    { time: '06 PM', sales: 9400, orders: 22 },
    { time: '08 PM', sales: 14200, orders: 34 },
    { time: '10 PM', sales: 7800, orders: 18 },
  ];

  const categoryDistribution = [
    { name: 'Artisanal Coffee', value: 38, color: '#D4AF37' },
    { name: 'Pâtisserie & Tiramisu', value: 26, color: '#8C6D58' },
    { name: 'Crunchwiches & Food', value: 24, color: '#E5D7C5' },
    { name: 'Matcha & Shakes', value: 12, color: '#4E6759' },
  ];

  return (
    <div id="admin-dashboard-view" className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">
            Live Restaurant Overview
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white mt-1">
            Performance Command Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('kds')}
            className="px-4 py-2 rounded-xl bg-[#2A1E17] hover:bg-[#3D2B20] text-xs font-medium text-[#FAF7F2] border border-[#433024] flex items-center gap-2"
          >
            <ChefHat className="w-4 h-4 text-[#D4AF37]" />
            <span>Open Kitchen Display</span>
          </button>
          <button
            onClick={() => onNavigate('orders')}
            className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#140D09] text-xs font-bold uppercase tracking-wider hover:bg-[#E5C358]"
          >
            Manage Orders ({activeOrders.length})
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Revenue */}
        <div className="p-5 rounded-2xl bg-[#1C130E] border border-[#332218] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#A89887]">Gross Volume</span>
            <div className="w-8 h-8 rounded-xl bg-[#2D1E16] text-[#D4AF37] flex items-center justify-center">
              ₹
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-mono text-2xl sm:text-3xl font-bold text-white">₹{totalRevenue.toLocaleString()}</h3>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +18.4% vs last week
            </span>
          </div>
        </div>

        {/* Metric 2: Active Orders */}
        <div className="p-5 rounded-2xl bg-[#1C130E] border border-[#332218] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#A89887]">In Kitchen / Active</span>
            <div className="w-8 h-8 rounded-xl bg-[#2D1E16] text-amber-400 flex items-center justify-center">
              <ChefHat className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-mono text-2xl sm:text-3xl font-bold text-white">{activeOrders.length}</h3>
            <span className="text-[11px] text-[#A89887] font-mono mt-1 block">
              {completedOrders.length} orders fulfilled today
            </span>
          </div>
        </div>

        {/* Metric 3: Avg Order Value */}
        <div className="p-5 rounded-2xl bg-[#1C130E] border border-[#332218] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#A89887]">Avg Ticket Value</span>
            <div className="w-8 h-8 rounded-xl bg-[#2D1E16] text-[#C4B099] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-mono text-2xl sm:text-3xl font-bold text-white">₹{avgOrderValue}</h3>
            <span className="text-[11px] text-[#A89887] font-mono mt-1 block">Across dine-in & delivery</span>
          </div>
        </div>

        {/* Metric 4: Pending Bookings */}
        <div className="p-5 rounded-2xl bg-[#1C130E] border border-[#332218] flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#A89887]">Table Bookings</span>
            <div className="w-8 h-8 rounded-xl bg-[#2D1E16] text-[#D4AF37] flex items-center justify-center">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-mono text-2xl sm:text-3xl font-bold text-white">{reservations.length}</h3>
            <span className="text-[11px] text-[#D4AF37] font-mono mt-1 block">
              {pendingReservations.length} pending confirmations
            </span>
          </div>
        </div>

      </div>

      {/* Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales by Hour (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#1C130E] border border-[#332218] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-medium text-white">Hourly Sales Volume</h3>
              <p className="text-xs text-[#A89887]">Peak rush at 8:00 PM Golden Hour</p>
            </div>
            <span className="text-xs font-mono text-[#D4AF37]">Salaiya Outlet</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D1E16" />
                <XAxis dataKey="time" stroke="#7A6759" fontSize={11} />
                <YAxis stroke="#7A6759" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#140D09', borderColor: '#433024', borderRadius: '12px', color: '#fff' }} 
                />
                <Area type="monotone" dataKey="sales" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#1C130E] border border-[#332218] space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-medium text-white">Sales Distribution</h3>
            <p className="text-xs text-[#A89887]">Breakdown by product segment</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#140D09', borderColor: '#433024', borderRadius: '12px', color: '#fff' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#2D1E16]">
            {categoryDistribution.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-[#C4B099]">{cat.name}</span>
                </div>
                <span className="font-mono text-white font-semibold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Live Orders Requiring Action */}
      <div className="p-6 rounded-3xl bg-[#1C130E] border border-[#332218] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-medium text-white">Live Kitchen Orders Queue</h3>
            <p className="text-xs text-[#A89887]">Click status buttons to advance workflow</p>
          </div>
          <button
            onClick={() => onNavigate('orders')}
            className="text-xs font-mono text-[#D4AF37] hover:underline"
          >
            View All ({orders.length}) →
          </button>
        </div>

        {activeOrders.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#A89887]">
            No pending orders in queue right now. Kitchen is clear.
          </div>
        ) : (
          <div className="divide-y divide-[#2D1E16]">
            {activeOrders.slice(0, 5).map((ord) => (
              <div key={ord.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">{ord.orderNumber}</span>
                    <span className="px-2 py-0.5 rounded bg-[#2D1E16] text-[#D4AF37] text-[10px] font-mono uppercase">
                      {ord.orderType} {ord.customer.tableNumber ? `• ${ord.customer.tableNumber}` : ''}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                      ord.status === 'pending' ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#C4B099] mt-1">
                    {ord.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white mr-2">₹{ord.total}</span>
                  
                  {ord.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'confirmed')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold"
                    >
                      Accept
                    </button>
                  )}
                  {ord.status === 'confirmed' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'preparing')}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
                    >
                      Start Prep
                    </button>
                  )}
                  {ord.status === 'preparing' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'ready')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                    >
                      Mark Ready
                    </button>
                  )}
                  {ord.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'completed')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
