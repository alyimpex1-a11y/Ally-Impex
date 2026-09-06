import React, { useState } from 'react';
import { CustomerReview } from '../types';
import { 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquarePlus, 
  ThumbsUp, 
  Globe2, 
  X, 
  Send 
} from 'lucide-react';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: Omit<CustomerReview, 'id' | 'date'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newCountry, setNewCountry] = useState('United States');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('Apex Pro Cordura 600D Jacket');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    onAddReview({
      author: newAuthor,
      role: 'Verified Buyer',
      company: newCompany || 'Independent Retailer',
      country: newCountry,
      countryCode: newCountry.slice(0, 2).toUpperCase(),
      rating: newRating,
      title: newTitle || 'Excellent Quality & Safe Export Logistics',
      comment: newComment,
      verifiedBuyer: true,
      productPurchased: newProduct
    });

    setModalOpen(false);
    setNewAuthor('');
    setNewCompany('');
    setNewTitle('');
    setNewComment('');
  };

  return (
    <section id="reviews-section" className="py-16 bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Trust Metrics */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-xs text-blue-700 font-semibold mb-3 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
              <span>International Client Satisfaction</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight font-['Helvetica_Neue',Arial,sans-serif]">
              Trusted by Motorcycle Gear Brands Worldwide
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Authentic reviews from distributors, importers, and brand owners who source custom CE-certified protective apparel from Ally Impex in Sialkot.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-center shadow-xs">
              <span className="text-2xl font-bold text-blue-600 font-['Helvetica_Neue',Arial,sans-serif]">4.9 / 5</span>
              <div className="flex justify-center my-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Average Export Rating</span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              id="write-review-btn"
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold px-4 py-3 rounded-lg text-xs flex items-center space-x-2 shadow-xs transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-blue-600" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-white border border-slate-200 border-l-4 border-l-blue-600 flex flex-col justify-between space-y-4 hover:shadow-md transition-all shadow-xs"
            >
              <div className="space-y-3">
                
                {/* Rating & Verified Buyer Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {rev.verifiedBuyer && (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified B2B Buyer</span>
                    </span>
                  )}
                </div>

                {/* Review Title & Body */}
                <h4 className="text-base font-bold text-slate-900 leading-snug font-['Helvetica_Neue',Arial,sans-serif]">
                  "{rev.title}"
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic bg-slate-50/80 p-3 rounded-lg border border-slate-100">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Product metadata */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{rev.author}</p>
                  <p className="text-slate-500 text-[11px]">
                    {rev.company} • <span className="text-blue-600 font-semibold">{rev.country}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Product Procured:</span>
                  <span className="text-[11px] text-slate-700 font-semibold font-mono">{rev.productPurchased}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 text-slate-900">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Share Your Buyer Feedback</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Your Name *</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Thomas Bauer"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Company / Brand & Country *</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="Company name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    required
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    placeholder="Country"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Product Evaluated</label>
                <input
                  type="text"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  placeholder="e.g. Cordura Riding Jacket"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Star Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Review Headline</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Flawless stitch quality & fast export shipment"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Detailed Comments *</label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Describe the fabric durability, CE compliance, communication with export team..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-2 text-slate-500 hover:text-slate-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
