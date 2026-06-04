import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import GalleryCard from '../components/GalleryCard';
import Footer from '../components/Footer';
import API from '../api/axios';

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
  return match ? match[1] : null;
}

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/gallery')
      .then((res) => {
        if (res.data) setItems(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const filtered = filter === 'all' ? items : items.filter((i) => i.type === filter);

  return (
    <main className="bg-brand-black pt-20">
      {/* Hero */}
      <section
        className="relative py-24 flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504222490345-c075b7b7ac8c?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center">
          <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">Our Work</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-white">GALLERY</h1>
          <div className="red-line-center" />
          <p className="text-brand-text-gray font-body max-w-xl mx-auto">
            See our work in action — quality craftsmanship in every job
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 justify-center flex-wrap mb-10">
            {['all', 'image', 'video'].map((f) => (
              <button
                key={f}
                id={`gallery-filter-${f}`}
                onClick={() => setFilter(f)}
                className={`font-heading font-semibold px-6 py-2 rounded capitalize transition-colors ${
                  filter === f
                    ? 'bg-brand-red text-white'
                    : 'bg-brand-card border border-brand-gray/30 text-brand-text-gray hover:text-brand-white hover:border-brand-red'
                }`}
              >
                {f === 'all' ? 'All' : f === 'image' ? 'Images' : 'Videos'}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="gallery-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-brand-card rounded-lg h-56 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-brand-text-gray font-body">
              No items found in this category.
            </div>
          ) : (
            <div className="gallery-grid">
              {filtered.map((item) => (
                <GalleryCard key={item._id} item={item} onClick={setModal} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <button
            id="gallery-modal-close"
            className="absolute top-4 right-4 text-white bg-brand-red rounded-full p-2 hover:bg-brand-red-hover transition-colors z-10"
            onClick={() => setModal(null)}
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
          <div
            className="relative max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {modal.type === 'video' ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(modal.url)}`}
                  title={modal.caption || 'Video'}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={modal.url}
                alt={modal.caption || 'Gallery item'}
                className="max-w-full max-h-[80vh] mx-auto rounded-lg object-contain"
              />
            )}
            {modal.caption && (
              <p className="text-brand-text-gray text-center font-body mt-3 text-sm">{modal.caption}</p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
