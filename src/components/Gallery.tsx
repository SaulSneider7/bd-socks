import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface GalleryItem {
    id: number;
    src: string;
    alt: string;
    category?: string;
}

// SEO: Alt texts enriquecidos con palabras clave estratégicas
const galleryItems: GalleryItem[] = [
    { id: 1, src: "/galeria1.webp", alt: "Medias premium BD SOCKS estilo alto en algodón orgánico", category: "Urban" },
    { id: 2, src: "/galeria2.webp", alt: "Calcetines de vestir diseño cuadrado 200 hilos", category: "Classic" },
    { id: 3, src: "/galeria3.webp", alt: "Tendencias en medias orgánicas de alta calidad", category: "New" },
    { id: 4, src: "/galeria4.webp", alt: "Medias minimalistas BD SOCKS colección esencial", category: "Essential" },
    { id: 5, src: "/galeria5.webp", alt: "Calcetines urbanos con tejido de 200 hilos", category: "Street" },
    { id: 6, src: "/galeria6.webp", alt: "Detalle de costuras y acabado de medias premium", category: "Detail" },
    { id: 7, src: "/galeria7.webp", alt: "Nueva colección de medias orgánicas exclusivas", category: "Limited" },
    { id: 8, src: "/galeria8.webp", alt: "Catálogo de calcetines premium BD SOCKS", category: "Collection" },
];

const Gallery: React.FC = () => {
    return (
        <section id="gallery" className="py-20 md:py-24 bg-[#F9F7F2]" aria-labelledby="gallery-title">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header SEO Optimizado */}
                <div className="text-center mb-16">
                    <motion.h2
                        id="gallery-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-4"
                    >
                        Inspiración en <span className="text-[#B59410] italic">Medias Premium</span>
                    </motion.h2>
                    <div className="w-20 h-1 bg-[#B59410] mx-auto mb-6" aria-hidden="true" />
                    <p className="text-lg text-[#1A1A1A]/60 max-w-2xl mx-auto font-light">
                        <strong>Calidad excepcional de 200 hilos</strong> en cada detalle. Explora el estilo y la suavidad de nuestras <strong>medias de algodón orgánico</strong>.
                    </p>
                </div>

                {/* Grid con Microdatos de Galería */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" itemScope itemType="https://schema.org/ImageGallery">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group relative aspect-square overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-500"
                            itemProp="associatedMedia"
                            itemScope
                            itemType="https://schema.org/ImageObject"
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                loading="lazy"
                                itemProp="contentUrl"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Información invisible para el bot de Google */}
                            <meta itemProp="name" content={item.alt} />

                            <div className="absolute inset-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
                        </motion.div>
                    ))}
                </div>

                {/* Footer de Galería Premium */}
                <div className="mt-20 border-t border-[#1A1A1A]/5 pt-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                        {/* Branding / Semántica de Marca */}
                        <div className="flex flex-col items-center md:items-start">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-[#B59410] flex items-center justify-center text-white">
                                    <FontAwesomeIcon icon={faHashtag} size="sm" />
                                </div>
                                <span className="text-xl font-serif font-bold text-[#1A1A1A] uppercase tracking-wider">Socks with Stories</span>
                            </div>
                            <p className="text-[#1A1A1A]/50 text-sm font-light">
                                Únete a nuestra comunidad y descubre el confort del algodón premium.
                            </p>
                        </div>

                        {/* CTA Principal con Atributos de Título */}
                        <Link to="/catalogo" className="relative group block" title="Ver colección de medias orgánicas">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-full px-10 py-4 overflow-hidden rounded-full bg-[#1A1A1A] text-white font-bold transition-all duration-300"
                            >
                                <div className="absolute inset-0 w-0 bg-[#B59410] transition-all duration-300 ease-out group-hover:w-full" />

                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Explorar Colección Completa
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </span>
                            </motion.button>
                        </Link>

                        {/* Redes Sociales con Rel Noopener */}
                        <a
                            href="https://www.instagram.com/bdsocks.latam"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 hover:opacity-80 transition-opacity"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-[#1A1A1A] font-bold text-sm">Síguenos en Instagram</p>
                                <p className="text-[#B59410] text-xs font-medium">@bdsocks.latam</p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl text-[#1A1A1A] group-hover:text-[#B59410] transition-colors duration-300">
                                <FontAwesomeIcon icon={faInstagram} aria-label="Instagram de BD SOCKS" />
                            </div>
                        </a>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;