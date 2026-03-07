import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useProductStore from '../store/productStore';
import ProductCard from '../components/product/ProductCard';
import { ShieldCheck, Truck, RotateCcw, Star, Quote, ArrowRight, Mail } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts({ forceRefresh: true });
  }, [fetchProducts]);

  const featuredProducts = products.filter(p => p.featured);
  const newArrivalProducts = products.filter(p => p.newArrival);

  const testimonials = [
    { name: "Ahmed Khan", role: "Verified Buyer", text: "The quality is outstanding! 100% cotton as promised, very soft and absorbent.", rating: 5 },
    { name: "Saira Ali", role: "Frequent Shopper", text: "I've tried many brands, but Toliya.co is definitely the best in terms of value for money.", rating: 5 },
    { name: "Zubair Shaikh", role: "Interior Designer", text: "Perfect for high-end projects. The colors are beautiful and the texture is premium.", rating: 5 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <motion.img 
            animate={{ scale: [1, 1.05] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "alternate" }}
            src="/images/Home_Collection_Banner.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-900 via-transparent to-black/20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="inline-block text-accent font-bold tracking-[0.3em] uppercase mb-6 text-sm md:text-base">
              Est. 2025 • Pure Luxury
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-[1.1]">
              Elevate Your <br />
              <span className="italic font-normal">Daily Rituals</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light tracking-wide">
              Experience the unmatched softness of 100% pure Pakistani cotton towels, meticulously crafted for the modern home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/products" className="luxury-button-primary min-w-[200px]">
                Explore Collection
              </Link>
              <Link to="/about" className="luxury-button-outline text-white border-white hover:bg-white/10 min-w-[200px]">
                Our Philosophy
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.section>

      {/* Trust Badges */}
      <section className="bg-white py-12 border-b border-luxury-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: 'Express Shipping', desc: 'Fast delivery across all major cities' },
              { icon: ShieldCheck, title: 'Cotton Guarantee', desc: '100% Pure long-staple cotton' },
              { icon: RotateCcw, title: 'Easy Returns', desc: 'Hassle-free 7-day return policy' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-luxury-900 font-serif">{item.title}</h3>
                <p className="text-luxury-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="py-20 bg-luxury-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle mb-8">Discover our diverse range of premium textile essentials.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'towels', name: 'Towels', image: '/optimized_towel_portrait_500kb_940x.png' },
              { id: 'bathrobe', name: 'Bathrobes', image: '/optimized_couple_500kb_940x.png' },
              { id: 'bed-essential', name: 'Bed Essentials', image: '/nnnn_940x.png' },
              { id: 'kids', name: 'Kids Collection', image: '/optimized_kids_bathrobe_500kb_785x.png' }
            ].map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[450px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-0 right-0 p-6 text-center">
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">{category.name}</h3>
                  <Link 
                    to={`/category/${category.id}`}
                    className="inline-block py-2 px-6 border border-white/40 text-white text-sm font-bold rounded-full hover:bg-white hover:text-primary transition-all backdrop-blur-md"
                  >
                    View Collection
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block text-center md:text-left">Curated Choice</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-900 text-center md:text-left">Popular Essentials</h2>
            </div>
            <Link to="/products" className="group flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors mx-auto md:mx-0">
              View All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      {newArrivalProducts.length > 0 && (
        <section className="py-20 bg-luxury-900 text-white overflow-hidden relative">
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
              <div className="text-center md:text-left">
                <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">Just Arrived</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-center md:text-left">New Season Arrivals</h2>
              </div>
              <Link to="/products?newArrival=true" className="luxury-button-outline text-white border-white/20 hover:bg-white/5 mx-auto md:mx-0">
                View Collection
              </Link>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivalProducts.slice(0, 4).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10"
                >
                  <ProductCard product={product} variant="dark" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">Testimonials</span>
            <h2 className="text-4xl font-serif font-bold text-luxury-900">Trusted by Thousands</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="luxury-card p-10 relative"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/5" />
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-luxury-700 italic mb-8 leading-relaxed text-lg">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t border-luxury-100 pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-luxury-900">{t.name}</h4>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 mb-24">
        <div className="bg-primary rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full -mr-48 -mb-48 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
              Exclusive Offer
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">Join the Inner Circle</h2>
            <p className="text-white/80 mb-12 text-lg font-light leading-relaxed">
              Subscribe to receive exclusive early access to our new collections, luxury lifestyle tips, and a <span className="text-accent-light font-bold">10% discount</span> on your first order.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-8 py-5 rounded-xl outline-none bg-white text-luxury-900 font-medium shadow-inner"
              />
              <button className="bg-luxury-900 text-white font-bold py-5 px-10 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl">
                Subscribe
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
