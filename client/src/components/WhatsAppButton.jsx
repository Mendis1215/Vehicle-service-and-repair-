import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/94772421915"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Contact us on WhatsApp"
      id="whatsapp-btn"
    >
      <FaWhatsapp size={30} color="white" />
    </a>
  );
}
