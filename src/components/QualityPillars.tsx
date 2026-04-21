import { motion } from 'framer-motion';

const QualityPillars = () => {
  return (
    <section className="py-32 bg-[#1A1A1A] text-white px-6" aria-labelledby="pillars-title">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-xs uppercase tracking-[0.4em] text-[#C5A059] font-bold mb-4 block">
            Calidad Sin Compromisos
          </span>
          {/* SEO: H2 con la palabra clave principal integrada */}
          <h2 id="pillars-title" className="text-5xl font-serif italic">
            ¿Por qué elegir nuestras <span className="text-[#C5A059]">medias premium</span>?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {/* Pilar 01 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <div className="text-6xl font-serif italic text-[#4A5D4E]" aria-hidden="true">01</div>
            {/* SEO: H3 con palabra clave específica */}
            <h3 className="text-2xl font-serif">Tejido de 200 Hilos</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Elevamos el estándar de las <strong>medias premium </strong>. Mientras otros usan 120 hilos, nuestra fabricación asegura una densidad superior para una suavidad inigualable al tacto.
            </p>
          </motion.div>

          {/* Pilar 02 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <div className="text-6xl font-serif italic text-[#4A5D4E]" aria-hidden="true">02</div>
            {/* SEO: Frase clave exacta inyectada en el título */}
            <h3 className="text-2xl font-serif">Algodón Orgánico Certificado</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              <strong>Las medias orgánicas con 200 hilos</strong> son nuestra especialidad. Utilizamos fibras naturales que garantizan alta transpirabilidad y propiedades hipoalergénicas para el cuidado de tu piel.
            </p>
          </motion.div>

          {/* Pilar 03 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <div className="text-6xl font-serif italic text-[#4A5D4E]" aria-hidden="true">03</div>
            <h3 className="text-2xl font-serif">Ajuste Premium Anatómico</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Diseñadas para el día a día, nuestras <strong>medias de algodón orgánico</strong> no tienen costuras molestas. Un diseño que se mantiene en su lugar con elegancia y confort absoluto.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QualityPillars;