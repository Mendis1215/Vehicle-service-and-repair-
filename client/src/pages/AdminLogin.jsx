import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWrench, FaLock, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/admin/login', form);
      login(res.data.token, res.data.username || form.username);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <img src="/logo.png" alt="L.Y.Mendis" className="h-20 w-auto mb-4" />
          <p className="text-brand-red text-sm font-body tracking-widest">ADMIN PANEL</p>
        </div>

        {/* Card */}
        <div className="bg-brand-card border border-brand-gray/30 rounded-lg p-8">
          <h2 className="font-heading text-xl text-brand-white mb-2 text-center">ADMIN LOGIN</h2>
          <div className="red-line-center" />

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="text-brand-text-gray text-sm font-body mb-1 block">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-gray" size={14} />
                <input
                  id="admin-username"
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full bg-brand-dark border border-brand-gray/50 rounded pl-10 pr-4 py-3 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-brand-text-gray text-sm font-body mb-1 block">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-gray" size={14} />
                <input
                  id="admin-password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-brand-dark border border-brand-gray/50 rounded pl-10 pr-4 py-3 text-brand-white font-body text-sm focus:outline-none focus:border-brand-red"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-heading font-semibold py-3 rounded transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>
        </div>

        <p className="text-center text-brand-text-gray text-xs font-body mt-6">
          Authorized personnel only
        </p>
      </div>
    </main>
  );
}
