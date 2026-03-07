import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShippingPage = () => {
  const steps = [
    { icon: Truck, title: 'Express Processing', desc: 'Your luxury essentials are meticulously handled and processed within 24-48 hours.' },
    { icon: Clock, title: 'Delivery Time', desc: 'Premium doorstep delivery takes 3-5 business days across major cities in Pakistan.' },
    { icon: MapPin, title: 'Seamless Tracking', desc: 'A secure tracking ID will be sent to your registered email once your order departs.' },
    { icon: ShieldCheck, title: 'Pristine Packaging', desc: 'Every item is sanitized and packed in our signature luxury protection to ensure it reaches you in perfect condition.' }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">
          <Link to="/" className="hover:text-emerald-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-900">Shipping Concierge</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Our Logistics</span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 mb-8 leading-tight">
            Fast & Reliable <br />
            <span className="italic font-normal">To Your Doorstep</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            We ensure your premium cotton essentials are delivered with the same care and excellence they were crafted with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:bg-emerald-900 transition-colors duration-500"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-900 mb-8 shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-slate-900 group-hover:text-white transition-colors">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed group-hover:text-white/70 transition-colors">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-emerald-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Shipping Rates</h2>
              <p className="text-white/70 text-lg font-medium leading-relaxed">
                We offer complimentary shipping on all orders above <span className="text-accent font-bold">PKR 5,000</span>. For orders below this amount, a flat premium delivery fee of <span className="text-accent font-bold">PKR 200</span> applies across Pakistan.
              </p>
            </div>
            <Link to="/products" className="luxury-button bg-white text-emerald-900 hover:bg-white/90 whitespace-nowrap px-12">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
