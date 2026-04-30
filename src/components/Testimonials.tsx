import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Carlos R.",
    text: "Me encantaron . La suavidad es increible y despues de varias lavadas siguen como nuevos.",
    role: "Cliente Verificado",
    city: "Lima"
  },
  {
    name: "Andrea M.",
    text: "El diseño minimalista es perfecto para mi estilo. Se nota la calidad de los 200 hilos desde el momento en que te los pones.",
    role: "Cliente Verificado",
    city: "Miraflores"
  },
  {
    name: "Ricardo G.",
    text: "Buscaba calcetines de buena calidad para el día a día y estas superaron mis expectativas. No se bajan y el ajuste es perfecto.",
    role: "Ejecutivo",
    city: "San Isidro"
  },
  {
    name: "Lucía F.",
    text: "Excelente atención y el producto es de otro nivel. Son las mejores medias de algodón orgánico que he comprado en Lima.",
    role: "Cliente Verificado",
    city: "Surco"
  },
  {
    name: "Mateo S.",
    text: "Ideales para regalo. El empaque y la calidad de los calcetines demuestran que cuidan cada detalle.",
    role: "Cliente Verificado",
    city: "La Molina"
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-32 bg-[#4A5D4E] text-white px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Encabezado SEO */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif italic mb-6">
            La Experiencia <span className="text-[#C5A059]">BD SOCKS</span>
          </h2>
          <p className="text-white/60 uppercase tracking-[0.2em] text-xs font-bold">
            Lo que dicen de nuestros calcetines
          </p>
        </div>

        <div className="relative">
          {/* Contenedor de Testimonios con AnimatePresence */}
          <div className="relative min-h-[350px] md:min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.article
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full text-center"
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Microdatos para Google */}
                <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Product" className="hidden">
                  <span itemProp="name">Medias Premium BD SOCKS</span>
                </div>

                <span className="text-6xl font-serif text-[#C5A059]/30 leading-none" aria-hidden="true">“</span>
                <blockquote className="text-2xl md:text-3xl font-serif italic mb-10 leading-snug px-4 md:px-12">
                  <span itemProp="reviewBody">{testimonials[current].text}</span>
                </blockquote>

                <div className="flex flex-col items-center" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <div className="w-1 h-8 bg-[#C5A059] mb-4"></div>
                  <p className="font-bold text-sm uppercase tracking-[0.3em]" itemProp="name">
                    {testimonials[current].name}
                  </p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                    {testimonials[current].role} — {testimonials[current].city}, PE
                  </p>
                </div>
                {/* CORRECCIÓN AQUÍ: Se cierra como motion.article */}
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Navegación Minimalista */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#C5A059] hover:border-[#C5A059] transition-all group"
              aria-label="Anterior testimonio"
            >
              <svg className="w-5 h-5 rotate-180 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Indicadores de posición */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1 transition-all duration-500 ${current === i ? 'w-8 bg-[#C5A059]' : 'w-2 bg-white/20'}`}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#C5A059] hover:border-[#C5A059] transition-all group"
              aria-label="Siguiente testimonio"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;