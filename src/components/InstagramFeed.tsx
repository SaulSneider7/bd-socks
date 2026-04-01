import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const InstagramFeed = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <FontAwesomeIcon icon={faInstagram} className="w-8 h-8 mx-auto mb-4 text-[#4A5D4E]" />
          <h2 className="text-3xl font-serif mb-2 text-[#1A1A1A]">Síguenos en Instagram</h2>
          <a href="https://www.instagram.com/bdsocks.latam/?hl=es" target="_blank" rel="noreferrer" className="text-[#1A1A1A]/40 hover:text-[#4A5D4E] transition-colors">@bdsocks.latam</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-square bg-[#F1EFE9] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={`https://picsum.photos/seed/insta${i}/400/400`} className="w-full h-full object-cover hover:scale-105 transition-all duration-500" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
