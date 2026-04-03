import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsAppFloatingButton = () => {
  const phoneNumber = "51967395991";
  const message = encodeURIComponent("¡Hola BD SOCKS! Me gustaría recibir más información.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white w-16 h-16 flex items-center justify-center rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 group"
      aria-label="Contactar por WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} size="2xl" />

      <span className="absolute right-[110%] mr-2 top-1/2 -translate-y-1/2 bg-white text-[#1A1A1A] px-4 py-2 rounded-xl text-sm font-bold shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none translate-x-4 group-hover:translate-x-0">
        ¿En qué podemos ayudarte?
      </span>
    </a>
  );
};

export default WhatsAppFloatingButton;