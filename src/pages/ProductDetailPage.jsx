import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Minus, Plus, ChevronRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import useProductStore from '../store/productStore';
import useUIStore from '../store/uiStore';
import useCurrencyStore from '../store/currencyStore';
import ProductCard from '../components/product/ProductCard';
import useCartStore from '../store/cartStore';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products, loading, fetchProducts } = useProductStore();
  const formatPrice = useCurrencyStore(state => state.formatPrice);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const addItem = useCartStore(state => state.addItem);
  const addToast = useUIStore(state => state.addToast);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length > 0) {
      const data = products.find(p => p.id === id || p.slug === id);
      if (data) {
        setProduct(data);
        setSelectedVariant(data.variants?.[0] || null);
        const related = products
          .filter(p => p.category === data.category && p.id !== data.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addItem(product, selectedVariant, quantity);
      addToast(`${product.name} added to cart!`, 'success');
    }
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && selectedVariant && newQuantity <= selectedVariant.inventory.available) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-900/10 border-t-emerald-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-32">
        <h1 className="text-4xl font-serif font-bold mb-6">Product not found</h1>
        <Link to="/products" className="luxury-button-primary px-12">
          Return to Collection
        </Link>
      </div>
    );
  }

  const hasSale = product.salePercentage > 0;
  const currentPriceRaw = selectedVariant
    ? (product.basePrice + (selectedVariant.priceAdjustment || 0))
    : product.basePrice;
    
  const discountedPrice = hasSale 
    ? (currentPriceRaw * (100 - product.salePercentage)) / 100 
    : currentPriceRaw;

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">
          <Link to="/" className="hover:text-emerald-900 transition-colors">Home</Link>
          <ChevronRight className="w-2 h-2" />
          <Link to={`/category/${product.category}`} className="hover:text-emerald-900 transition-colors capitalize">{product.category.replace('-', ' ')}</Link>
          <ChevronRight className="w-2 h-2" />
          <span className="text-emerald-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">
          {/* Product Gallery */}
          <div className="w-full">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-12 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index ? 'border-emerald-900' : 'border-transparent hover:border-slate-200'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Main Image */}
              <div className="flex-1 relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-50 shadow-sm border border-slate-100">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.bestSeller && (
                  <span className="absolute top-4 left-4 bg-accent text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-widest">
                    Best Seller
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="pt-2">
            <span className="text-accent font-bold uppercase tracking-[0.2em] text-[9px] mb-3 block">
              Pure Pakistani Cotton
            </span>
            
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-emerald-900">
                {formatPrice(discountedPrice)}
              </span>
              {hasSale && (
                <span className="text-base text-slate-300 line-through">
                  {formatPrice(currentPriceRaw)}
                </span>
              )}
            </div>

            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 font-medium max-w-lg">
              {product.description}
            </p>

            {/* Specifications Summary */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 py-6 border-y border-slate-50">
              {product.specifications && Object.entries(product.specifications).map(([key, val], idx) => (
                <div key={idx}>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 block mb-0.5">{key}</span>
                  <span className="text-xs font-bold text-slate-700">{val}</span>
                </div>
              ))}
            </div>

            {/* Variant Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[9px] font-bold text-slate-900 uppercase tracking-widest">
                    Select {product.variants[0].type === 'color' ? 'Color' : 'Size'}
                  </label>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{selectedVariant?.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setQuantity(1);
                      }}
                      className={`p-0.5 rounded-full border-2 transition-all ${
                        selectedVariant?.id === variant.id ? 'border-emerald-900 scale-105' : 'border-transparent'
                      }`}
                    >
                      {variant.type === 'color' ? (
                        <div 
                          className="w-6 h-6 rounded-full border border-slate-100 shadow-inner" 
                          style={{ backgroundColor: variant.value }}
                        />
                      ) : (
                        <div className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          selectedVariant?.id === variant.id ? 'bg-emerald-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}>
                          {variant.name}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex gap-3 mb-10">
              <div className="flex items-center bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-100">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-1.5 text-slate-400 hover:text-emerald-900 disabled:opacity-30"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-base font-bold w-8 text-center text-slate-900">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={selectedVariant && quantity >= selectedVariant.inventory.available}
                  className="p-1.5 text-slate-400 hover:text-emerald-900 disabled:opacity-30"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="luxury-button-primary flex-1 flex items-center justify-center gap-2 py-4 text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
              
              <button className="p-4 rounded-lg border border-slate-100 text-slate-300 hover:text-red-500 hover:border-red-100 transition-all">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-50">
              {[
                { icon: Truck, text: 'Fast Delivery' },
                { icon: ShieldCheck, text: 'Pure Cotton' },
                { icon: RotateCcw, text: 'Easy Returns' }
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 text-center">
                  <badge.icon className="w-4 h-4 text-emerald-900/30" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-slate-50">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-accent font-bold uppercase tracking-widest text-[9px] mb-1 block">Recommendations</span>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Complete Your Collection</h2>
              </div>
              <Link to="/products" className="text-[10px] font-bold uppercase tracking-widest text-emerald-900 hover:underline">View All →</Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
