const Philosophy = () => {
  return (
    <section id="philosophy" className="py-32 px-6 bg-[#F1EFE9]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img src="/nosotros1.jpg" className="rounded-2xl shadow-xl" referrerPolicy="no-referrer" />
              <img src="/nosotros2.jpg" className="rounded-2xl shadow-xl mt-12" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.4em] text-[#C5A059] font-bold mb-4 block">Nuestra Esencia</span>
            <h2 className="text-5xl font-serif mb-8 leading-tight text-[#1A1A1A]">Alma Peruana, <br /><span className="italic text-[#4A5D4E]">Diseño Europeo.</span></h2>
            <div className="space-y-6 text-[#1A1A1A]/70 leading-relaxed">
              <p>
                BD SOCKS nace de la pasión por los detalles y la búsqueda de la perfección. Inspirados en la elegancia atemporal del diseño europeo, decidimos utilizar el recurso más valioso de nuestra tierra: el algodón orgánico peruano.
              </p>
              <p>
                No solo fabricamos calcetines; creamos una prenda esencial que redefine el lujo cotidiano. Cada par es el resultado de un proceso meticuloso donde la durabilidad y la suavidad superior se encuentran.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[#4A5D4E] font-bold text-sm uppercase tracking-widest mb-2">Misi&oacute;n</h4>
                  <p className="text-xs">Elevar el estándar de comodidad y estilo en el mercado latinoamericano.</p>
                </div>
                <div>
                  <h4 className="text-[#4A5D4E] font-bold text-sm uppercase tracking-widest mb-2">Visi&oacute;n</h4>
                  <p className="text-xs">Ser reconocidos globalmente como el referente de calcetines de algodón orgánico.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
