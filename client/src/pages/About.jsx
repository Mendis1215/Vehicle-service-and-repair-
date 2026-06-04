import { FaWrench, FaShieldAlt, FaUsers, FaClock, FaTrophy, FaHandshake } from 'react-icons/fa';
import Footer from '../components/Footer';

const stats = [
  { num: '14+', label: 'Years in Business' },
  { num: '5000+', label: 'Happy Customers' },
  { num: '10+', label: 'Expert Mechanics' },
  { num: '9', label: 'Services Offered' },
];

const values = [
  {
    icon: FaTrophy,
    title: 'Our Mission',
    text: 'To provide the highest quality vehicle service and repair at affordable prices, ensuring every customer drives away confident and satisfied.',
  },
  {
    icon: FaShieldAlt,
    title: 'Our Vision',
    text: 'To be the most trusted and recognized vehicle service center in the Southern Province of Sri Lanka.',
  },
  {
    icon: FaHandshake,
    title: 'Our Values',
    text: 'Integrity, quality, and customer satisfaction are at the heart of everything we do. We believe in honest work and transparent pricing.',
  },
];

export default function About() {
  return (
    <main className="bg-brand-black pt-20">
      {/* Hero Banner */}
      <section
        className="relative py-24 flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center">
          <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">Who We Are</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-white">ABOUT US</h1>
          <div className="red-line-center" />
          <p className="text-brand-text-gray font-body max-w-xl mx-auto">
            Serving Balapitiya and surrounding areas with pride since 2010
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">Our Story</p>
            <h2 className="font-heading text-4xl text-brand-white mb-4">BUILT ON TRUST & EXPERTISE</h2>
            <div className="red-line" />
            <p className="text-brand-text-gray font-body leading-relaxed mb-4">
              Yasarathna Motors was founded in 2010 with a simple mission: to provide reliable, honest, and affordable vehicle services to the people of Balapitiya and the surrounding Southern Province of Sri Lanka.
            </p>
            <p className="text-brand-text-gray font-body leading-relaxed mb-4">
              Over the past 14+ years, we have grown from a small workshop to a full-service automotive center, serving thousands of satisfied customers. Our team of highly skilled and experienced technicians is dedicated to delivering the highest standard of service for every vehicle that comes through our doors.
            </p>
            <p className="text-brand-text-gray font-body leading-relaxed mb-6">
              From routine oil changes to complex accident repairs, we handle every job with the same level of care and professionalism. We are proud to be the go-to choice for vehicle owners who value quality work at honest prices.
            </p>
            <div className="flex gap-4">
              <a
                href="tel:0777103387"
                className="bg-brand-red hover:bg-brand-red-hover text-white font-heading font-semibold px-6 py-3 rounded transition-colors"
              >
                CALL US
              </a>
              <a
                href="https://wa.me/94772421915"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-heading font-semibold px-6 py-3 rounded transition-colors"
              >
                WHATSAPP
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&q=80"
              alt="Yasarathna Motors workshop"
              className="w-full rounded-lg shadow-2xl shadow-black/50"
            />
            <div className="absolute -bottom-6 -left-6 bg-brand-red p-6 rounded-lg shadow-xl hidden md:block">
              <p className="font-heading text-4xl font-bold text-white">14+</p>
              <p className="text-red-100 font-body text-sm">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">What Drives Us</p>
            <h2 className="font-heading text-4xl text-brand-white">MISSION & VALUES</h2>
            <div className="red-line-center" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-brand-card border border-brand-gray/30 rounded-lg p-8 card-hover text-center">
                <div className="bg-brand-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-brand-red" size={28} />
                </div>
                <h3 className="font-heading text-xl text-brand-white mb-3">{title}</h3>
                <p className="text-brand-text-gray font-body text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">By The Numbers</p>
            <h2 className="font-heading text-4xl text-brand-white">OUR ACHIEVEMENTS</h2>
            <div className="red-line-center" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ num, label }) => (
              <div key={label} className="text-center bg-brand-card border border-brand-gray/30 rounded-lg p-8 card-hover">
                <p className="font-heading text-5xl font-bold text-brand-red mb-2">{num}</p>
                <p className="text-brand-text-gray font-body text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">Why Us</p>
            <h2 className="font-heading text-4xl text-brand-white">WHY CHOOSE YASARATHNA MOTORS</h2>
            <div className="red-line-center" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: FaWrench, title: 'Experienced Technicians', text: 'Our mechanics have over a decade of hands-on experience with all types of vehicles.' },
              { icon: FaShieldAlt, title: 'Premium Quality Parts', text: 'We source only genuine and high-quality spare parts for all repairs and replacements.' },
              { icon: FaUsers, title: 'Customer-First Approach', text: 'Your satisfaction is our top priority. We keep you informed at every step of the repair process.' },
              { icon: FaClock, title: 'Efficient & Timely', text: 'We respect your time. Our streamlined processes ensure your vehicle is serviced quickly.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 bg-brand-card border border-brand-gray/30 rounded-lg p-6 card-hover">
                <div className="bg-brand-red/10 p-3 rounded-lg h-fit">
                  <Icon className="text-brand-red" size={22} />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-brand-white mb-2">{title}</h3>
                  <p className="text-brand-text-gray font-body text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
