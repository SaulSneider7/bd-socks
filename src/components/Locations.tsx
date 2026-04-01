import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Locations = () => {
  const locations = [
    {
      title: "Cencosud Retail",
      logo: "https://picsum.photos/seed/cencosud/200/100",
      items: [
        "C.C. Plaza Lima Sur - Chorrillos",
        "Cenco Metro Canadá"
      ]
    },
    {
      title: "MNK Store",
      logo: "/mnk-logo.png",
      items: [
        "CC. EL Polo 2 Tda. B209 - SURCO",
        "Av. Cavenecia 225 Tda. 111 - SAN ISIDRO"
      ]
    },
    {
      title: "HOLIDAY'S KIDS",
      logo: "/holiday-logo.png",
      items: [
        "Showroom La Molina"
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
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {locations.map((loc, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl luxury-border hover:shadow-xl transition-shadow flex flex-col items-center text-center"
            >
              <div className="h-20 mb-8 flex items-center justify-center transition-all">
                <img 
                  src={loc.logo} 
                  alt={loc.title} 
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-serif mb-6 border-b border-[#4A5D4E]/10 pb-4 text-[#4A5D4E] w-full">{loc.title}</h3>
              <ul className="space-y-4 text-sm text-[#1A1A1A]/70 w-full">
                {loc.items.map((item, i) => (
                  <li key={i} className="flex items-start justify-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-[#C5A059]" />
                    {item}
                  </li>
                ))}
              </ul>
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
            <h3 className="text-4xl font-serif text-[#1A1A1A]">Nuestra Tienda <span className="italic text-[#4A5D4E]">BD SOCKS</span></h3>
            <p className="text-[#1A1A1A]/70 leading-relaxed">
              Un espacio diseñado para reflejar la sofisticación y calidad de nuestros productos. Ven a conocer toda nuestra colección y siente la suavidad del algodón de 200 hilos en persona.
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
