import { Link } from 'react-router-dom';
import { FaWrench, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <img src="/logo.png" alt="L.Y.Mendis" className="h-16 w-auto" />
          </div>
          <p className="text-brand-text-gray text-sm leading-relaxed font-body mt-4">
            Professional automotive service since 2010. Your trusted partner for all vehicle needs in Balapitiya.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-brand-white text-lg font-semibold mb-4">QUICK LINKS</h4>
          <div className="red-line" style={{ marginTop: 0 }} />
          <ul className="space-y-2">
            {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/gallery', 'Gallery'], ['/reviews', 'Reviews'], ['/contact', 'Contact']].map(([path, name]) => (
              <li key={path}>
                <Link to={path} className="text-brand-text-gray hover:text-brand-red text-sm font-body transition-colors">
                  → {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-brand-white text-lg font-semibold mb-4">CONTACT US</h4>
          <div className="red-line" style={{ marginTop: 0 }} />
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-brand-text-gray text-sm font-body">
              <FaMapMarkerAlt className="text-brand-red mt-1 shrink-0" />
              <span>35/3 Wandaduwa, Balapitiya</span>
            </li>
            <li className="flex items-center gap-3 text-brand-text-gray text-sm font-body">
              <FaPhone className="text-brand-red shrink-0" />
              <a href="tel:0777103387" className="hover:text-brand-red transition-colors">0777 103 387</a>
            </li>
            <li className="flex items-center gap-3 text-brand-text-gray text-sm font-body">
              <FaPhone className="text-brand-red shrink-0" />
              <a href="tel:0772421915" className="hover:text-brand-red transition-colors">0772 421 915</a>
            </li>
            <li className="flex items-center gap-3 text-brand-text-gray text-sm font-body">
              <FaWhatsapp className="text-green-500 shrink-0" />
              <a href="https://wa.me/94772421915" className="hover:text-green-400 transition-colors">WhatsApp Us</a>
            </li>
            <li className="flex items-center gap-3 text-brand-text-gray text-sm font-body">
              <FaEnvelope className="text-brand-red shrink-0" />
              <a href="mailto:yasarathna@gmail.com" className="hover:text-brand-red transition-colors">yasarathna@gmail.com</a>
            </li>
            <li className="flex items-center gap-3 text-brand-text-gray text-sm font-body">
              <FaClock className="text-brand-red shrink-0" />
              <span>Mon – Sat: 8AM – 6PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-gray/30 py-5 text-center">
        <p className="text-brand-text-gray text-sm font-body">
          © {new Date().getFullYear()} Yasarathna Motors. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
