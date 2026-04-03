import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faExpand, faCartPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import productsData from '../products.json';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes?: string[];
}

interface CatalogPageProps {
  addToCart: (p: Product, size?: string) => void;
}

const ProductCard: React.FC<{
  product: Product,
  addToCart: (p: Product, s?: string) => void,
  onPreview: (img: string) => void
}> = ({ product, addToCart, onPreview }) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#1A1A1A]/5"
    >
      <div className="relative aspect-[3/4] bg-[#F1EFE9] overflow-hidden rounded-2xl mb-6 shadow-inner">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 cursor-pointer"
          referrerPolicy="no-referrer"
          onClick={() => onPreview(product.image)}
        />

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button
            onClick={() => onPreview(product.image)}
            className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#4A5D4E] hover:text-white transition-colors shadow-lg"
            title="Vista Previa"
          >
            <FontAwesomeIcon icon={faExpand} className="text-sm" />
          </button>
        </div>

        {/* Mobile Add to Cart (Always visible) */}
        <button
          onClick={() => addToCart(product, selectedSize)}
          className="md:hidden absolute bottom-4 left-4 right-4 bg-[#4A5D4E] text-white py-3 rounded-xl text-xs uppercase tracking-widest font-bold shadow-lg shadow-[#4A5D4E]/20"
        >
          <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
          Añadir
        </button>

        {/* Desktop Add to Cart (Hover) */}
        <div className="hidden md:flex absolute inset-x-4 bottom-4 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => addToCart(product, selectedSize)}
            className="w-full bg-[#4A5D4E] text-white py-4 rounded-xl text-xs uppercase tracking-widest font-bold shadow-xl shadow-[#4A5D4E]/30 hover:bg-[#3D4D40] transition-colors"
          >
            <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
            Añadir al Carrito
          </button>
        </div>
      </div>

      <div className="px-2">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-serif mb-1 text-[#1A1A1A] group-hover:text-[#4A5D4E] transition-colors">{product.name}</h3>
            <p className="text-[10px] text-[#1A1A1A]/40 uppercase tracking-[0.2em] font-bold">{product.description.split(',')[0]}</p>
          </div>
          <span className="font-bold text-lg text-[#4A5D4E]">S/ {product.price.toFixed(2)}</span>
        </div>

        {product.sizes && (
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-widest text-[#1A1A1A]/40 font-bold">Talla:</span>
            <div className="flex gap-1">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-16 h-10 rounded-lg font-bold transition-all border ${selectedSize === size
                      ? 'bg-[#4A5D4E] text-white border-[#4A5D4E] shadow-md'
                      : 'bg-white text-[#1A1A1A]/60 border-[#1A1A1A]/10 hover:border-[#4A5D4E]'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CatalogPage = ({ addToCart }: CatalogPageProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
            <h2 className="text-5xl md:text-6xl font-serif text-[#1A1A1A] tracking-tight">Catálogo <span className="text-[#4A5D4E]">Premium</span></h2>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[#1A1A1A]/5 max-w-xs">
            <p className="text-[#1A1A1A]/90 text-sm leading-relaxed italic">
              "La elegancia comienza en los pies. Algodón orgánico de 200 hilos para una suavidad sin precedentes."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {productsData.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              onPreview={setPreviewImage}
            />
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1A1A]/95 backdrop-blur-md"
            onClick={() => setPreviewImage(null)}
          >
            {/* Close Button - Fixed to top right of screen for easy access */}
            <button
              onClick={() => setPreviewImage(null)}
              className="fixed top-6 right-6 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[110] border border-white/20"
            >
              <FontAwesomeIcon icon={faXmark} className="text-lg md:text-xl" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={previewImage}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                alt="Vista previa"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CatalogPage;
