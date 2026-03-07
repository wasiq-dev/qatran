import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">
          <Link to="/" className="hover:text-emerald-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-900">Contact Our Concierge</span>
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Get In Touch</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6">How Can We Assist You?</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Our dedicated support team is here to ensure your experience with Toliya.co is nothing short of exceptional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 space-y-10"
            >
              <div className="luxury-card p-10 flex items-start gap-6 group hover:bg-emerald-900 transition-colors duration-500">
                <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-900 group-hover:bg-white/10 group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-slate-900 mb-2 group-hover:text-white transition-colors">Email Us</h3>
                  <p className="text-slate-500 group-hover:text-white/70 transition-colors font-medium">concierge@softique.co</p>
                  <p className="text-slate-500 group-hover:text-white/70 transition-colors font-medium">partners@softique.co</p>
                </div>
              </div>

              <div className="luxury-card p-10 flex items-start gap-6 group hover:bg-emerald-900 transition-colors duration-500">
                <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-900 group-hover:bg-white/10 group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-slate-900 mb-2 group-hover:text-white transition-colors">Call Our Office</h3>
                  <p className="text-slate-500 group-hover:text-white/70 transition-colors font-medium">+92 300 1234567</p>
                  <p className="text-slate-500 group-hover:text-white/70 transition-colors font-medium text-xs uppercase tracking-widest mt-2">Mon - Sat: 9am - 6pm PKT</p>
                </div>
              </div>

              <div className="luxury-card p-10 flex items-start gap-6 group hover:bg-emerald-900 transition-colors duration-500">
                <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-900 group-hover:bg-white/10 group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-slate-900 mb-2 group-hover:text-white transition-colors">Visit Our Studio</h3>
                  <p className="text-slate-500 group-hover:text-white/70 transition-colors font-medium leading-relaxed">
                    Softique Karachi Studio<br />
                    DHA Phase 6, <br />
                    Karachi, Pakistan
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-7 bg-slate-50 rounded-[2rem] p-10 md:p-16 border border-slate-100 shadow-sm"
            >
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full bg-white px-6 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-900/5 focus:border-emerald-900 outline-none transition-all font-medium"
                      placeholder="e.g. Ahmed Khan"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full bg-white px-6 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-900/5 focus:border-emerald-900 outline-none transition-all font-medium"
                      placeholder="ahmed@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Inquiry Type</label>
                  <select className="w-full bg-white px-6 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-900/5 focus:border-emerald-900 outline-none transition-all font-medium appearance-none">
                    <option>General Inquiry</option>
                    <option>Bulk/Wholesale Orders</option>
                    <option>Order Status</option>
                    <option>Returns & Refunds</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Message</label>
                  <textarea
                    rows="5"
                    className="w-full bg-white px-6 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-900/5 focus:border-emerald-900 outline-none transition-all font-medium resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="luxury-button-primary w-full py-5 flex items-center justify-center gap-3 group"
                >
                  <span>Send Secure Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
