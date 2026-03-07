import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import useUIStore from '../../store/uiStore';
import useCurrencyStore from '../../store/currencyStore';
import { motion } from 'framer-motion';

const ProductCard = ({ product, variant = 'light' }) => {
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const addToast = useUIStore(state => state.addToast);
  const formatPrice = useCurrencyStore(state => state.formatPrice);
  
  const hasSale = product.salePercentage > 0;
  const currentPriceRaw = hasSale 
    ? (product.basePrice * (100 - product.salePercentage)) / 100 
    : product.basePrice;
    
  const price = formatPrice(currentPriceRaw);
  const originalPrice = hasSale ? formatPrice(product.basePrice) : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.variants && product.variants.length > 0) {
      addItem(product, product.variants[0]);
      addToast(`${product.name} added to cart!`, 'success');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className={`luxury-card overflow-hidden group cursor-pointer ${variant === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : ''}`}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.bestSeller && (
            <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
              Best Seller
            </span>
          )}
          {hasSale && (
            <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
              -{product.salePercentage}%
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md text-primary py-3 rounded-xl font-bold translate-y-20 group-hover:translate-y-0 transition-transform duration-500 hover:bg-primary hover:text-white flex items-center justify-center gap-2 shadow-xl"
        >
          <ShoppingCart className="w-4 h-4" />
          Quick Add
        </button>
      </div>

      <div className="p-6">
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${variant === 'dark' ? 'text-accent' : 'text-primary/60'}`}>
          {product.category}
        </p>
        <h3 className={`font-serif font-bold text-lg mb-3 line-clamp-1 transition-colors group-hover:text-primary ${variant === 'dark' ? 'text-white' : 'text-luxury-900'}`}>
          {product.name}
        </h3>
        <div className="flex items-center gap-3">
          <span className={`text-xl font-bold ${variant === 'dark' ? 'text-white' : 'text-primary'}`}>{price}</span>
          {hasSale && (
            <span className="text-sm text-luxury-400 line-through">{originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
