import { motion } from 'framer-motion';

const QualityPillars = () => {
  return (
    <section id="about" className="py-32 bg-[#1A1A1A] text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-xs uppercase tracking-[0.4em] text-[#C5A059] font-bold mb-4 block">Calidad Sin Compromisos</span>
          <h2 className="text-5xl font-serif italic">¿Qué nos hace diferentes?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <div className="text-6xl font-serif italic text-[#4A5D4E]">01</div>
            <h3 className="text-2xl font-serif">Tejido de 200 Hilos</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              La mayoría de calcetines usan entre 120 y 140 hilos. Nosotros elevamos el estándar a 200 para una densidad y suavidad que puedes sentir al tacto.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <div className="text-6xl font-serif italic text-[#4A5D4E]">02</div>
            <h3 className="text-2xl font-serif">Algodón Certificado</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Utilizamos algodón orgánico que cuida tu piel y el medio ambiente. Propiedades hipoalergénicas y alta transpirabilidad garantizadas.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <div className="text-6xl font-serif italic text-[#4A5D4E]">03</div>
            <h3 className="text-2xl font-serif">Diseño Anatómico</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Sin costuras molestas y con un ajuste perfecto que no aprieta pero se mantiene en su lugar durante todo el día.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QualityPillars;
