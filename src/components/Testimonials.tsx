const Testimonials = () => {
  return (
    <section className="py-32 bg-[#4A5D4E] text-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif italic">La Experiencia BD SOCKS</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/10 p-12 rounded-3xl border border-white/20 backdrop-blur-sm">
            <p className="text-xl font-serif italic mb-8 leading-relaxed">
              "Nunca pensé que unos calcetines pudieran hacer tanta diferencia. La suavidad es increíble y después de varios lavados siguen como nuevos."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#C5A059] mr-4"></div>
              <div>
                <p className="font-bold text-sm uppercase tracking-widest">Carlos R.</p>
                <p className="text-xs text-white/60">Cliente Verificado</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 p-12 rounded-3xl border border-white/20 backdrop-blur-sm">
            <p className="text-xl font-serif italic mb-8 leading-relaxed">
              "El diseño minimalista es perfecto para mi estilo. Se nota la calidad de los 200 hilos desde el momento en que te los pones."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#C5A059] mr-4"></div>
              <div>
                <p className="font-bold text-sm uppercase tracking-widest">Andrea M.</p>
                <p className="text-xs text-white/60">Cliente Verificado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
