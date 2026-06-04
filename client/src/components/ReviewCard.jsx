import { FaStar, FaUser } from 'react-icons/fa';

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar key={s} size={14} className={s <= rating ? 'star' : 'text-brand-gray'} />
      ))}
    </div>
  );
}

export default function ReviewCard({ review }) {
  const date = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-brand-card border border-brand-gray/30 rounded-lg p-5 card-hover">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-brand-red/20 p-2 rounded-full">
          <FaUser className="text-brand-red" size={16} />
        </div>
        <div>
          <p className="font-heading text-brand-white font-semibold">{review.customerName}</p>
          <p className="text-brand-text-gray text-xs font-body">{date}</p>
        </div>
      </div>
      <StarRating rating={review.rating} />
      <p className="text-brand-text-gray text-sm font-body mt-3 leading-relaxed">"{review.comment}"</p>
    </div>
  );
}
