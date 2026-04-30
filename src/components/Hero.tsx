import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-xs uppercase tracking-[0.4em] text-black/40 font-bold mb-4 block">Premium Quality</span>
          <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8">
            Sofisticación <br />
            <span className="italic">en cada paso.</span>
          </h1>
          <p className="text-lg text-black/60 max-w-md mb-10 leading-relaxed">
            Calcetines elaborados con algodon organico , tejido con 200 ahujas, desarrollado bajo estandares internacionales y diseños europeos para ofrecerte una calidad superior.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/catalogo"
              className="inline-flex bg-[#4A5D4E] text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#3D4D40] transition-all items-center group shadow-lg shadow-[#4A5D4E]/20"
            >
              Ver Catálogo
              <FontAwesomeIcon icon={faChevronRight} className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex border border-[#4A5D4E]/20 text-[#4A5D4E] px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#4A5D4E]/5 transition-all items-center"
            >
              Nuestra Historia
            </button>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] bg-neutral-100 rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src="/hero.webp" 
            alt="BD SOCKS Premium"
            className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-[2s]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white max-w-[240px]">
            <p className="text-xs uppercase tracking-widest font-bold mb-2">Algodón Orgánico</p>
            <p className="text-sm italic opacity-80">"Calcetines que combinan comodidad con sostenibilidad"</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
