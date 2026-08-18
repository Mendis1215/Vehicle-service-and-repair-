import { useEffect, useState } from 'react';
import { FaComments, FaImages, FaTools, FaEnvelope, FaCheck, FaEyeSlash, FaTrash, FaPlus, FaEdit, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import AdminSidebar from '../components/AdminSidebar';
import API from '../api/axios';

// ─── Stats Tab ────────────────────────────────────────────────────────────────
function StatsTab() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get('/admin/stats')
      .then((res) => {
        const d = res.data;
        setStats({
          totalReviews: d.totalReviews,
          pendingReviews: d.pendingReviews,
          approvedReviews: d.approvedReviews,
          galleryItems: d.galleryCount,
          services: d.serviceCount,
          messages: d.contactCount,
        });
      })
      .catch(() => { });
  }, []);

  const cards = stats
    ? [
      { label: 'Total Reviews', value: stats.totalReviews, icon: FaComments, color: 'text-blue-400' },
      { label: 'Pending Reviews', value: stats.pendingReviews, icon: FaComments, color: 'text-yellow-400' },
      { label: 'Approved Reviews', value: stats.approvedReviews, icon: FaCheck, color: 'text-green-400' },
      { label: 'Gallery Items', value: stats.galleryItems, icon: FaImages, color: 'text-purple-400' },
      { label: 'Services', value: stats.services, icon: FaTools, color: 'text-brand-red' },
      { label: 'Messages', value: stats.messages, icon: FaEnvelope, color: 'text-orange-400' },
    ]
    : [];

  return (
    <div>
      <h2 className="font-heading text-2xl text-brand-white mb-6">DASHBOARD OVERVIEW</h2>
      {!stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-brand-card rounded-lg h-28 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-brand-card border border-brand-gray/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-brand-text-gray font-body text-sm">{label}</p>
                <Icon className={color} size={20} />
              </div>
              <p className="font-heading text-4xl font-bold text-brand-white">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Reviews Tab ──────────────────────────────────────────────────────────────
function ReviewsTab() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    setLoading(true);
    API.get('/admin/reviews')
      .then((res) => setReviews(res.data || []))
      .catch(() => toast.error('Failed to load reviews'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchReviews, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/reviews/${id}`, { status });
      toast.success(`Review ${status}`);
      fetchReviews();
    } catch {
      toast.error('Failed to update review');
    }
  };

  const deleteReview = async (id) => {
    if (!confirm('Delete this review?')) return;
    try {
      await API.delete(`/admin/reviews/${id}`);
      toast.success('Review deleted');
      fetchReviews();
    } catch {
      toast.error('Failed to delete review');
    }
  };

  return (
    <div>
      <h2 className="font-heading text-2xl text-brand-white mb-6">MANAGE REVIEWS</h2>
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-brand-card rounded-lg h-16 animate-pulse" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-brand-text-gray font-body text-center py-10">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full font-body text-sm">
            <thead>
              <tr className="border-b border-brand-gray/30 text-brand-text-gray text-left">
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Rating</th>
                <th className="py-3 pr-4">Comment</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r._id} className="border-b border-brand-gray/20 hover:bg-brand-gray/10">
                  <td className="py-3 pr-4 text-brand-white font-semibold whitespace-nowrap">{r.customerName}</td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FaStar key={s} size={12} className={s <= r.rating ? 'star' : 'text-brand-gray'} />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-brand-text-gray max-w-xs truncate">{r.comment}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${r.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      r.status === 'hidden' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                      {r.status || 'pending'}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        title="Approve"
                        onClick={() => updateStatus(r._id, 'approved')}
                        className="p-1.5 bg-green-500/20 hover:bg-green-500/40 text-green-400 rounded transition-colors"
                      >
                        <FaCheck size={12} />
                      </button>
                      <button
                        title="Hide"
                        onClick={() => updateStatus(r._id, 'hidden')}
                        className="p-1.5 bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 rounded transition-colors"
                      >
                        <FaEyeSlash size={12} />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => deleteReview(r._id)}
                        className="p-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded transition-colors"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Gallery Tab ──────────────────────────────────────────────────────────────
function GalleryTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ type: 'image', url: '', caption: '' });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    API.get('/gallery')
      .then((res) => setItems(res.data || []))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  useEffect(fetchItems, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!file && form.type === 'image' && !form.url.trim()) return toast.error('File or URL is required');
    if (!file && form.type === 'video' && !form.url.trim()) return toast.error('File or YouTube URL is required');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('type', form.type);
      if (form.caption) formData.append('caption', form.caption);

      if (file) {
        formData.append('image', file);
      } else {
        if (form.type === 'video') formData.append('youtubeUrl', form.url);
        else formData.append('url', form.url);
      }

      await API.post('/admin/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Gallery item added');
      setForm({ type: 'image', url: '', caption: '' });
      setFile(null);
      const fileInput = document.getElementById('gallery-file-input');
      if (fileInput) fileInput.value = '';
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to add item');
    } finally {
      setUploading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this gallery item?')) return;
    try {
      await API.delete(`/admin/gallery/${id}`);
      toast.success('Item deleted');
      fetchItems();
    } catch {
      toast.error('Failed to delete item');
    }
  };

  return (
    <div>
      <h2 className="font-heading text-2xl text-brand-white mb-6">MANAGE GALLERY</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-brand-card border border-brand-gray/30 rounded-lg p-5 mb-8 space-y-4">
        <h3 className="font-heading text-lg text-brand-white">ADD NEW ITEM</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-brand-text-gray text-xs font-body mb-1 block">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full bg-brand-dark border border-brand-gray/50 rounded px-3 py-2 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red"
            >
              <option value="image">Image</option>
              <option value="video">YouTube Video</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-brand-text-gray text-xs font-body mb-1 block">
              {form.type === 'video' ? 'Video File (MP4) or YouTube URL' : 'Image File (PNG/JPG) or URL'}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="gallery-file-input"
                type="file"
                accept={form.type === 'video' ? 'video/mp4' : 'image/png, image/jpeg, image/webp'}
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full bg-brand-dark border border-brand-gray/50 rounded px-2 py-1.5 text-brand-text-gray font-body text-sm focus:outline-none focus:border-brand-red flex-1"
              />
              <span className="text-brand-text-gray self-center text-xs">OR</span>
              <input
                id="gallery-url-input"
                type="text"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full bg-brand-dark border border-brand-gray/50 rounded px-3 py-2 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red flex-1"
                placeholder={form.type === 'video' ? 'https://www.youtube.com/watch?v=...' : 'https://...'}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label className="text-brand-text-gray text-xs font-body mb-1 block">Caption (optional)</label>
            <input
              id="gallery-caption-input"
              type="text"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="w-full bg-brand-dark border border-brand-gray/50 rounded px-3 py-2 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red"
              placeholder="Caption..."
            />
          </div>
        </div>
        <button
          id="gallery-add-btn"
          type="submit"
          disabled={uploading}
          className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white font-heading font-semibold px-5 py-2 rounded transition-colors disabled:opacity-50"
        >
          <FaPlus size={12} /> {uploading ? 'Adding...' : 'ADD ITEM'}
        </button>
      </form>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-brand-card rounded-lg h-40 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="relative group rounded-lg overflow-hidden bg-brand-card border border-brand-gray/20">
              <img
                src={item.thumbnailUrl || item.url}
                alt={item.caption || 'Gallery'}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center">
                <button
                  onClick={() => deleteItem(item._id)}
                  className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all"
                >
                  <FaTrash size={14} />
                </button>
              </div>
              {item.caption && (
                <p className="text-brand-text-gray text-xs font-body p-2 truncate">{item.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Services Tab ─────────────────────────────────────────────────────────────
function ServicesTab() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchServices = () => {
    setLoading(true);
    API.get('/services')
      .then((res) => setServices(res.data || []))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  useEffect(fetchServices, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      if (file) {
        formData.append('image', file);
      } else if (form.imageUrl) {
        formData.append('imageUrl', form.imageUrl);
      }

      const headers = { 'Content-Type': 'multipart/form-data' };
      if (editId) {
        await API.put(`/admin/services/${editId}`, formData, { headers });
        toast.success('Service updated');
        setEditId(null);
      } else {
        await API.post('/admin/services', formData, { headers });
        toast.success('Service added');
      }
      setForm({ title: '', description: '', imageUrl: '' });
      setFile(null);
      const fileInput = document.getElementById('service-file-input');
      if (fileInput) fileInput.value = '';
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await API.delete(`/admin/services/${id}`);
      toast.success('Service deleted');
      fetchServices();
    } catch {
      toast.error('Failed to delete service');
    }
  };

  const startEdit = (s) => {
    setEditId(s._id);
    setForm({ title: s.title, description: s.description, imageUrl: s.imageUrl || '' });
  };

  return (
    <div>
      <h2 className="font-heading text-2xl text-brand-white mb-6">MANAGE SERVICES</h2>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-brand-card border border-brand-gray/30 rounded-lg p-5 mb-8 space-y-4">
        <h3 className="font-heading text-lg text-brand-white">{editId ? 'EDIT SERVICE' : 'ADD NEW SERVICE'}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-brand-text-gray text-xs font-body mb-1 block">Title</label>
            <input
              id="service-title-input"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-brand-dark border border-brand-gray/50 rounded px-3 py-2 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red"
              placeholder="Service title"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-brand-text-gray text-xs font-body mb-1 block">Image File (PNG/JPG) or URL</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="service-file-input"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full bg-brand-dark border border-brand-gray/50 rounded px-2 py-1.5 text-brand-text-gray font-body text-sm focus:outline-none focus:border-brand-red flex-1"
              />
              <span className="text-brand-text-gray self-center text-xs">OR</span>
              <input
                id="service-image-input"
                type="text"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full bg-brand-dark border border-brand-gray/50 rounded px-3 py-2 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red flex-1"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="text-brand-text-gray text-xs font-body mb-1 block">Description</label>
            <textarea
              id="service-desc-input"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-brand-dark border border-brand-gray/50 rounded px-3 py-2 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red resize-none"
              placeholder="Service description..."
              required
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            id="service-save-btn"
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white font-heading font-semibold px-5 py-2 rounded transition-colors disabled:opacity-50"
          >
            <FaPlus size={12} /> {saving ? 'Saving...' : editId ? 'UPDATE' : 'ADD SERVICE'}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => { setEditId(null); setForm({ title: '', description: '', imageUrl: '' }); }}
              className="px-5 py-2 bg-brand-gray text-brand-text-gray rounded font-body text-sm hover:bg-brand-gray/70"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-brand-card rounded-lg h-16 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s._id} className="flex items-center gap-4 bg-brand-card border border-brand-gray/30 rounded-lg p-4">
              {s.imageUrl && (
                <img src={s.imageUrl} alt={s.title} className="w-16 h-12 object-cover rounded" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-heading text-brand-white font-semibold">{s.title}</p>
                <p className="text-brand-text-gray font-body text-sm truncate">{s.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(s)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 rounded transition-colors"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => deleteService(s._id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded transition-colors"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Messages Tab ─────────────────────────────────────────────────────────────
function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/contacts')
      .then((res) => setMessages(res.data || []))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  }, []);

  const deleteMsg = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await API.put(`/admin/contacts/${id}/read`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success('Message marked as read');
    } catch {
      toast.error('Failed to update message');
    }
  };

  return (
    <div>
      <h2 className="font-heading text-2xl text-brand-white mb-6">CONTACT MESSAGES</h2>
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-brand-card rounded-lg h-24 animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <p className="text-brand-text-gray font-body text-center py-10">No messages found.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m._id} className="bg-brand-card border border-brand-gray/30 rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-heading text-brand-white font-semibold">{m.name}</p>
                  <div className="flex gap-4 text-brand-text-gray font-body text-xs mt-0.5">
                    <span>{m.email}</span>
                    {m.phone && <span>{m.phone}</span>}
                    <span>{new Date(m.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteMsg(m._id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded transition-colors"
                >
                  <FaTrash size={12} />
                </button>
              </div>
              <p className="text-brand-red font-body text-sm font-semibold mb-1">
                {m.subject}
              </p>
              <p className="text-brand-text-gray font-body text-sm leading-relaxed">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');

  const renderTab = () => {
    switch (activeTab) {
      case 'stats': return <StatsTab />;
      case 'reviews': return <ReviewsTab />;
      case 'gallery': return <GalleryTab />;
      case 'services': return <ServicesTab />;
      case 'messages': return <MessagesTab />;
      default: return <StatsTab />;
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-black">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderTab()}
      </main>
    </div>
  );
}
