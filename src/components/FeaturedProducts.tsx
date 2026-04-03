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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {productsData.slice(0, 3).map((product) => (
            <Link key={product.id} to="/catalogo" className="group block">
              <div className="relative aspect-[3/4] bg-[#F1EFE9] rounded-[2rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <FontAwesomeIcon icon={faStar} className="text-[#4A5D4E] text-[10px]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">Premium</span>
                  </div>
                </div>
              </div>
              <div className="px-4">
                <h3 className="font-serif text-2xl mb-2 text-[#1A1A1A] group-hover:text-[#4A5D4E] transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-[#1A1A1A]/40 text-xs uppercase tracking-widest font-bold">Algodón Orgánico</p>
                  <p className="text-[#4A5D4E] font-bold text-lg">S/ {product.price.toFixed(2)}</p>
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
