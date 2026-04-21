import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer className="bg-[#1A1A1A] text-white py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="space-y-6">
          <div className="text-2xl font-serif tracking-tighter text-[#C5A059]">BD SOCKS</div>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Elevando el estándar de los calcetines a través del diseño europeo y el algodón orgánico de 200 hilos.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/bdsocks.latam/?hl=es" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#4A5D4E] hover:border-[#4A5D4E] transition-all">
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
            </a>
            <a href="mailto:administracion@bd-eco.com" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#4A5D4E] hover:border-[#4A5D4E] transition-all">
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-[#C5A059]/60">Navegación</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-[#C5A059] transition-colors">Inicio</Link></li>
            <li><Link to="/catalogo" className="hover:text-[#C5A059] transition-colors">Catálogo</Link></li>
            <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#C5A059] transition-colors">Nosotros</button></li>
            <li><button onClick={() => document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#C5A059] transition-colors">Tiendas</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-[#C5A059]/60">Sede Central</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li className="flex items-start">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-[#C5A059]" />
              Lima, Perú
            </li>
            <li className="flex items-start">
              <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-[#C5A059]" />
              +51 967 395 991
            </li>
            <li className="flex items-start">
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-[#C5A059]" />
              administracion@bd-eco.com
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 text-center md:text-left">
        <div className="space-y-1">
          <div>© {new Date().getFullYear()} BD SOCKS TODOS LOS DERECHOS RESERVADOS.</div>
          <div >BD DRY CLEAN EIRL | RUC: 20612173584</div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-1">
          <div className="text-white/20">ELEGANTE • CALIDAD • DISEÑO</div>
          <div className="flex items-center">
            DISEÑADO POR <a href="https://tu-sitioweb.com" target="_blank" rel="noreferrer" className="text-white/50 mx-1 hover:text-[#C5A059] transition-colors decoration-dotted underline underline-offset-4">
              TU SITIOWEB
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
