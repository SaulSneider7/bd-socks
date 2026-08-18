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
              Calcetines <span className="italic">BD Socks</span>
            </h2>
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
              <meta itemProp="brand" content="BD SOCKS" />

              <div className="rounded-[2rem] p-[1px] bg-gradient-to-b from-[#f8f6f1] via-[#e8e1d4] to-[#d8d0c2] shadow-[0_12px_35px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]">
                <div className="h-full rounded-[2rem] overflow-hidden bg-[#F7F3EB] flex flex-col">

                  {/* Imagen */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={product.image}
                      alt={`Medias premium ${product.name}`}
                      itemProp="image"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-4 px-6 py-6 bg-[#F7F3EB] border-t border-[#E7E0D2]">
                    <h3
                      itemProp="name"
                      className="font-serif text-[1.7rem] leading-[1.15] text-[#1A1A1A] group-hover:text-[#4A5D4E] transition-colors duration-300"
                    >
                      {product.name}
                    </h3>

                    {/* Precio */}
                    <div
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                    >
                      <meta itemProp="priceCurrency" content="PEN" />
                      <meta itemProp="availability" content="https://schema.org/InStock" />

                      <p className="text-[#4A5D4E] font-semibold text-[1.7rem] tracking-tight">
                        S/{" "}
                        <span itemProp="price" content={product.price.toString()}>
                          {product.price.toFixed(2)}
                        </span>
                      </p>
                    </div>

                    {/* Tallas */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#1A1A1A]/45 mb-2">
                          Tallas
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <span
                              key={size}
                              className="min-w-[62px] h-11 px-4 rounded-xl bg-white text-[#1A1A1A]/70 border border-[#1A1A1A]/10 text-sm font-bold flex items-center justify-center"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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