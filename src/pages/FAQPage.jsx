import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronRight, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is your standard delivery time?",
      answer: "Standard delivery within Pakistan takes 3-5 business days. Remote areas might take up to 7 days. Every order is processed with premium care."
    },
    {
      question: "Are your towels made of 100% cotton?",
      answer: "Absolutely. Every product in our collection is crafted from 100% pure long-staple cotton, renowned for its superior softness and absorbency."
    },
    {
      question: "Can I return a product if I'm not satisfied?",
      answer: "Yes, we offer a gracious 7-day easy return policy for unused and unwashed items in their original luxury packaging."
    },
    {
      question: "Do you offer wholesale pricing?",
      answer: "We do. For institutional inquiries or bulk boutique orders, please reach out to our concierge via the Contact page for specialized rates."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order departs our Karachi studio, we will send a secure tracking ID to your registered email and via SMS."
    },
    {
      question: "What payment methods do you accept?",
      answer: "Currently, we accept Cash on Delivery (COD) across Pakistan. We are working on integrating secure digital payments soon."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">
          <Link to="/" className="hover:text-emerald-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-900">Assistance</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Concierge Support</span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 mb-8 leading-tight">
            Common <br />
            <span className="italic font-normal">Inquiries</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Find immediate answers to your questions about our premium essentials and services.
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`border rounded-3xl overflow-hidden transition-all duration-500 ${openIndex === idx ? 'border-emerald-900/20 shadow-xl shadow-emerald-900/5' : 'border-slate-100 shadow-sm'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-8 bg-white hover:bg-slate-50/50 transition-colors text-left"
              >
                <span className="text-xl font-serif font-bold text-slate-900">{faq.question}</span>
                <div className={`p-2 rounded-full transition-all duration-500 ${openIndex === idx ? 'bg-emerald-900 text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 bg-white text-slate-500 font-medium leading-relaxed text-lg border-t border-slate-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-slate-50 rounded-[3rem] p-12 md:p-16 text-center border border-slate-100">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-900 mx-auto mb-8 shadow-sm">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">Still seeking assistance?</h2>
          <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">Our dedicated concierge team is available to help with any further questions.</p>
          <Link to="/contact" className="luxury-button-primary px-12 inline-block">
            Connect With Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
