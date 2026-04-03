import { motion } from "framer-motion";

interface GalleryItem {
    id: number;
    type: "image" | "video";
    src: string;
    alt: string;
}

const galleryItems: GalleryItem[] = [
    { id: 1, type: "video", src: "/video_tienda.mp4", alt: "Video estilo TikTok calcetines" },
    { id: 2, type: "image", src: "/galeria1.jpeg", alt: "Calcetines BD SOCKS estilo alto" },
    { id: 3, type: "image", src: "/galeria2.jpeg", alt: "Calcetines BD SOCKS diseño cuadrado" },
    { id: 4, type: "video", src: "/video2.mp4", alt: "Video dinámico calcetines" },
    { id: 5, type: "image", src: "/galeria3.jpeg", alt: "Calcetines BD SOCKS tendencia" },
    { id: 6, type: "image", src: "/galeria4.jpeg", alt: "Calcetines BD SOCKS minimalista" },
    { id: 7, type: "image", src: "/galeria5.png", alt: "Calcetines BD SOCKS urbano" },
    { id: 8, type: "image", src: "/galeria6.png", alt: "Calcetines BD SOCKS detalle" },
    { id: 9, type: "image", src: "/galeria8.png", alt: "Detalle de colección BD SOCKS" },
    { id: 10, type: "image", src: "/galeria7.png", alt: "Nueva colección BD SOCKS" },
    { id: 11, type: "video", src: "/video.mp4", alt: "Video nueva colección" },
];

const Gallery: React.FC = () => {
    return (
        <section id="gallery" className="py-20 md:py-24 bg-[#F9F7F2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-4"
                    >
                        Nuestra Galería
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="text-base sm:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto"
                    >
                        Explora el estilo y la calidad de BD SOCKS en cada detalle.
                    </motion.p>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.45, delay: index * 0.04 }}
                            className="mb-4 break-inside-avoid"
                        >
                            <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                                {item.type === "image" ? (
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    />
                                ) : (
                                    <video
                                        src={item.src}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-white text-xs sm:text-sm font-medium tracking-wider uppercase">
                                        Ver más
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;