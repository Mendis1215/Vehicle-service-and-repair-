import { FaWrench } from 'react-icons/fa';

const defaultImg = 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=250&fit=crop&q=80';

export default function ServiceCard({ service }) {
  return (
    <div className="card-hover bg-brand-card rounded-lg overflow-hidden border border-brand-gray/30 hover:border-brand-red/50 group">
      <div className="relative overflow-hidden h-48">
        <img
          src={service.imageUrl || defaultImg}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-brand-red/10 p-2 rounded">
            <FaWrench className="text-brand-red" size={18} />
          </div>
          <h3 className="font-heading text-lg font-semibold text-brand-white">{service.title}</h3>
        </div>
        <p className="text-brand-text-gray text-sm font-body leading-relaxed">{service.description}</p>
      </div>
    </div>
  );
}
