import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useCurrencyStore from '../store/currencyStore';
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const formatPrice = useCurrencyStore(state => state.formatPrice);

  const subtotal = getSubtotal();
  const shipping = subtotal > 500000 ? 0 : 20000; // Free shipping over 5000 PKR
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-24">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 text-slate-300">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4 text-center">Your Bag is Empty</h1>
        <p className="text-slate-500 max-w-sm mx-auto mb-12 text-center font-medium">
          Looks like you haven't added any premium essentials to your bag yet.
        </p>
        <Link to="/products" className="luxury-button-primary px-12">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">
          <Link to="/" className="hover:text-emerald-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-900">Your Shopping Bag</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-16">
          Shopping Bag <span className="text-slate-300 font-normal text-2xl md:text-4xl ml-4">({items.length} Items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col sm:flex-row gap-8 pb-8 border-b border-slate-100 group"
                  >
                    <div className="relative w-full sm:w-48 aspect-[4/5] rounded-2xl overflow-hidden bg-slate-50">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:text-emerald-900 transition-colors">
                              {item.productName}
                            </h3>
                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                              <span>Variant: {item.variantName}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-200" />
                              <span>{formatPrice(item.unitPrice)}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {!item.available && (
                          <div className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                            Out of Stock
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 border border-slate-100">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-slate-400 hover:text-emerald-900 disabled:opacity-30 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-bold w-12 text-center text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-slate-400 hover:text-emerald-900 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <span className="text-2xl font-bold text-emerald-900">
                            {formatPrice(item.subtotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="luxury-card p-10 bg-slate-50/50 backdrop-blur-sm">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Order Summary</h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center text-slate-500 font-medium">
                    <span>Bag Subtotal</span>
                    <span className="text-slate-900 font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 font-medium">
                    <span>Shipping Estimate</span>
                    <span className="text-emerald-600 font-bold">
                      {shipping > 0 ? formatPrice(shipping) : 'Complimentary'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 font-medium">
                    <span>Estimated Tax</span>
                    <span className="text-slate-900 font-bold">{formatPrice(tax)}</span>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-xl font-serif font-bold text-slate-900">Total</span>
                    <span className="text-3xl font-bold text-emerald-900">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="luxury-button-primary w-full py-5 flex items-center justify-center gap-3 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="mt-8 text-center text-xs text-slate-400 font-medium leading-relaxed uppercase tracking-widest">
                  Secure Checkout Guaranteed <br />
                  7-Day Returns Policy
                </p>
              </div>
              
              <Link 
                to="/products" 
                className="flex items-center justify-center gap-2 mt-8 text-slate-400 font-bold hover:text-emerald-900 transition-colors uppercase tracking-widest text-xs"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
