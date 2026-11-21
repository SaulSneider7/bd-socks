import { useContent } from '../content/ContentContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Locations = () => {
  const { locations, mainLocation } = useContent();

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
                    src={loc.logo || undefined}
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



        {/* Physical Store Section */}
        {mainLocation && <section className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto rounded-[36px] bg-white border border-[#1A1A1A]/[0.06] p-8 md:p-12 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
          >
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-[#C5A059] mb-4">
                Visítanos
              </p>

              <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-tight">
                {mainLocation.title}
              </h3>

              <p className="mt-5 text-base md:text-lg text-[#1A1A1A]/60 leading-relaxed">
                Descubre nuestros productos de manera presencial y encuentra el estilo
                perfecto para ti.
              </p>
            </div>

            <div className="rounded-[28px] bg-[#F8F7F3] border border-[#1A1A1A]/[0.05] p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <div className="w-16 h-16 rounded-full bg-[#4A5D4E]/10 flex items-center justify-center text-[#C5A059] shrink-0">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="w-6 h-6"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.22em] font-bold text-[#1A1A1A]/40 mb-2">
                    Ubicación Principal
                  </p>

                  <p className="text-2xl md:text-3xl font-serif text-[#1A1A1A]">
                    {mainLocation.items.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="block hover:underline">{item.label}</a>)}
                  </p>

                  <p className="mt-2 text-sm md:text-base text-[#1A1A1A]/55">
                    Visítanos y conoce nuestra colección disponible en tienda.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>}
      </div>
    </section>
  );
};

export default Locations;
