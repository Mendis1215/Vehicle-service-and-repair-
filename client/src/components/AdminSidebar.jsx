import { FaTachometerAlt, FaComments, FaImages, FaTools, FaEnvelope, FaSignOutAlt, FaWrench } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const menuItems = [
  { id: 'stats', icon: FaTachometerAlt, label: 'Dashboard' },
  { id: 'reviews', icon: FaComments, label: 'Reviews' },
  { id: 'gallery', icon: FaImages, label: 'Gallery' },
  { id: 'services', icon: FaTools, label: 'Services' },
  { id: 'messages', icon: FaEnvelope, label: 'Messages' },
];

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const { logout, adminUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-brand-dark border-r border-brand-gray/30 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-brand-gray/30">
        <div className="flex flex-col items-start gap-2">
          <img src="/logo.png" alt="L.Y.Mendis" className="h-10 w-auto" />
          <p className="text-brand-red text-xs tracking-widest mt-1">ADMIN PANEL</p>
        </div>
        <p className="text-brand-text-gray text-xs mt-3 font-body">Welcome, {adminUser}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            id={`admin-nav-${id}`}
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 font-body text-sm transition-colors ${
              activeTab === id
                ? 'bg-brand-red text-white'
                : 'text-brand-text-gray hover:bg-brand-gray hover:text-brand-white'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-brand-gray/30">
        <button
          id="admin-logout-btn"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-brand-text-gray hover:bg-red-900/30 hover:text-brand-red font-body text-sm transition-colors"
        >
          <FaSignOutAlt size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
