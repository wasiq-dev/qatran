import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import useAuthStore from '../../store/authStore';
import useCurrencyStore from '../../store/currencyStore';

const Header = () => {
  const itemCount = useCartStore(state => state.getItemCount());
  const { isAuthenticated, user } = useAuthStore();
  const { currentCurrency, currencies, setCurrency, formatPrice } = useCurrencyStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-header py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className={`text-2xl font-serif font-bold tracking-tight transition-colors ${scrolled || location.pathname !== '/' ? 'text-primary' : 'text-white'}`}>
            Qatran<span className="text-accent">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {[
              { label: 'Home', path: '/' },
              { label: 'Shop', path: '/products' },
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' }
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`text-sm font-semibold tracking-wide uppercase hover:text-accent transition-colors ${
                  scrolled || location.pathname !== '/' ? 'text-luxury-700' : 'text-white/90'
                } ${
                  location.pathname === item.path ? 'text-accent font-bold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-[11px] font-bold uppercase tracking-widest ${
                  scrolled || location.pathname !== '/' ? 'bg-luxury-100 text-luxury-700 hover:bg-primary hover:text-white' : 'bg-white/10 text-white hover:bg-white hover:text-primary'
                }`}
              >
                <Globe className="w-3 h-3" />
                {currentCurrency}
              </button>
              
              <AnimatePresence>
                {showCurrencyDropdown && (
                  <>
                    <div className="fixed inset-0 z-0" onClick={() => setShowCurrencyDropdown(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10"
                    >
                      <div className="p-2 max-h-64 overflow-y-auto">
                        {Object.keys(currencies).map((code) => (
                          <button
                            key={code}
                            onClick={() => {
                              setCurrency(code);
                              setShowCurrencyDropdown(false);
                              // Refresh page to update all prices
                              setTimeout(() => {
                                window.location.reload();
                              }, 100);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                              currentCurrency === code ? 'bg-emerald-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span>{currencies[code].label}</span>
                            {currentCurrency === code && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <form onSubmit={submitSearch} className="hidden md:block relative group">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search..."
                className={`w-40 focus:w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-10 pr-4 py-2 text-sm transition-all outline-none focus:bg-white focus:text-luxury-900 focus:border-primary/20 ${
                  scrolled || location.pathname !== '/' ? 'text-luxury-900 border-luxury-100 bg-luxury-100/50' : 'text-white placeholder:text-white/60'
                }`}
              />
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${scrolled || location.pathname !== '/' ? 'text-luxury-400' : 'text-white/60'}`} />
            </form>

            <Link to={isAuthenticated ? "/account" : "/login"} className={`hover:text-accent transition-colors flex items-center gap-2 group ${scrolled || location.pathname !== '/' ? 'text-luxury-700' : 'text-white'}`}>
              <div className={`p-2 rounded-full transition-colors ${scrolled || location.pathname !== '/' ? 'bg-luxury-100 group-hover:bg-primary group-hover:text-white' : 'bg-white/10 group-hover:bg-white group-hover:text-primary'}`}>
                <User className="w-5 h-5" />
              </div>
              {isAuthenticated && (
                <span className="text-xs font-bold uppercase tracking-widest hidden md:block">
                  Hi, {user?.fullName.split(' ')[0]}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative group">
              <div className={`p-2 rounded-full transition-colors ${scrolled || location.pathname !== '/' ? 'text-luxury-700 bg-luxury-100 group-hover:bg-primary group-hover:text-white' : 'text-white bg-white/10 group-hover:bg-white group-hover:text-primary'}`}>
                <ShoppingCart className="w-5 h-5" />
              </div>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden transition-colors ${scrolled || location.pathname !== '/' ? 'text-luxury-900' : 'text-white'}`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-luxury-900/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-serif font-bold text-primary">Qatran.</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-luxury-400 hover:text-luxury-900">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 mb-12">
              {[
                { label: 'Home', path: '/' },
                { label: 'Shop', path: '/products' },
                { label: 'About', path: '/about' },
                { label: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif font-bold text-luxury-900 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <form onSubmit={submitSearch} className="relative mb-12">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full bg-luxury-50 border border-luxury-100 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-primary"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
