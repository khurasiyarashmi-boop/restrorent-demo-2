import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Reservation } from '../../types';
import { 
  CalendarDays, 
  Users, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Phone,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReservationView: React.FC = () => {
  const { createReservation, siteContent, setActivePage } = useApp();

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('18:30');
  const [guestsCount, setGuestsCount] = useState(2);
  const [seatingArea, setSeatingArea] = useState<'indoor' | 'patio' | 'lounge' | 'any'>('indoor');
  const [occasion, setOccasion] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const timeSlots = [
    '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:30 PM', 
    '05:00 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', 
    '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!guestName.trim()) {
      setErrorMessage('Please provide your name for the reservation');
      return;
    }
    if (!guestPhone.trim() || guestPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number');
      return;
    }
    if (!date) {
      setErrorMessage('Please choose a reservation date');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await createReservation({
        guestName: guestName.trim(),
        guestPhone: guestPhone.trim(),
        guestEmail: guestEmail.trim() || undefined,
        guestsCount,
        date,
        time,
        seatingArea,
        occasion: occasion || undefined,
        specialRequests: specialRequests.trim() || undefined
      });

      setConfirmedReservation(res);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#241A15', '#8C6D58']
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to confirm table booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="reservation-view" className="min-h-screen bg-[#FAF7F2] text-[#241A15] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono tracking-[0.25em] text-[#8C6D58] uppercase block mb-2">
            Yecha Hospitality
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#241A15]">
            Reserve Your Experience
          </h1>
          <p className="text-xs sm:text-sm text-[#735E4E] font-light mt-3">
            Secure your preferred table at Mahindra Business Square, Salaiya. Whether for quiet solo moments, intimate dates, or celebratory gatherings.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation State Card */
          <div className="p-8 sm:p-12 rounded-3xl bg-[#241A15] text-[#FAF7F2] border border-[#3D291E] shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#1A120D] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">Booking Confirmed</span>
              <h2 className="font-serif text-3xl font-medium text-white mt-1">We Await Your Arrival</h2>
              <p className="text-xs text-[#C4B099] max-w-md mx-auto mt-2">
                Your reservation reference is <strong className="font-mono text-white text-sm">#{confirmedReservation.id.slice(-6).toUpperCase()}</strong>. A confirmation reminder has been logged.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#332219] border border-[#4E3424] max-w-md mx-auto grid grid-cols-2 gap-4 text-xs text-left">
              <div>
                <span className="text-[#8C6D58] uppercase font-mono block text-[10px]">Guest Name</span>
                <span className="text-white font-medium">{confirmedReservation.guestName}</span>
              </div>
              <div>
                <span className="text-[#8C6D58] uppercase font-mono block text-[10px]">Party Size</span>
                <span className="text-white font-medium">{confirmedReservation.guestsCount} Guests</span>
              </div>
              <div>
                <span className="text-[#8C6D58] uppercase font-mono block text-[10px]">Date & Time</span>
                <span className="text-white font-medium">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div>
                <span className="text-[#8C6D58] uppercase font-mono block text-[10px]">Seating Area</span>
                <span className="text-white font-medium capitalize">{confirmedReservation.seatingArea} Sanctuary</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setActivePage('menu')}
                className="px-6 py-3 rounded-full bg-[#D4AF37] text-[#1A120D] text-xs font-bold uppercase tracking-wider hover:bg-[#E5C358]"
              >
                Pre-browse Digital Menu
              </button>
              <button
                onClick={() => setConfirmedReservation(null)}
                className="px-6 py-3 rounded-full bg-[#3D291E] text-[#FAF7F2] text-xs font-medium uppercase tracking-wider hover:bg-[#523829]"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* Main Reservation Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-[#F3ECE1] border border-[#E0D3C1] shadow-sm space-y-8">
            
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-950/10 border border-red-500/30 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Date & Guests & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="res-date" className="block text-xs font-medium text-[#241A15] mb-1">
                  Reservation Date *
                </label>
                <input
                  id="res-date"
                  type="date"
                  required
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] focus:outline-none focus:border-[#241A15]"
                />
              </div>

              <div>
                <label htmlFor="res-guests" className="block text-xs font-medium text-[#241A15] mb-1">
                  Number of Guests *
                </label>
                <select
                  id="res-guests"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] focus:outline-none focus:border-[#241A15]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest (Solo)' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="res-time" className="block text-xs font-medium text-[#241A15] mb-1">
                  Time Slot *
                </label>
                <select
                  id="res-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] focus:outline-none focus:border-[#241A15]"
                >
                  {timeSlots.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seating Area Selection */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-[#8C6D58] uppercase mb-2">
                Preferred Seating Ambience
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'indoor', label: 'Main Sanctuary', desc: 'Fluted travertine & jazz' },
                  { id: 'patio', label: 'Garden Patio', desc: 'Open-air green serenity' },
                  { id: 'lounge', label: 'Quiet Lounge', desc: 'Plush velvet & work booth' },
                  { id: 'any', label: 'Best Available', desc: 'First available table' },
                ].map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSeatingArea(area.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      seatingArea === area.id
                        ? 'bg-[#241A15] text-[#FAF7F2] border-[#241A15] shadow-md'
                        : 'bg-[#FAF7F2] text-[#5E4C3E] border-[#D5C6B5] hover:border-[#8C6D58]'
                    }`}
                  >
                    <span className="text-xs font-semibold block">{area.label}</span>
                    <span className="text-[10px] text-[#A89887] block mt-0.5">{area.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="res-name" className="block text-xs font-medium text-[#241A15] mb-1">
                  Primary Guest Name *
                </label>
                <input
                  id="res-name"
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Vikramaditya"
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#241A15]"
                />
              </div>

              <div>
                <label htmlFor="res-phone" className="block text-xs font-medium text-[#241A15] mb-1">
                  Contact Mobile *
                </label>
                <input
                  id="res-phone"
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="+91 98260 XXXXX"
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#241A15]"
                />
              </div>

              <div>
                <label htmlFor="res-occasion" className="block text-xs font-medium text-[#241A15] mb-1">
                  Special Occasion (Optional)
                </label>
                <select
                  id="res-occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] focus:outline-none focus:border-[#241A15]"
                >
                  <option value="">Casual Dining / Coffee</option>
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Anniversary">Anniversary / Date Night</option>
                  <option value="Business">Business Meeting</option>
                  <option value="Reunion">Family / Friends Reunion</option>
                </select>
              </div>
            </div>

            {/* Special Request Notes */}
            <div>
              <label htmlFor="res-notes" className="block text-xs font-medium text-[#241A15] mb-1">
                Special Requests or Dietary Notes (Optional)
              </label>
              <textarea
                id="res-notes"
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Quiet corner table, high chair required, gluten sensitivity..."
                className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#D5C6B5] text-xs text-[#241A15] placeholder-[#9E8B7A] focus:outline-none focus:border-[#241A15]"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-[#E0D3C1] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#735E4E]">
                <span>No reservation fee required. Table held for 15 minutes past scheduled time.</span>
              </div>

              <button
                type="submit"
                id="submit-reservation-btn"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#241A15] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider hover:bg-[#3B281C] shadow-lg transition-all active:scale-98"
              >
                {isSubmitting ? 'Confirming Reservation...' : 'Confirm Table Booking'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
