const Philosophy = () => {
  return (
    <section id="about" className="py-32 px-6 bg-[#F1EFE9]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1" aria-label="Galería de productos BD SOCKS">
            <div className="grid grid-cols-2 gap-4">
              <figure>
                <img
                  src="/nosotros1.jpg"
                  alt="Colección de medias premium BD SOCKS en algodón orgánico"
                  title="Medias Premium de Algodón"
                  className="rounded-2xl shadow-xl w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {/* Opcional: una descripción invisible para lectores de pantalla que refuerza el SEO */}
                <figcaption className="sr-only">Detalle del tejido de nuestras medias de 200 hilos.</figcaption>
              </figure>

              <figure>
                <img
                  src="/nosotros2.webp"
                  alt="Variedad de calcetines y medias orgánicas con 200 hilos"
                  title="Medias Orgánicas 200 Hilos"
                  className="rounded-2xl shadow-xl mt-12 w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <figcaption className="sr-only">Presentación de empaque premium BD SOCKS.</figcaption>
              </figure>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.4em] text-[#C5A059] font-bold mb-4 block">Marca Peruana</span>
            <h2 className="text-5xl font-serif mb-8 leading-tight text-[#1A1A1A]">Alma Peruana, <br /><span className="italic text-[#4A5D4E]">Diseño Europeo.</span></h2>
            <div className="space-y-6 text-[#1A1A1A]/70 leading-relaxed">
              <p>
                <strong> BD SOCKS es una marca peruana de calcetines de alta gama, elaborados con algodón orgánico certificado y diseñados bajo los más altos estándares internacionales.</strong> Inspirados en la sofisticación del diseño europeo, ofrecemos productos reconocidos por su <strong>durabilidad, suavidad superior y acabado impecable</strong>, gracias a un tejido de <strong>200 hilos</strong> que garantiza una textura refinada y resistencia excepcional.
              </p>
              <p>
                Nuestros calcetines brindan <strong>comodidad absoluta</strong>, con un <strong>ajuste perfecto</strong>, diseño <strong>sin costuras</strong>, alta transpirabilidad y propiedades <strong>hipoalergénicas</strong> que cuidan la piel y evitan irritaciones. Cada par ofrece una experiencia fresca, protegida y confortable desde el primer paso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
