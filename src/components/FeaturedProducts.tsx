import { Link } from 'react-router-dom';
import productsData from '../products.json';

const FeaturedProducts = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-[#1A1A1A]/40 font-bold mb-4 block">Selección Especial</span>
            <h2 className="text-5xl font-serif text-[#1A1A1A]">Lo Más Destacado</h2>
          </div>
          <Link to="/catalogo" className="text-sm uppercase tracking-widest font-bold border-b border-[#1A1A1A] pb-1 hover:text-[#1A1A1A]/50 transition-colors text-[#1A1A1A]">
            Ver Todo el Catálogo
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {productsData.slice(0, 3).map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] bg-[#F1EFE9] rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <h3 className="font-serif text-xl mb-1 text-[#1A1A1A]">{product.name}</h3>
              <p className="text-[#1A1A1A]/40 text-sm uppercase tracking-widest">S/ {product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
