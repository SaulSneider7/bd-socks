import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Contact = () => {
  const phoneNumber = "51967395991";
  const message = encodeURIComponent("¡Hola BD SOCKS! Me gustaría recibir más información.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const instagramUrl = "https://www.instagram.com/bdsocks.latam/?hl=es";

  return (
    <section id="contact" className="py-32 px-6 border-t border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-5xl font-serif mb-8 text-[#1A1A1A]">Cont&aacute;ctanos</h2>
          <p className="text-[#1A1A1A]/60 mb-12 max-w-md">
            ¿Tienes alguna duda o consulta corporativa? Nuestro equipo está listo para brindarte una atención personalizada.
          </p>
          <div className="space-y-8">
            <a href="mailto:administracion@bd-eco.com" className="flex items-center group">
              <div className="w-14 h-14 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center mr-6 group-hover:bg-[#4A5D4E] group-hover:text-white group-hover:border-[#4A5D4E] transition-all">
                <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#1A1A1A]/40 font-bold">Email</div>
                <div className="text-xl font-serif text-[#1A1A1A]">administracion@bd-eco.com</div>
              </div>
            </a>
            <a href={`tel:${phoneNumber}`} className="flex items-center group">
              <div className="w-14 h-14 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center mr-6 group-hover:bg-[#4A5D4E] group-hover:text-white group-hover:border-[#4A5D4E] transition-all">
                <FontAwesomeIcon icon={faPhone} className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#1A1A1A]/40 font-bold">Teléfono</div>
                <div className="text-xl font-serif text-[#1A1A1A]">967 395 991</div>
              </div>
            </a>
          </div>

          {/* Redirection Buttons */}
          <div className="mt-16 flex flex-wrap gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center bg-[#25D366] text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-[#1EBE57] transition-all shadow-lg shadow-[#25D366]/20"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 mr-3" />
              WhatsApp
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:opacity-90 transition-all shadow-lg"
            >
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 mr-3" />
              Instagram
            </a>
          </div>
        </div>

        <div
          className="text-white p-12 rounded-[2rem] relative overflow-hidden flex flex-col justify-center items-center text-center shadow-2xl bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-contact.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A5D4E]/20 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C5A059]/20 rounded-full -ml-16 -mb-16"></div>

          <h3 className="text-4xl font-serif mb-6 italic relative z-10">
            Vive la experiencia BD SOCKS
          </h3>

          <p className="text-white/60 mb-10 relative z-10 max-w-sm">
            Descubre por qué somos la elección preferida de quienes buscan calidad, confort y estilo en cada paso.
          </p>

          <Link
            to="/catalogo"
            className="bg-[#4A5D4E] text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#3D4D40] transition-all relative z-10 shadow-lg shadow-[#4A5D4E]/20"
          >
            Ver Catálogo Completo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
