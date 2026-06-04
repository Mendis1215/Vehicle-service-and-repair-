import { FaPlay, FaExpand } from 'react-icons/fa';

export default function GalleryCard({ item, onClick }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-pointer group bg-brand-card border border-brand-gray/20 hover:border-brand-red/40 transition-colors"
      onClick={() => onClick(item)}
    >
      <div className="relative h-56">
        <img
          src={item.thumbnailUrl || item.url}
          alt={item.caption || 'Gallery item'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.type === 'video' ? (
              <FaPlay className="text-white" size={40} />
            ) : (
              <FaExpand className="text-white" size={30} />
            )}
          </div>
        </div>
        {item.type === 'video' && (
          <div className="absolute top-3 right-3 bg-brand-red text-white text-xs px-2 py-1 rounded font-body">
            VIDEO
          </div>
        )}
      </div>
      {item.caption && (
        <p className="text-brand-text-gray text-sm font-body p-3 truncate">{item.caption}</p>
      )}
    </div>
  );
}
