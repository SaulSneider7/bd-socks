import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import productsData from '../products.json';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CatalogPageProps {
  addToCart: (p: Product) => void;
}

const CatalogPage = ({ addToCart }: CatalogPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-32 pb-24 px-6 min-h-screen bg-[#F9F7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Link to="/" className="inline-flex items-center text-xs uppercase tracking-widest text-[#1A1A1A]/40 font-bold mb-4 hover:text-[#1A1A1A] transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3 mr-2" /> Volver al Inicio
            </Link>
            <h2 className="text-5xl font-serif text-[#1A1A1A]">Catálogo Premium</h2>
          </div>
          <p className="text-[#1A1A1A]/50 max-w-xs text-sm italic">
            Algodón orgánico de 200 hilos para una suavidad sin precedentes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {productsData.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[3/4] bg-[#F1EFE9] overflow-hidden rounded-xl mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 left-4 right-4 bg-[#4A5D4E] text-white py-3 rounded-lg text-xs uppercase tracking-widest font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#3D4D40] shadow-lg shadow-[#4A5D4E]/20"
                >
                  Añadir al Carrito
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-serif mb-1 text-[#1A1A1A]">
                  {product.name}
                </h3>

                <p className="text-xs text-[#1A1A1A]/40 uppercase tracking-wider mb-2">
                  {product.description.split(',')[0]}
                </p>

                <span className="font-bold text-lg text-[#4A5D4E]">
                  S/ {product.price.toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;
