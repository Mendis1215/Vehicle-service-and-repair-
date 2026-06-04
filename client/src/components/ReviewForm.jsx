import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import API from '../api/axios';

export default function ReviewForm({ onSuccess }) {
  const [form, setForm] = useState({ customerName: '', rating: 0, comment: '' });
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rating) return toast.error('Please select a star rating');
    if (!form.customerName.trim() || !form.comment.trim()) return toast.error('Please fill all fields');
    setLoading(true);
    try {
      await API.post('/reviews', form);
      toast.success('Review submitted! It will appear after approval.');
      setForm({ customerName: '', rating: 0, comment: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-brand-card border border-brand-gray/30 rounded-lg p-6 space-y-4">
      <h3 className="font-heading text-xl text-brand-white">SHARE YOUR EXPERIENCE</h3>
      <div className="red-line" />
      <div>
        <label className="text-brand-text-gray text-sm font-body mb-1 block">Your Name *</label>
        <input
          id="review-name"
          type="text"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          className="w-full bg-brand-gray border border-brand-gray/50 rounded px-4 py-2 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red"
          placeholder="Enter your name"
          required
        />
      </div>
      <div>
        <label className="text-brand-text-gray text-sm font-body mb-1 block">Rating *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              id={`star-${star}`}
              onClick={() => setForm({ ...form, rating: star })}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-110"
            >
              <FaStar size={28} className={(hover || form.rating) >= star ? 'star' : 'text-brand-gray'} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-brand-text-gray text-sm font-body mb-1 block">Your Review *</label>
        <textarea
          id="review-comment"
          rows={4}
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="w-full bg-brand-gray border border-brand-gray/50 rounded px-4 py-2 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red resize-none"
          placeholder="Tell us about your experience..."
          required
        />
      </div>
      <button
        id="submit-review-btn"
        type="submit"
        disabled={loading}
        className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-heading font-semibold py-3 rounded transition-colors disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'SUBMIT REVIEW'}
      </button>
    </form>
  );
}
