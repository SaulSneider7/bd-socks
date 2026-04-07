import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import productsData from '../products.json';

const FeaturedProducts = () => {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#4A5D4E]"></div>
              <span className="text-xs uppercase tracking-[0.4em] text-[#4A5D4E] font-bold">Selección Especial</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-[#1A1A1A] leading-tight">Lo Más <span className="italic">Destacado</span></h2>
          </div>
          <Link to="/catalogo" className="group inline-flex items-center text-sm uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#4A5D4E] transition-all">
            Ver Todo el Catálogo
            <FontAwesomeIcon icon={faArrowRight} className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {productsData.slice(0, 3).map((product) => (
            <Link key={product.id} to="/catalogo" className="group block">
              <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-[#f8f6f1] via-[#e8e1d4] to-[#d8d0c2] shadow-[0_12px_35px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]">
                <div className="h-full rounded-[2rem] overflow-hidden bg-[#F7F3EB] flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10" />

                    <div className="absolute top-5 left-5">
                      <div className="bg-white/75 backdrop-blur-xl border border-white/60 px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
                        <FontAwesomeIcon icon={faStar} className="text-[#4A5D4E] text-[10px]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]">
                          Premium
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between flex-1 px-6 py-6 bg-[#F7F3EB] border-t border-[#E7E0D2]">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]/40 font-semibold mb-3">
                        Algodón Orgánico
                      </p>

                      <h3 className="font-serif text-[1.7rem] leading-[1.15] text-[#1A1A1A] group-hover:text-[#4A5D4E] transition-colors duration-300">
                        {product.name}
                      </h3>

                      <p className="mt-3 text-[15px] leading-relaxed text-[#1A1A1A]/55 max-w-[26ch]">
                        Diseño cómodo, moderno y versátil para elevar tu estilo diario.
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-[#E7E0D2] flex items-end justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/35 font-semibold mb-1">
                          Edición especial
                        </p>
                        <span className="text-sm text-[#1A1A1A]/50">
                          Disponible ahora
                        </span>
                      </div>

                      <p className="text-[#4A5D4E] font-semibold text-[1.7rem] tracking-tight">
                        S/ {product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
