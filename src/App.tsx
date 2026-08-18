import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import QualityPillars from './components/QualityPillars';
import FeaturedProducts from './components/FeaturedProducts';
import Testimonials from './components/Testimonials';
import InstagramFeed from './components/InstagramFeed';
import Locations from './components/Locations';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import CatalogPage from './components/CatalogPage';
import CartSidebar from './components/CartSidebar';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

// Types
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    sizes?: string[];
}

interface CartItem extends Product {
    quantity: number;
    selectedSize?: string;
}

// --- Home Page Component ---
const HomePage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <>
            <Hero />
            <Philosophy />
            <QualityPillars />
            <FeaturedProducts />
            <Gallery />
            <Testimonials />
            <InstagramFeed />
            <Locations />
            <Contact />
        </>
    );
};

// --- Main App Component ---
export default function App() {
    // 1. Estado del Carrito con LocalStorage
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('bd_socks_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('bd_socks_cart', JSON.stringify(cart));
    }, [cart]);

    // 2. Lógica del Carrito
    const addToCart = (product: Product, size?: string) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
            if (existing) {
                return prev.map(item =>
                    (item.id === product.id && item.selectedSize === size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1, selectedSize: size }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const cartTotal = useMemo(() =>
        cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        [cart]);

    const cartCount = useMemo(() =>
        cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]);

    // 3. Checkout vía WhatsApp
    const handleCheckout = () => {
        const phoneNumber = "51967395991";
        let message = "¡Hola BD SOCKS! Me gustaría realizar el siguiente pedido:\n\n";

        cart.forEach(item => {
            const sizeInfo = item.selectedSize ? ` [Talla: ${item.selectedSize}]` : "";
            message += `• ${item.name}${sizeInfo} x${item.quantity} - S/ ${(item.price * item.quantity).toFixed(2)}\n`;
        });

        message += `\n*Total a pagar: S/ ${cartTotal.toFixed(2)}*`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

        // Opcional: Limpiar carrito tras pedido
        // setCart([]);
        // setIsCartOpen(false);
    };

    return (

        <Router>
            <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] selection:bg-[#4A5D4E] selection:text-white flex flex-col">

                <Navbar cartCount={cartCount} setIsCartOpen={setIsCartOpen} />

                <main className="flex-1" role="main">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/catalogo"
                            element={<CatalogPage addToCart={addToCart} />}
                        />
                    </Routes>
                </main>

                <Footer />

                <CartSidebar
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cart={cart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    cartTotal={cartTotal}
                    onCheckout={handleCheckout}
                />

                <WhatsAppFloatingButton />
            </div>
        </Router>

    );
}