import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faShoppingBag, faMinus, faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  cartTotal: number;
  onCheckout: () => void;
}

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  cart, 
  removeFromCart, 
  updateQuantity, 
  cartTotal, 
  onCheckout 
}: CartSidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-[#1A1A1A]/5 flex items-center justify-between bg-[#F9F7F2]">
              <h2 className="text-2xl font-serif text-[#1A1A1A]">Tu Carrito</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[#1A1A1A]/5 rounded-full transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="w-6 h-6 text-[#1A1A1A]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F9F7F2]">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#1A1A1A]/40 space-y-4">
                  <FontAwesomeIcon icon={faShoppingBag} className="w-12 h-12" />
                  <p className="font-serif italic text-lg">Tu carrito está vacío</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 aspect-[3/4] bg-[#F1EFE9] rounded-lg overflow-hidden shrink-0 shadow-sm">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-lg text-[#1A1A1A]">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#1A1A1A]/30 hover:text-[#1A1A1A]"
                          >
                            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm font-bold mt-1 text-[#4A5D4E]">S/ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-[#1A1A1A]/10 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:bg-[#1A1A1A]/5 text-[#1A1A1A]"><FontAwesomeIcon icon={faMinus} className="w-3 h-3" /></button>
                          <span className="w-8 text-center text-sm font-bold text-[#1A1A1A]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:bg-[#1A1A1A]/5 text-[#1A1A1A]"><FontAwesomeIcon icon={faPlus} className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-[#1A1A1A]/5 bg-[#F1EFE9]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#1A1A1A]/40 uppercase tracking-widest text-xs font-bold">Subtotal</span>
                  <span className="text-2xl font-serif text-[#1A1A1A]">S/ {cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-[#4A5D4E] text-white py-5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#3D4D40] transition-all flex items-center justify-center shadow-lg shadow-[#4A5D4E]/20"
                >
                  Finalizar Pedido vía WhatsApp
                  <FontAwesomeIcon icon={faChevronRight} className="ml-2 w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
