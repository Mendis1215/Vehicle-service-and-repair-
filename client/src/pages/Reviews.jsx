import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import Footer from '../components/Footer';
import API from '../api/axios';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    setLoading(true);
    API.get('/reviews')
      .then((res) => setReviews(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, []);


  return (
    <main className="bg-brand-black pt-20">
      {/* Hero */}
      <section
        className="relative py-24 flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center">
          <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">What Customers Say</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-white">REVIEWS</h1>
          <div className="red-line-center" />
          <p className="text-brand-text-gray font-body max-w-xl mx-auto">
            Honest feedback from our valued customers
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4">
          {/* Review Form */}
          <div className="max-w-xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl text-brand-white">WRITE A REVIEW</h2>
              <div className="red-line-center" />
            </div>
            <ReviewForm onSuccess={fetchReviews} />
          </div>

          {/* Reviews Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-brand-card rounded-lg h-40 animate-pulse border border-brand-gray/20" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16 text-brand-text-gray font-body mb-8">
              <p className="text-xl mb-2">No reviews yet</p>
              <p>Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {reviews.map((r) => <ReviewCard key={r._id} review={r} />)}
            </div>
          )}


        </div>
      </section>

      <Footer />
    </main>
  );
}
