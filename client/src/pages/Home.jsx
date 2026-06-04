import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWrench, FaShieldAlt, FaDollarSign, FaClock, FaPhone, FaWhatsapp, FaChevronDown } from 'react-icons/fa';
import ServiceCard from '../components/ServiceCard';
import ReviewCard from '../components/ReviewCard';
import Footer from '../components/Footer';
import API from '../api/axios';

const whyChooseUs = [
  { icon: FaWrench, title: 'Expert Technicians', desc: 'Our experienced mechanics have 14+ years of expertise in vehicle service and repair.' },
  { icon: FaShieldAlt, title: 'Quality Guaranteed', desc: 'We use only premium quality parts and materials to ensure lasting repairs.' },
  { icon: FaDollarSign, title: 'Affordable Pricing', desc: 'Competitive and transparent pricing with no hidden charges.' },
  { icon: FaClock, title: 'Quick Turnaround', desc: 'Efficient service processes to get your vehicle back on the road fast.' },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    API.get('/services').then(res => { if (res.data) setServices(res.data.slice(0, 3)); }).catch(() => {});
    API.get('/reviews').then(res => setReviews((res.data || []).slice(0, 3))).catch(() => {});
    API.get('/gallery').then(res => setGallery((res.data || []).slice(0, 6))).catch(() => {});
  }, []);

  return (
    <main className="bg-brand-black">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <p className="text-brand-red font-body text-sm tracking-[0.3em] uppercase mb-4">
            Trusted Vehicle Service Center
          </p>
          <h1 className="font-heading font-bold text-5xl md:text-7xl text-brand-white mb-4 leading-tight">
            YASARATHNA<br />
            <span className="gradient-text">MOTORS</span>
          </h1>
          <p className="text-brand-text-gray font-body text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Professional automotive service and repair since 2010. Expert care for your vehicle in Balapitiya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              id="hero-services-btn"
              className="bg-brand-red hover:bg-brand-red-hover text-white font-heading font-semibold px-8 py-4 rounded text-lg transition-all hover:scale-105"
            >
              OUR SERVICES
            </Link>
            <Link
              to="/contact"
              id="hero-contact-btn"
              className="border-2 border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black font-heading font-semibold px-8 py-4 rounded text-lg transition-all"
            >
              CONTACT US
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <FaChevronDown className="text-brand-text-gray" size={24} />
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="bg-brand-red py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ['14+', 'Years Experience'],
            ['5000+', 'Vehicles Serviced'],
            ['9', 'Services Offered'],
            ['100%', 'Satisfaction'],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="font-heading text-4xl font-bold text-white">{num}</p>
              <p className="text-red-100 font-body text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section id="services-preview" className="section-padding">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">What We Do</p>
            <h2 className="font-heading text-4xl md:text-5xl text-brand-white">OUR SERVICES</h2>
            <div className="red-line-center" />
            <p className="text-brand-text-gray font-body max-w-2xl mx-auto">
              Comprehensive automotive services to keep your vehicle running at its best.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {services.map((s) => <ServiceCard key={s._id} service={s} />)}
          </div>
          <div className="text-center">
            <Link
              to="/services"
              id="view-all-services-btn"
              className="inline-block border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-heading font-semibold px-8 py-3 rounded transition-all"
            >
              VIEW ALL SERVICES
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="section-padding bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">Why Us</p>
            <h2 className="font-heading text-4xl md:text-5xl text-brand-white">WHY CHOOSE US</h2>
            <div className="red-line-center" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 bg-brand-card rounded-lg border border-brand-gray/20 card-hover">
                <div className="bg-brand-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-brand-red" size={28} />
                </div>
                <h3 className="font-heading text-xl text-brand-white mb-2">{title}</h3>
                <p className="text-brand-text-gray font-body text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      {reviews.length > 0 && (
        <section id="reviews-preview" className="section-padding">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">Testimonials</p>
              <h2 className="font-heading text-4xl md:text-5xl text-brand-white">CUSTOMER REVIEWS</h2>
              <div className="red-line-center" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {reviews.map((r) => <ReviewCard key={r._id} review={r} />)}
            </div>
            <div className="text-center">
              <Link
                to="/reviews"
                className="inline-block border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-heading font-semibold px-8 py-3 rounded transition-all"
              >
                READ ALL REVIEWS
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      {gallery.length > 0 && (
        <section id="gallery-preview" className="section-padding bg-brand-dark">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">Our Work</p>
              <h2 className="font-heading text-4xl md:text-5xl text-brand-white">GALLERY</h2>
              <div className="red-line-center" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {gallery.map((item) => (
                <div key={item._id} className="relative overflow-hidden rounded-lg h-48 group">
                  <img
                    src={item.thumbnailUrl || item.url}
                    alt={item.caption || 'Gallery'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all" />
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/gallery"
                className="inline-block border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-heading font-semibold px-8 py-3 rounded transition-all"
              >
                VIEW FULL GALLERY
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section id="cta" className="py-20 bg-gradient-to-r from-brand-red to-red-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">
            READY TO SERVICE YOUR VEHICLE?
          </h2>
          <p className="text-red-100 font-body text-lg mb-8">
            Visit us at 35/3 Wandaduwa, Balapitiya — Mon to Sat, 8AM to 6PM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0777103387"
              id="cta-call-btn"
              className="flex items-center justify-center gap-2 bg-white text-brand-red font-heading font-bold px-8 py-4 rounded text-lg hover:bg-red-50 transition-colors"
            >
              <FaPhone />
              CALL 0777 103 387
            </a>
            <a
              href="https://wa.me/94772421915"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp-btn"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-heading font-bold px-8 py-4 rounded text-lg transition-colors"
            >
              <FaWhatsapp />
              WHATSAPP US
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
