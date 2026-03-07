import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import useCartStore from '../store/cartStore';
import useCurrencyStore from '../store/currencyStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, ShieldCheck, Truck, CreditCard, Banknote } from 'lucide-react';

const CheckoutPage = () => {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const formatPrice = useCurrencyStore(state => state.formatPrice);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'card'

  const subtotal = getSubtotal();
  const shipping = subtotal > 500000 ? 0 : 20000;
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + shipping + tax;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    // Simulate payment processing if card is selected
    if (paymentMethod === 'card') {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const order = {
      id: orderId,
      items,
      amounts: { subtotal, shipping, tax, total },
      customer: {
        name: values.fullName,
        email: values.email,
        phone: values.phone,
      },
      shipping: {
        address: values.address,
        city: values.city,
        country: values.country,
        postalCode: values.postalCode,
      },
      payment: {
        method: paymentMethod,
        status: paymentMethod === 'card' ? 'PAID' : 'PENDING',
      },
      placedAt: new Date().toISOString(),
      status: 'PLACED',
    };

    sessionStorage.setItem(`order:${orderId}`, JSON.stringify(order));
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-48 pb-24">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-6">Your bag is empty</h1>
        <Link to="/products" className="luxury-button-primary px-12">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-48 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">
          <Link to="/" className="hover:text-emerald-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/cart" className="hover:text-emerald-900 transition-colors">Bag</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-900">Secure Checkout</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-16">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-7 space-y-12">
            {/* Contact Info */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold font-serif shadow-lg">1</div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Contact Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
                  <input
                    className={`w-full bg-slate-50 px-6 py-4 rounded-xl border outline-none transition-all font-medium ${errors.fullName ? 'border-red-500' : 'border-slate-100 focus:border-emerald-900'}`}
                    {...register('fullName', { required: true, minLength: 3 })}
                    placeholder="Ahmed Khan"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
                  <input
                    className={`w-full bg-slate-50 px-6 py-4 rounded-xl border outline-none transition-all font-medium ${errors.email ? 'border-red-500' : 'border-slate-100 focus:border-emerald-900'}`}
                    type="email"
                    {...register('email', { required: true })}
                    placeholder="ahmed@example.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Phone Number</label>
                  <input
                    className={`w-full bg-slate-50 px-6 py-4 rounded-xl border outline-none transition-all font-medium ${errors.phone ? 'border-red-500' : 'border-slate-100 focus:border-emerald-900'}`}
                    {...register('phone', { required: true, minLength: 10 })}
                    placeholder="0300 1234567"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section className="space-y-8 pt-12 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold font-serif shadow-lg">2</div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Delivery Address</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Street Address</label>
                  <input
                    className={`w-full bg-slate-50 px-6 py-4 rounded-xl border outline-none transition-all font-medium ${errors.address ? 'border-red-500' : 'border-slate-100 focus:border-emerald-900'}`}
                    {...register('address', { required: true, minLength: 5 })}
                    placeholder="House #, Street Name, Area"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Country</label>
                  <select
                    className={`w-full bg-slate-50 px-6 py-4 rounded-xl border outline-none transition-all font-medium ${errors.country ? 'border-red-500' : 'border-slate-100 focus:border-emerald-900'}`}
                    {...register('country', { required: true })}
                    defaultValue="PK"
                  >
                    <option value="">Select Country</option>
                    <option value="PK">Pakistan</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="IN">India</option>
                    <option value="BD">Bangladesh</option>
                    <option value="LK">Sri Lanka</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">City</label>
                  <input
                    className={`w-full bg-slate-50 px-6 py-4 rounded-xl border outline-none transition-all font-medium ${errors.city ? 'border-red-500' : 'border-slate-100 focus:border-emerald-900'}`}
                    {...register('city', { required: true })}
                    placeholder="Karachi"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Postal Code</label>
                  <input
                    className={`w-full bg-slate-50 px-6 py-4 rounded-xl border outline-none transition-all font-medium ${errors.postalCode ? 'border-red-500' : 'border-slate-100 focus:border-emerald-900'}`}
                    {...register('postalCode', { required: true })}
                    placeholder="74000"
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="space-y-8 pt-12 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold font-serif shadow-lg">3</div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* COD Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-8 rounded-2xl border-2 transition-all flex items-center justify-between group ${paymentMethod === 'cod' ? 'border-emerald-900 bg-emerald-50/30' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'bg-emerald-900 text-white' : 'bg-white text-slate-400'}`}>
                      <Banknote className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className={`font-bold transition-colors ${paymentMethod === 'cod' ? 'text-slate-900' : 'text-slate-500'}`}>Cash on Delivery</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pay at your doorstep</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'cod' ? 'border-emerald-900' : 'border-slate-200'}`}>
                    {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-900 animate-fade-in" />}
                  </div>
                </button>

                {/* Card Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-8 rounded-2xl border-2 transition-all flex items-center justify-between group ${paymentMethod === 'card' ? 'border-emerald-900 bg-emerald-50/30' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'bg-emerald-900 text-white' : 'bg-white text-slate-400'}`}>
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className={`font-bold transition-colors ${paymentMethod === 'card' ? 'text-slate-900' : 'text-slate-500'}`}>Online Payment</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Credit or Debit Card</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-emerald-900' : 'border-slate-200'}`}>
                    {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-900 animate-fade-in" />}
                  </div>
                </button>
              </div>

              {/* Card Form Mockup */}
              <AnimatePresence>
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Card Number</label>
                        <input
                          className="w-full bg-white px-6 py-4 rounded-xl border border-slate-200 focus:border-emerald-900 outline-none transition-all font-medium"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Expiry Date</label>
                          <input
                            className="w-full bg-white px-6 py-4 rounded-xl border border-slate-200 focus:border-emerald-900 outline-none transition-all font-medium"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">CVV</label>
                          <input
                            className="w-full bg-white px-6 py-4 rounded-xl border border-slate-200 focus:border-emerald-900 outline-none transition-all font-medium"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            <div className="pt-12">
              <button 
                type="submit" 
                className="luxury-button-primary w-full py-6 flex items-center justify-center gap-3 group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sidebar Summary */}
          <aside className="lg:col-span-5">
            <div className="sticky top-48 space-y-8">
              <div className="luxury-card p-10 bg-slate-50/50 backdrop-blur-sm">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Order Summary</h2>
                
                <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 rounded-xl overflow-hidden bg-white flex-shrink-0">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-slate-900 line-clamp-1">{item.productName}</h4>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">
                          Qty: {item.quantity} • {item.variantName}
                        </p>
                        <span className="text-emerald-900 font-bold">{formatPrice(item.subtotal)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-8 border-t border-slate-200">
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-slate-900 font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-bold">
                      {shipping > 0 ? formatPrice(shipping) : 'Complimentary'}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Tax Estimate</span>
                    <span className="text-slate-900 font-bold">{formatPrice(tax)}</span>
                  </div>
                  <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-xl font-serif font-bold text-slate-900">Total</span>
                    <span className="text-3xl font-bold text-emerald-900">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="luxury-card p-6 flex flex-col items-center text-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-900/30" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Secure Checkout</span>
                </div>
                <div className="luxury-card p-6 flex flex-col items-center text-center gap-3">
                  <Truck className="w-8 h-8 text-emerald-900/30" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fast Delivery</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
