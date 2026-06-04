import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../api/axios';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/contact', form);
      toast.success('Message sent! We will contact you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-brand-text-gray text-sm font-body mb-1 block">Name *</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-brand-card border border-brand-gray/50 rounded px-4 py-3 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="text-brand-text-gray text-sm font-body mb-1 block">Email *</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-brand-card border border-brand-gray/50 rounded px-4 py-3 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-brand-text-gray text-sm font-body mb-1 block">Phone</label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-brand-card border border-brand-gray/50 rounded px-4 py-3 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red"
            placeholder="07X XXX XXXX"
          />
        </div>
        <div>
          <label className="text-brand-text-gray text-sm font-body mb-1 block">Subject *</label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full bg-brand-card border border-brand-gray/50 rounded px-4 py-3 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red"
            placeholder="How can we help?"
            required
          />
        </div>
      </div>
      <div>
        <label className="text-brand-text-gray text-sm font-body mb-1 block">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full bg-brand-card border border-brand-gray/50 rounded px-4 py-3 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red resize-none"
          placeholder="Describe your vehicle issue or service needed..."
          required
        />
      </div>
      <button
        id="contact-submit-btn"
        type="submit"
        disabled={loading}
        className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-heading font-semibold py-3 rounded transition-colors disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'SEND MESSAGE'}
      </button>
    </form>
  );
}
