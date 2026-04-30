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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[28px] bg-white border border-[#1A1A1A]/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition-all duration-500"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Fondo suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#F8F7F3] pointer-events-none" />

      <div className="relative p-4">
        {/* Imagen del producto */}
        <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-[#F3F0E8]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 z-[1]" />

          <img
            src={product.image}
            alt={`Medias de algodón orgánico ${product.name} - Calidad 200 hilos`}
            itemProp="image"
            referrerPolicy="no-referrer"
            onClick={() => onPreview(product.image)}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-[1.08]"
          />

          {/* Botón de vista previa */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
            <button
              type="button"
              onClick={() => onPreview(product.image)}
              title="Vista previa detallada"
              aria-label="Vista previa detallada"
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1A1A1A] shadow-lg hover:bg-[#4A5D4E] hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faExpand} className="text-sm" />
            </button>
          </div>

          {/* Botón añadir al carrito */}
          <div className="absolute inset-x-4 bottom-4 z-10">
            {/* Mobile */}
            <button
              type="button"
              onClick={() => addToCart(product, selectedSize)}
              className="w-full md:hidden rounded-2xl bg-[#4A5D4E] text-white py-3.5 text-xs uppercase tracking-[0.22em] font-bold shadow-[0_14px_30px_rgba(74,93,78,0.28)] active:scale-[0.98] transition-all"
            >
              <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
              Añadir
            </button>

            {/* Desktop */}
            <div className="hidden md:block translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button
                type="button"
                onClick={() => addToCart(product, selectedSize)}
                className="w-full rounded-2xl bg-[#4A5D4E] text-white py-4 text-xs uppercase tracking-[0.24em] font-bold shadow-[0_18px_35px_rgba(74,93,78,0.30)] hover:bg-[#3D4D40] transition-all"
              >
                <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>

        {/* Información del producto */}
        <div className="relative px-2 pt-5 pb-2">
          <div className="flex items-start justify-between gap-4 mb-3">
            {/* Nombre */}
            <div className="min-w-0">
              <h3
                itemProp="name"
                className="text-[1.45rem] leading-tight font-serif text-[#1A1A1A] group-hover:text-[#4A5D4E] transition-colors"
              >
                {product.name}
              </h3>

              {product.description && (
                <meta itemProp="description" content={product.description} />
              )}
            </div>

            {/* Precio */}
            <div
              className="shrink-0 text-right"
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#1A1A1A]/35 font-bold mb-1">
                Precio
              </p>

              <meta itemProp="priceCurrency" content="PEN" />
              <meta itemProp="price" content={product.price.toString()} />
              <meta itemProp="availability" content="https://schema.org/InStock" />

              <span className="inline-block rounded-full bg-[#EEF3EE] px-4 py-2 text-lg font-bold text-[#4A5D4E] shadow-sm">
                S/ {product.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Tallas */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#1A1A1A]/45">
                  Tallas Disponibles
                </span>

                <div className="h-px flex-1 bg-[#1A1A1A]/[0.08]" />
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[62px] h-11 px-4 rounded-xl text-sm font-bold border transition-all ${selectedSize === size
                      ? 'bg-[#4A5D4E] text-white border-[#4A5D4E] shadow-[0_10px_20px_rgba(74,93,78,0.18)]'
                      : 'bg-white text-[#1A1A1A]/70 border-[#1A1A1A]/10 hover:border-[#4A5D4E]/40 hover:text-[#4A5D4E] hover:bg-[#F8FAF8]'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
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
    <section className="pt-32 pb-24 px-6 min-h-screen bg-[#F9F7F2]" aria-labelledby="catalog-main-title">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-16 gap-12">
          {/* Bloque Izquierdo: Título y Descripción Principal */}
          <div className="flex-1 max-w-4xl">
            <Link to="/" className="inline-flex items-center text-xs uppercase tracking-widest text-[#1A1A1A]/40 font-bold mb-6 hover:text-[#1A1A1A] transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3 mr-2" /> Volver al Inicio
            </Link>

            <h1 id="catalog-main-title" className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] tracking-tight leading-[1.1]">
              Catálogo <br className="hidden md:block" />
              <span className="text-[#4A5D4E]">Calcetines de algod&oacute;n Org&aacute;nico</span>
            </h1>

            <p className="mt-8 text-[#1A1A1A]/70 text-lg md:text-xl font-light leading-relaxed">
              Explora nuestra colección de calcetines, diseñados sin costuras y con propiedades hipoalergénicas para brindarte máxima comodidad, cuidando tu piel y el planeta.
            </p>
          </div>
        </div>

        {/* SEO: Lista de productos organizada */}
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

      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1A1A]/95 backdrop-blur-md"
            onClick={() => setPreviewImage(null)}
          >
            <button
              onClick={() => setPreviewImage(null)}
              aria-label="Cerrar vista previa"
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
                alt="Detalle de medias premium"
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