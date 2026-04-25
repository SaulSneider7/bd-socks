import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import productsData from '../products.json';

const FeaturedProducts = () => {
  return (
    <section className="py-32 px-6 bg-white" aria-labelledby="featured-title">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            {/* SEO: H2 con keyword principal */}
            <h2 id="featured-title" className="text-5xl md:text-6xl font-serif text-[#1A1A1A] leading-tight">
              Medias <span className="italic">destacadas</span>
            </h2>

            {/* BLOQUE SEO INTEGRADO */}
            <p className="mt-8 text-[#1A1A1A]/70 leading-relaxed max-w-lg text-[15px]">
              Nuestras <strong>medias orgánicas de 200 hilos</strong> establecen un nuevo estándar de confort y responsabilidad. Confeccionadas con <strong>algodón orgánico</strong>, ofrecen una transpirabilidad superior y una suavidad natural que eleva el uso diario. Su producción sostenible reduce el impacto ambiental sin comprometer la durabilidad ni la elegancia de un producto premium.
            </p>
          </div>

          <Link to="/catalogo" className="group inline-flex items-center text-sm uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#4A5D4E] transition-all">
            Ver Catálogo Completo
            <FontAwesomeIcon icon={faArrowRight} className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {productsData.slice(0, 3).map((product) => (
            <Link
              key={product.id}
              to="/catalogo"
              className="group block"
              itemScope
              itemType="https://schema.org/Product"
            >
              {/* 1. AGREGAR MARCA (Evita avisos de Google) */}
              <meta itemProp="brand" content="BD SOCKS" />
              {/* 2. AGREGAR CONDICIÓN (Obligatorio para algunos tipos de búsqueda) */}
              <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="hidden">
                <meta itemProp="itemCondition" content="https://schema.org/NewCondition" />
              </div>

              <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-[#f8f6f1] via-[#e8e1d4] to-[#d8d0c2] shadow-[0_12px_35px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]">
                <div className="h-full rounded-[2rem] overflow-hidden bg-[#F7F3EB] flex flex-col">

                  {/* Contenedor de Imagen */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={product.image}
                      alt={`Medias premium ${product.name} de algodón orgánico`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      itemProp="image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10" />
                  </div>

                  <div className="flex flex-col justify-between flex-1 px-6 py-6 bg-[#F7F3EB] border-t border-[#E7E0D2]">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]/40 font-semibold mb-3">
                        {/* CORRECCIÓN: Google a veces no reconoce itemProp="category" en Product, usamos un texto plano */}
                        <span>Medias de Algodón Orgánico</span>
                      </p>

                      <h3
                        itemProp="name"
                        className="font-serif text-[1.7rem] leading-[1.15] text-[#1A1A1A] group-hover:text-[#4A5D4E] transition-colors duration-300"
                      >
                        {product.name}
                      </h3>

                      <p
                        itemProp="description"
                        className="mt-3 text-[15px] leading-relaxed text-[#1A1A1A]/55 max-w-[26ch]"
                      >
                        Medias premium con tejido de 200 hilos para una suavidad y durabilidad superior.
                      </p>
                    </div>

                    {/* SEO: Oferta y Precio */}
                    <div
                      className="mt-6 pt-5 border-t border-[#E7E0D2] flex items-end justify-between"
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                    >
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#1A1A1A]/35 font-semibold mb-1">
                          Diseño Exclusivo
                        </p>
                        <link itemProp="availability" href="https://schema.org/InStock" />
                        <span className="text-sm text-[#1A1A1A]/50">Stock limitado</span>
                      </div>

                      <div className="text-right">
                        {/* IMPORTANTE: El meta de moneda debe estar dentro del div con itemProp="offers" */}
                        <meta itemProp="priceCurrency" content="PEN" />
                        <p
                          className="text-[#4A5D4E] font-semibold text-[1.7rem] tracking-tight"
                        >
                          S/ <span itemProp="price" content={product.price.toString()}>{product.price.toFixed(2)}</span>
                        </p>
                      </div>
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