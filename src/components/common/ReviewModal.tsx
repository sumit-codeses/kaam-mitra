import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, X, Check, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';

export const ReviewModal: React.FC = () => {
  const { reviewModal, closeReviewModal, submitReview } = useApp();
  const { t, language } = useLanguage();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('Excellent work experience! On-time and dedicated.');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Punctual', 'Skilled']);

  if (!reviewModal.isOpen || !reviewModal.targetUser) return null;

  const target = reviewModal.targetUser;

  const availableTags =
    target.role === 'worker'
      ? ['Punctual', 'Hardworking', 'Master Skilled', 'Polite', 'Brought Own Tools', 'Fair Work']
      : ['On-time Payment', 'Polite Behavior', 'Good Site Condition', 'Respectful', 'Safe Environment'];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview(reviewModal.jobId, rating, comment, selectedTags);
  };

  return (
    <div
      id="review-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
      >
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-5 relative">
          <button
            id="close-review-modal"
            onClick={closeReviewModal}
            className="absolute top-4 right-4 p-1 rounded-full text-white/80 hover:text-white hover:bg-black/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 mb-1 text-amber-100 font-semibold text-xs">
            <Award className="w-4 h-4" />
            <span>{language === 'hi' ? 'काम का अनुभव साझा करें' : 'Experience Rating'}</span>
          </div>
          <h3 className="text-xl font-bold">{t('rateYourExperience', 'Rate your experience')}</h3>
          <p className="text-xs text-amber-100 mt-0.5">
            {target.name} ({target.role === 'worker' ? 'Worker' : 'Employer'})
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Star Rating Interactive */}
          <div className="text-center">
            <p className="text-xs font-bold uppercase text-slate-400 mb-2">
              {language === 'hi' ? 'स्टार रेटिंग चुनें' : 'Select Star Rating'}
            </p>
            <div className="flex justify-center items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  id={`star-btn-${star}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-hidden"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-amber-600 mt-2">
              {rating === 5 && '⭐⭐⭐⭐⭐ Outstanding / बहुत बढ़िया'}
              {rating === 4 && '⭐⭐⭐⭐ Very Good / अच्छा काम'}
              {rating === 3 && '⭐⭐⭐ Average / ठीक-ठाक'}
              {rating === 2 && '⭐⭐ Below Expectation / सुधार की जरूरत'}
              {rating === 1 && '⭐ Poor Experience / असंतोषजनक'}
            </p>
          </div>

          {/* Quick Quality Tags */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
              {language === 'hi' ? 'मुख्य विशेषताएं' : 'Highlights'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  id={`review-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition border flex items-center gap-1 ${
                    selectedTags.includes(tag)
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {selectedTags.includes(tag) && <Check className="w-3 h-3 text-amber-600" />}
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Review Textarea */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              {language === 'hi' ? 'समीक्षा / टिप्पणी' : 'Comments & Feedback'}
            </label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'काम की गुणवत्ता, समय की पाबंदी और व्यवहार के बारे में लिखें...'
                  : 'Write honest feedback about punctuality, skill and conduct...'
              }
              className="w-full p-3 rounded-2xl border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-xs font-medium resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              id="skip-review-btn"
              onClick={closeReviewModal}
              className="py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition"
            >
              {t('skip', 'Skip')}
            </button>
            <button
              type="submit"
              id="submit-review-btn"
              className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition"
            >
              {t('submitReview', 'Submit Review')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
