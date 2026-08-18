import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Locations = () => {
  const locations = [
    // {
    //   title: "Cencosud Retail",
    //   logo: "/cenco-logo.jpeg",
    //   items: [
    //     {
    //       label: "C.C. Plaza Lima Sur - Chorrillos",
    //       href: "https://maps.app.goo.gl/BPnJozvraXRtLJiU6"
    //     },
    //     {
    //       label: "Cenco Metro Canadá",
    //       href: "https://maps.app.goo.gl/S7tGTgXpYoW46Gjb6"
    //     }
    //   ]
    // },
    // {
    //   title: "MNK Store",
    //   logo: "/mnk-logo.png",
    //   items: [
    //     {
    //       label: "CC. El Polo 2 Tda. B209 - Surco",
    //       href: "https://maps.app.goo.gl/p5fyWPKwHhuQvpJz6"
    //     },
    //     {
    //       label: "Av. Cavenecia 225 Tda. 111 - San Isidro",
    //       href: "https://maps.app.goo.gl/8RhvC8H6tLUEAjYk9"
    //     }
    //   ]
    // },

    {
      title: "Tienda Barbadens",
      logo: "/barbadens-logo.png",
      items: [
        {
          label: "Ca. Chinchón 944 San Isidro",
          href: "https://maps.app.goo.gl/TQRsNu17YyJbUCBB8"
        },
        {
          label: "Circunvalación Golf Los Incas 170 Surco",
          href: "Av. Club Golf los Incas 170, Santiago de Surco 15023"
        }
      ]
    },

    {
      title: "Tienda Japy Detalles y Globos",
      logo: "/japy-logo.png",
      items: [
        {
          label: "Camino Real 485 San Isidro, Lima, Lima",
          href: "https://maps.app.goo.gl/LUpS6qctswgSNBJ1A"
        }
      ]
    },

    {
      title: "Tienda Anel Joyeria",
      logo: "/anel-logo.png",
      items: [
        {
          label: "Pje. Porta 115, Tienda 1 , MIRAFLORES 15074, Lima",
          href: "https://maps.app.goo.gl/oz7jmT8UyBP5yULj8"
        }
      ]
    },

    {
      title: "Tienda Ojos de Luna",
      logo: "/ojos-de-luna-logo.png",
      items: [
        {
          label: "La Molina | CC La Rotonda 2050",
          href: "https://maps.app.goo.gl/TGFtocgerTMcnvmp8"
        }
      ]
    },

    {
      title: "Tienda 4Essen",
      logo: "/4essen-logo.png",
      items: [
        {
          label: "Av. Conquistadores 489 - San Isidro",
          href: "https://maps.app.goo.gl/CyF9yoCXEJcMnxYh9"
        }
      ]
    },

    {
      title: "Tienda Amavia",
      logo: "/amavia-logo.png",
      items: [
        {
          label: "Avenida Juan Pablo II 417 ref. frente a la segunda puerta de la UNT.  - Trujillo",
          href: "https://maps.app.goo.gl/mr8RUrBJngbjBFKi9"
        }
      ]
    },

    {
      title: "Tienda Malena Concept",
      logo: "/malena-logo.png",
      items: [
        {
          label: "Calle La Arboleda 771 -California - Trujillo.",
          href: "https://maps.app.goo.gl/GqCxL6RqVzXAR9hQ8"
        }
      ]
    },
    // {
    //   title: "HOLIDAY'S KIDS",
    //   logo: "/holiday-logo.png",
    //   items: [
    //     {
    //       label: "Showroom La Molina",
    //       href: "https://maps.app.goo.gl/L7ukZrLVoviJ5UYc6"
    //     }
    //   ]
    // },
    {
      title: "CocoDeli concept",
      logo: "/cocodeli-logo.png",
      items: [
        {
          label: "Jr. Cusco 202 - Ayacucho",
          href: "https://maps.app.goo.gl/71HKg4cdUx53s5vC7"
        }
      ]
    },
    {
      title: "LOLLIPOPS",
      logo: "/lollipops-logo.png",
      items: [
        {
          label: "Av. Larco 345 Tda M2 - Miraflores",
          href: "https://maps.app.goo.gl/wiT87LnTRQeoUyeh7"
        }
      ]
    },
    {
      title: "MAGNA",
      logo: "/magna-logo.png",
      items: [
        {
          label: "C.C. Caminos del Inca  Tda. 75 2do piso - Surco",
          href: "https://maps.app.goo.gl/pr2ibx84CCMp8RrcA"
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
          </motion.div>
          <div className="space-y-8 rounded-[32px] bg-white border border-[#1A1A1A]/[0.06] p-8 md:p-10 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] font-bold text-[#C5A059] mb-3">
                Visítanos
              </p>

              <h3 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
                Nuestra Tienda
              </h3>
            </div>

            <div className="flex items-center gap-5 rounded-[24px] bg-[#F8F7F3] border border-[#1A1A1A]/[0.05] p-5 md:p-6">
              <div className="w-16 h-16 rounded-full bg-[#4A5D4E]/10 flex items-center justify-center text-[#C5A059] shrink-0">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-7 h-7" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] font-bold text-[#1A1A1A]/40 mb-1">
                  Ubicación Principal
                </p>

                <p className="text-2xl md:text-3xl font-serif text-[#1A1A1A]">
                  Lima, Perú
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
