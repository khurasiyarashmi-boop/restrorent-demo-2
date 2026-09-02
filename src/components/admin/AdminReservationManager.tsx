import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Reservation, ReservationStatus } from '../../types';
import { 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  Search, 
  Check, 
  X, 
  Utensils 
} from 'lucide-react';

export const AdminReservationManager: React.FC = () => {
  const { reservations, updateReservationStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReservations = reservations.filter((r) => {
    if (filterStatus !== 'All' && r.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.name.toLowerCase().includes(q);
      const matchPhone = r.phone.includes(q);
      const matchCode = r.reservationCode.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchCode) return false;
    }
    return true;
  });

  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case 'Confirmed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/40">Confirmed</span>;
      case 'Seated':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-950 text-blue-400 border border-blue-500/40">Seated at Table</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-gray-800 text-gray-400">Completed</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-red-950 text-red-400 border border-red-500/40">Cancelled</span>;
      case 'Pending Review':
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-950 text-amber-400 border border-amber-500/40">Pending Review</span>;
    }
  };

  return (
    <div id="admin-reservations-manager" className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-medium text-white">Table Reservations & Concierge</h1>
          <p className="text-xs text-[#A89887]">Manage indoor seating, garden patio & mezzanine bookings</p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3 py-1.5 rounded-full bg-[#1C130E] border border-[#332218]">
          Total Bookings: {reservations.length}
        </span>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#1C130E] border border-[#332218] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A89887] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Code, Guest Name, Phone..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#2A1E17] border border-[#433024] text-xs text-white placeholder-[#7A6759] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto scrollbar-none">
          {['All', 'Confirmed', 'Seated', 'Completed', 'Cancelled'].map((tab) => (
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

      {/* Reservations Table */}
      <div className="rounded-3xl bg-[#1C130E] border border-[#332218] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#2D1E16] bg-[#241A15] text-[#C4B099] font-mono uppercase">
                <th className="p-4">Code & Date</th>
                <th className="p-4">Time & Guests</th>
                <th className="p-4">Guest Details</th>
                <th className="p-4">Seating Area</th>
                <th className="p-4">Notes / Occasion</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Concierge Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D1E16] text-[#FAF7F2]">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-xs text-[#A89887]">
                    No table reservations found.
                  </td>
                </tr>
              ) : (
                filteredReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-[#231710] transition-colors">
                    
                    {/* Code & Date */}
                    <td className="p-4 font-mono">
                      <strong className="text-[#D4AF37] block text-sm">{res.reservationCode}</strong>
                      <span className="text-[10px] text-[#A89887] flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{res.date}</span>
                      </span>
                    </td>

                    {/* Time & Guests */}
                    <td className="p-4">
                      <span className="font-semibold block text-white flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        <span>{res.timeSlot}</span>
                      </span>
                      <span className="text-[10px] text-[#A89887] flex items-center gap-1 mt-0.5">
                        <Users className="w-3 h-3" />
                        <span>{res.guests} Guests</span>
                      </span>
                    </td>

                    {/* Guest Details */}
                    <td className="p-4">
                      <span className="font-semibold block text-white">{res.name}</span>
                      <span className="text-[10px] text-[#A89887] font-mono block">{res.phone}</span>
                      <span className="text-[10px] text-[#7A6759] truncate block max-w-[140px]">{res.email}</span>
                    </td>

                    {/* Seating Area */}
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-[#2A1E17] text-white text-[11px] font-medium border border-[#3D2B20]">
                        {res.seatingArea}
                      </span>
                      {res.tableAssigned && (
                        <span className="text-[10px] font-mono text-[#D4AF37] block mt-1">
                          Assigned: {res.tableAssigned}
                        </span>
                      )}
                    </td>

                    {/* Occasion / Notes */}
                    <td className="p-4 max-w-xs">
                      {res.occasion && (
                        <span className="text-[11px] font-semibold text-[#D4AF37] block">
                          🎉 {res.occasion}
                        </span>
                      )}
                      {res.specialRequests && (
                        <span className="text-[10px] text-[#A89887] italic block mt-0.5">
                          "{res.specialRequests}"
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {getStatusBadge(res.status)}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {res.status === 'Confirmed' && (
                          <button
                            onClick={() => updateReservationStatus(res.id, 'Seated', 'Table 04')}
                            className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold"
                          >
                            Seat Guests
                          </button>
                        )}
                        {res.status === 'Seated' && (
                          <button
                            onClick={() => updateReservationStatus(res.id, 'Completed')}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold"
                          >
                            Finished
                          </button>
                        )}
                        {res.status !== 'Cancelled' && res.status !== 'Completed' && (
                          <button
                            onClick={() => updateReservationStatus(res.id, 'Cancelled')}
                            className="px-2 py-1 rounded bg-red-950/60 hover:bg-red-900/60 text-red-300 text-[11px] font-semibold border border-red-500/20"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
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
