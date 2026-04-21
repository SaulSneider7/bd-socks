import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Locations = () => {
  const locations = [
    {
      title: "Cencosud Retail",
      logo: "/cenco-logo.jpeg",
      items: [
        {
          label: "C.C. Plaza Lima Sur - Chorrillos",
          href: "https://maps.app.goo.gl/BPnJozvraXRtLJiU6"
        },
        {
          label: "Cenco Metro Canadá",
          href: "https://maps.app.goo.gl/S7tGTgXpYoW46Gjb6"
        }
      ]
    },
    {
      title: "MNK Store",
      logo: "/mnk-logo.png",
      items: [
        {
          label: "CC. El Polo 2 Tda. B209 - Surco",
          href: "https://maps.app.goo.gl/p5fyWPKwHhuQvpJz6"
        },
        {
          label: "Av. Cavenecia 225 Tda. 111 - San Isidro",
          href: "https://maps.app.goo.gl/8RhvC8H6tLUEAjYk9"
        }
      ]
    },
    {
      title: "HOLIDAY'S KIDS",
      logo: "/holiday-logo.png",
      items: [
        {
          label: "Showroom La Molina",
          href: "https://maps.app.goo.gl/L7ukZrLVoviJ5UYc6"
        }
      ]
    }
  ];

  return (
    <section id="locations" className="py-32 bg-[#F1EFE9] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-[#C5A059] font-bold mb-4 block">Encuéntranos</span>
          <h2 className="text-5xl font-serif text-[#1A1A1A]">Puntos de Venta</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {locations.map((loc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="group h-full rounded-[2rem] p-[1px] bg-gradient-to-b from-[#F4F1E8] via-[#E8E1D4] to-[#D9D0C0] shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="h-full rounded-[2rem] bg-white/95 backdrop-blur-sm px-8 py-9 flex flex-col">
                <div className="flex items-center justify-center h-24 mb-8">
                  <img
                    src={loc.logo}
                    alt={loc.title}
                    className="max-h-full max-w-[160px] object-contain transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="border-t border-b border-[#4A5D4E]/10 py-5 mb-6 text-center">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#1A1A1A]/35 font-semibold mb-2">
                    Punto de venta
                  </p>
                  <h3 className="text-[1.45rem] leading-tight font-serif text-[#4A5D4E]">
                    {loc.title}
                  </h3>
                </div>

                <div className="flex-1 space-y-4">
                  {loc.items.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/item flex items-start gap-4 rounded-2xl border border-[#4A5D4E]/10 bg-[#FAF8F3] px-5 py-4 transition-all duration-300 hover:border-[#C5A059]/50 hover:bg-[#F7F2E8]"
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-[#4A5D4E]/10">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="text-[#C5A059] text-sm"
                        />
                      </div>

                      <div className="flex-1 text-left">
                        <p className="text-sm leading-relaxed text-[#1A1A1A]/75 group-hover/item:text-[#1A1A1A] transition-colors">
                          {item.label}
                        </p>
                        <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4A5D4E]/55 group-hover/item:text-[#4A5D4E]">
                          Ver ubicación
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Physical Store Image Section */}
        <div className="mt-32 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="/tienda.jpeg"
              alt="BD SOCKS Physical Store"
              className="w-full h-full object-cover  transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-serif italic text-xl">Visita nuestra tienda física y vive la experiencia premium.</p>
            </div>
          </motion.div>
          <div className="space-y-8">
            <h3 className="text-4xl font-serif text-[#1A1A1A]">Nuestra Tienda</h3>
            <p className="text-[#1A1A1A]/70 leading-relaxed">
              Un espacio creado para transmitir la calidad y el cuidado detrás de cada una de nuestras medias. Te invitamos a descubrir la colección completa y sentir en persona la suavidad y precisión del algodón de 200 hilos.
            </p>
            <div className="flex items-center space-x-4 text-[#C5A059]">
              <div className="w-12 h-12 rounded-full bg-[#4A5D4E]/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]/40">Ubicación Principal</p>
                <p className="text-lg font-serif text-[#1A1A1A]">Lima, Perú</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
