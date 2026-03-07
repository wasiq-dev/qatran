import { motion } from 'framer-motion';
import { RotateCcw, AlertCircle, CheckCircle, HelpCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReturnsPage = () => {
  const steps = [
    { icon: RotateCcw, title: '7-Day Window', desc: 'We offer a gracious 7-day return window from the date of delivery for all premium essentials.' },
    { icon: AlertCircle, title: 'Original Condition', desc: 'To maintain hygiene standards, items must be unused, unwashed, and in their original luxury packaging.' },
    { icon: CheckCircle, title: 'Seamless Refunds', desc: 'Once inspected, refunds are processed directly to your original payment method within 5-7 business days.' },
    { icon: HelpCircle, title: 'Concierge Support', desc: 'Our dedicated support team is available to guide you through every step of the return process.' }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">
          <Link to="/" className="hover:text-emerald-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-900">Returns & Exchanges</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Our Promise</span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 mb-8 leading-tight">
            Satisfaction <br />
            <span className="italic font-normal">Guaranteed</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Your peace of mind is our priority. If you're not completely enamored with your purchase, we're here to make it right.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="luxury-card p-12 border border-slate-100 hover:border-emerald-900/10 transition-all group"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-900 mb-8 group-hover:bg-emerald-900 group-hover:text-white transition-all duration-500">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-slate-900">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 border border-slate-100 relative overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-8">The Return Process</h2>
            <div className="space-y-8 relative z-10">
              {[
                { step: '01', title: 'Initiate Request', desc: 'Email our concierge at returns@toliya.co with your Order ID and reason for return.' },
                { step: '02', title: 'Quality Inspection', desc: 'Securely pack the item. Our team will arrange a pickup or provide shipping instructions.' },
                { step: '03', title: 'Refund Confirmation', desc: 'Upon successful inspection, you will receive a confirmation email and your refund will be initiated.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-8">
                  <span className="text-4xl font-serif font-bold text-emerald-900/10">{item.step}</span>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 pt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 italic">
                Note: Sale items are final sale unless faulty.
              </p>
              <Link to="/contact" className="luxury-button-primary flex items-center gap-2 px-10">
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
