import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const instagramPosts = [
    { id: 1, image: "/galeria5.webp", url: "https://www.instagram.com/p/DW9-QYBjm3c/?img_index=1" },
    { id: 2, image: "/instagram2.png", url: "https://www.instagram.com/p/DVrKFaoDlZx/?hl=es&img_index=3" },
    { id: 3, image: "/instagram3.webp", url: "https://www.instagram.com/bdsocks.latam/" },
    { id: 4, image: "/instagram4.png", url: "https://www.instagram.com/p/DS6FhymDA47/?hl=es&img_index=3" },
    { id: 5, image: "/instagram5.png", url: "https://www.instagram.com/p/DS6FhymDA47/?hl=es&img_index=4" },
    { id: 6, image: "/instagram6.webp", url: "https://www.instagram.com/p/DS6FhymDA47/?hl=es&img_index=6" },
];

const InstagramFeed = () => {
    const instagramUrl = "https://www.instagram.com/bdsocks.latam/?hl=es";

    return (
        <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                            <FontAwesomeIcon icon={faInstagram} className="w-8 h-8 text-[#4A5D4E]" />
                            <span className="text-xs uppercase tracking-[0.4em] text-[#1A1A1A]/40 font-bold">
                                Comunidad BD
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">
                            Síguenos en Instagram
                        </h2>

                        <p className="text-[#1A1A1A]/60 max-w-md">
                            Únete a nuestra comunidad y descubre las últimas tendencias en calcetines de diseño.
                        </p>
                    </div>

                    <motion.a
                        href={instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F58529] via-[#E1306C] to-[#833AB4] text-white px-8 py-4 rounded-full font-bold tracking-widest text-xs uppercase shadow-xl shadow-[#E1306C]/30 hover:scale-[1.02] transition-all duration-300 ring-1 ring-white/20"                    >
                        Ir al Perfil
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-4 h-4" />
                    </motion.a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {instagramPosts.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href={post.url}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-square bg-[#F1EFE9] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <img
                                src={post.image}
                                alt={`Instagram post ${post.id}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                                referrerPolicy="no-referrer"
                            />

                            <div className="absolute inset-0 bg-[#4A5D4E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <FontAwesomeIcon icon={faInstagram} className="text-white w-8 h-8" />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramFeed;