import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Recycle, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">
          <Link to="/" className="hover:text-emerald-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-900">Our Heritage</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">The Softique Story</span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 mb-8 leading-tight">
            Crafting the Future of <br />
            <span className="italic font-normal">Everyday Comfort</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
            Born from a passion for premium textiles, Softique is dedicated to bringing the world-renowned quality of Pakistani cotton into the modern home.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-emerald-50 rounded-[3rem] -z-10 rotate-3" />
            <img
              src="/optimized_couple_500kb_940x.png"
              alt="Quality Towels"
              className="rounded-[2.5rem] shadow-2xl w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl max-w-[200px] hidden md:block border border-slate-100">
              <span className="text-3xl font-serif font-bold text-emerald-900 block mb-2">100%</span>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Pure Organic Pakistani Cotton</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Uncompromising Quality</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                At Softique, we believe that luxury should be felt, not just seen. Every towel in our collection is woven from 100% long-staple cotton, ensuring superior absorbency and a cloud-like softness that lasts for years.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-900">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl">Lab Tested</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">Every batch undergoes rigorous quality checks in our Karachi studio.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-900">
                  <Recycle className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl">Ethically Sourced</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">We partner with local farmers to ensure sustainable and fair production.</p>
              </div>
            </div>

            <Link to="/products" className="luxury-button-primary inline-flex items-center gap-3">
              Explore Our Collection
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Vision Section */}
        <div className="bg-luxury-900 rounded-[3rem] p-12 md:p-24 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-6 block">Our Vision</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight italic">
              "To redefine the essence of home luxury by blending traditional craftsmanship with contemporary design."
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
