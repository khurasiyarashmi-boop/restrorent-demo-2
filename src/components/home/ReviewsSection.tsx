import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Review } from '../../types';
import { Star, Quote, CheckCircle2, MessageSquarePlus, X, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ReviewsSection: React.FC = () => {
  const { reviews = [], addReview } = useApp();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');
  
  // Review form state
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [tagline, setTagline] = useState('');
  const [recommendedDish, setRecommendedDish] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const reviewList = reviews || [];

  const filteredReviews = reviewList.filter(rev => {
    if (selectedRatingFilter === 'all') return true;
    return rev.rating === selectedRatingFilter;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview({
      author: name.trim(),
      rating,
      comment: comment.trim(),
      favoriteItem: recommendedDish.trim() || tagline.trim() || undefined,
      userCity: 'Bhopal'
    });

    setName('');
    setComment('');
    setTagline('');
    setRecommendedDish('');
    setShowReviewModal(false);
  };

  return (
    <section 
      id="reviews-section"
      className="py-28 bg-[#100905] text-[#FAF7F2] border-b border-[#2D1B11] relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#100905]"
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C120B] text-[#D4AF37] text-xs font-mono tracking-widest uppercase mb-4 border border-[#D4AF37]/30 shadow-lg">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span>4.9 / 5.0 Rating • 40+ Verified Reviews</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.1]">
              Echoes of Devotion.<br />
              <span className="italic font-light text-[#E5C378]">Loved by Bhopal Connoisseurs.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#C4B3A3] font-light mt-3 max-w-lg leading-relaxed">
              Authentic stories and impressions shared by our patrons who visit us daily for specialty pours, celebrations, and calm work sessions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Filter pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#18100A] border border-white/10">
              <button
                onClick={() => setSelectedRatingFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedRatingFilter === 'all'
                    ? 'bg-[#D4AF37] text-[#0D0805] font-bold'
                    : 'text-[#C4B3A3] hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedRatingFilter(5)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1 ${
                  selectedRatingFilter === 5
                    ? 'bg-[#D4AF37] text-[#0D0805] font-bold'
                    : 'text-[#C4B3A3] hover:text-white'
                }`}
              >
                <span>5</span>
                <Star className="w-3 h-3 fill-current" />
              </button>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D4AF37] text-[#0D0805] text-xs font-mono font-bold uppercase tracking-wider hover:brightness-110 shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Guest Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev, idx) => {
            const authorName = rev.author || (rev as any).name || 'Guest Connoisseur';
            const favorite = rev.favoriteItem || (rev as any).recommendedDish;
            const reviewDate = rev.date || ((rev as any).createdAt ? new Date((rev as any).createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Verified Guest');

            return (
              <motion.div
                key={rev.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="p-7 sm:p-8 rounded-3xl bg-[#FAF5EE] border border-[#E8DFC8] hover:border-[#D4AF37] flex flex-col justify-between shadow-xl hover:shadow-[0_16px_45px_rgba(0,0,0,0.35)] transition-all relative group"
              >
                <Quote className="w-10 h-10 text-[#8C6D58] absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity" />

                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= rev.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-[#D8CCBD]'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-mono font-bold text-[#8C6D58] ml-1.5">{rev.rating}.0</span>
                  </div>

                  {(rev as any).tagline && (
                    <h4 className="font-serif text-base font-semibold text-[#241A15] mb-2 leading-snug">
                      "{(rev as any).tagline}"
                    </h4>
                  )}

                  <p className="text-xs sm:text-sm text-[#4A392F] font-normal leading-relaxed">
                    "{rev.comment}"
                  </p>

                  {favorite && (
                    <div className="mt-5 pt-3 border-t border-[#EAE1D5] flex items-center gap-2 text-[11px] text-[#8C6D58]">
                      <Heart className="w-3.5 h-3.5 fill-[#D4AF37]/30 text-[#D4AF37]" />
                      <span><strong className="font-mono uppercase text-[#735E4E]">Recommends:</strong> <span className="text-[#241A15] font-medium">{favorite}</span></span>
                    </div>
                  )}
                </div>

                <div className="pt-5 mt-6 border-t border-[#EAE1D5] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#241A15] text-[#FAF5EE] font-bold text-xs flex items-center justify-center font-mono shadow-sm">
                      {authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#241A15] flex items-center gap-1.5">
                        {authorName}
                        <CheckCircle2 className="w-3 h-3 text-[#8C6D58]" />
                      </h5>
                      <span className="text-[10px] text-[#8C6D58] font-mono">{rev.userCity || 'Bhopal Resident'}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#8C6D58] font-mono">
                    {reviewDate}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Submit Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#18100A] text-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/40 shadow-2xl"
            >
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-[#C4B3A3] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Guest Impressions</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-1 text-white">Share Your Yecha Journey</h3>
              <p className="text-xs text-[#C4B3A3] mb-6 font-light">
                Your feedback inspires our barista and pastry masters to keep elevating every pour and plate.
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-2">Your Star Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'text-[#D4AF37] fill-[#D4AF37]'
                              : 'text-neutral-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A89887] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Shruti Verma"
                    className="w-full p-3.5 rounded-xl bg-[#0F0A07] border border-[#2D1B11] text-xs text-white placeholder-[#5A483B] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A89887] mb-1">Headline Summary</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. The finest Tiramisu Latte in Madhya Pradesh!"
                    className="w-full p-3.5 rounded-xl bg-[#0F0A07] border border-[#2D1B11] text-xs text-white placeholder-[#5A483B] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A89887] mb-1">Your Honest Review *</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the coffee, pastry freshness, ambience, or service..."
                    className="w-full p-3.5 rounded-xl bg-[#0F0A07] border border-[#2D1B11] text-xs text-white placeholder-[#5A483B] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A89887] mb-1">Favorite Dish / Drink (Optional)</label>
                  <input
                    type="text"
                    value={recommendedDish}
                    onChange={(e) => setRecommendedDish(e.target.value)}
                    placeholder="e.g. Pistachio Matcha Latte, Pesto Toast"
                    className="w-full p-3.5 rounded-xl bg-[#0F0A07] border border-[#2D1B11] text-xs text-white placeholder-[#5A483B] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#0D0805] text-xs font-mono font-bold uppercase tracking-wider hover:brightness-110 shadow-lg transition-all"
                >
                  Publish Guest Impression
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
