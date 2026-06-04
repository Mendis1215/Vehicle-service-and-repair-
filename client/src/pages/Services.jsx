import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer';
import API from '../api/axios';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/services')
      .then((res) => {
        if (res.data) setServices(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-brand-black pt-20">
      {/* Hero Banner */}
      <section
        className="relative py-24 flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center">
          <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">What We Offer</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-white">OUR SERVICES</h1>
          <div className="red-line-center" />
          <p className="text-brand-text-gray font-body max-w-xl mx-auto">
            Complete automotive care with professional expertise
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-brand-text-gray font-body text-lg leading-relaxed">
            At Yasarathna Motors, we offer a comprehensive range of vehicle services to keep your car, van, or SUV in peak condition. Our team of skilled technicians uses modern tools and techniques to deliver quality results you can count on.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-brand-card rounded-lg h-64 animate-pulse border border-brand-gray/20" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => <ServiceCard key={s._id} service={s} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl text-brand-white mb-4">NEED A SERVICE?</h2>
          <p className="text-brand-text-gray font-body mb-8">
            Contact us today to schedule your vehicle service appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-brand-red hover:bg-brand-red-hover text-white font-heading font-semibold px-8 py-3 rounded transition-colors"
            >
              BOOK A SERVICE
            </Link>
            <a
              href="tel:0777103387"
              className="border border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black font-heading font-semibold px-8 py-3 rounded transition-colors"
            >
              CALL US NOW
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
