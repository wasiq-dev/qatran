import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxury-900 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link to="/" className="text-3xl font-serif font-bold tracking-tight mb-8 block">
              Toliya<span className="text-accent">.</span>
            </Link>
            <p className="text-white/50 leading-relaxed mb-8 max-w-sm font-medium">
              Crafting luxury textile essentials since 2025. We bring the unmatched softness of 100% pure Pakistani cotton to your home.
            </p>
            <div className="flex items-center gap-6">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Columns */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-8">Shop</h4>
            <ul className="space-y-4">
              {['Towels', 'Bathrobe', 'Bed Essential', 'Kids'].map((item) => (
                <li key={item}>
                  <Link to={`/category/${item.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-white transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-8">Service</h4>
            <ul className="space-y-4">
              {[
                { label: 'Contact Us', path: '/contact' },
                { label: 'Shipping', path: '/shipping' },
                { label: 'Returns', path: '/returns' },
                { label: 'FAQ', path: '/faq' }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-white/60 hover:text-white transition-colors font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-8">Contact Our Studio</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-white/60 font-medium leading-relaxed">
                  P 82 D University Town, Faisalabad, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-white/60 font-medium">+92 322 0633722</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-white/60 font-medium">toliya.care@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
            &copy; 2025 Toliya.co Premium Essentials. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/admin/login" className="text-white/20 hover:text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
              Owner Portal
            </Link>
            <div className="flex gap-4">
              <div className="w-8 h-5 bg-white/5 rounded border border-white/5" title="Visa" />
              <div className="w-8 h-5 bg-white/5 rounded border border-white/5" title="Mastercard" />
              <div className="w-8 h-5 bg-white/5 rounded border border-white/5" title="Cash on Delivery" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
