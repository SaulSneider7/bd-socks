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
            ¿Por qué elegir nuestros <span className="text-[#C5A059]">calcetines</span>?
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
            <h3 className="text-2xl font-serif">Tejido de 200 ahujas</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Nuestras <strong>calcetines de algodón orgánico</strong> están elaboradas con 200 hilos, lo que proporciona una textura más fina, suave y resistente. Su tejido de alta densidad mejora la durabilidad y el confort, ofreciendo una experiencia superior en cada uso.
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
            <h3 className="text-2xl font-serif">Algodón Orgánico</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              El <strong>algodón orgánico</strong> ofrece suavidad natural, mayor frescura y cero químicos agresivos. Es ideal para pieles sensibles y reduce el impacto ambiental desde su cultivo hasta el producto final. Además, su fibra pura mejora la transpirabilidad, la durabilidad y la comodidad diaria. Un material responsable que cuida tus pies y también al planeta.
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
            <h3 className="text-2xl font-serif">Ajuste Anatómico</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Diseñadas para el dia a dia y un acabado sin costuras, que potencian la suavidad del algodón orgánico, brindando una experiencia cómoda, responsable y libre de molestias.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QualityPillars;