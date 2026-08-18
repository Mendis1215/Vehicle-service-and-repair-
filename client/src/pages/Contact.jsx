import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const hours = [
  ['Monday', '8:00 AM – 6:00 PM'],
  ['Tuesday', '8:00 AM – 6:00 PM'],
  ['Wednesday', '8:00 AM – 6:00 PM'],
  ['Thursday', '8:00 AM – 6:00 PM'],
  ['Friday', '8:00 AM – 6:00 PM'],
  ['Saturday', '8:00 AM – 6:00 PM'],
  ['Sunday', 'Closed'],
];

export default function Contact() {
  return (
    <main className="bg-brand-black pt-20">
      {/* Hero */}
      <section
        className="relative py-24 flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center">
          <p className="text-brand-red font-body text-sm tracking-widest uppercase mb-2">Get in Touch</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-white">CONTACT US</h1>
          <div className="red-line-center" />
          <p className="text-brand-text-gray font-body max-w-xl mx-auto">
            We are here to help — reach out anytime during business hours
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Details */}
          <div>
            <h2 className="font-heading text-3xl text-brand-white mb-2">GET IN TOUCH</h2>
            <div className="red-line" />
            <p className="text-brand-text-gray font-body mb-8 leading-relaxed">
              Have a question about your vehicle or want to book a service? Reach out to us via phone, WhatsApp, email or visit us directly.
            </p>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4 bg-brand-card border border-brand-gray/30 rounded-lg p-4">
                <div className="bg-brand-red/10 p-3 rounded-lg">
                  <FaMapMarkerAlt className="text-brand-red" size={20} />
                </div>
                <div>
                  <p className="font-heading text-brand-white font-semibold">Address</p>
                  <p className="text-brand-text-gray font-body text-sm">35/3 Wandaduwa, Balapitiya</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-brand-card border border-brand-gray/30 rounded-lg p-4">
                <div className="bg-brand-red/10 p-3 rounded-lg">
                  <FaPhone className="text-brand-red" size={20} />
                </div>
                <div>
                  <p className="font-heading text-brand-white font-semibold">Phone</p>
                  <a href="tel:0777103387" className="text-brand-text-gray font-body text-sm hover:text-brand-red transition-colors block">0777 103 387</a>
                  <a href="tel:0772421915" className="text-brand-text-gray font-body text-sm hover:text-brand-red transition-colors block">0772 421 915</a>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-brand-card border border-brand-gray/30 rounded-lg p-4">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <FaWhatsapp className="text-green-500" size={20} />
                </div>
                <div>
                  <p className="font-heading text-brand-white font-semibold">WhatsApp</p>
                  <a
                    href="https://wa.me/94772421915"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 font-body text-sm hover:text-green-400 transition-colors"
                  >
                    Chat with us on WhatsApp →
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-brand-card border border-brand-gray/30 rounded-lg p-4">
                <div className="bg-brand-red/10 p-3 rounded-lg">
                  <FaEnvelope className="text-brand-red" size={20} />
                </div>
                <div>
                  <p className="font-heading text-brand-white font-semibold">Email</p>
                  <a href="mailto:yasarathna@gmail.com" className="text-brand-text-gray font-body text-sm hover:text-brand-red transition-colors">
                    yasarathna@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-brand-card border border-brand-gray/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaClock className="text-brand-red" size={18} />
                <h3 className="font-heading text-lg text-brand-white">WORKING HOURS</h3>
              </div>
              <table className="w-full font-body text-sm">
                <tbody>
                  {hours.map(([day, time]) => (
                    <tr key={day} className="border-b border-brand-gray/20 last:border-0">
                      <td className="py-2 text-brand-text-gray">{day}</td>
                      <td className={`py-2 text-right font-semibold ${time === 'Closed' ? 'text-brand-red' : 'text-brand-white'}`}>
                        {time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <h2 className="font-heading text-3xl text-brand-white mb-2">SEND A MESSAGE</h2>
            <div className="red-line" />
            <div className="bg-brand-card border border-brand-gray/30 rounded-lg p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
}
