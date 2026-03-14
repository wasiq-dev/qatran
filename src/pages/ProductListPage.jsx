
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useProductStore from '../store/productStore';
import ProductCard from '../components/product/ProductCard';
import { Filter, Grid, List, ChevronRight, X, Search } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

const ProductListPage = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const { products, loading, fetchProducts } = useProductStore();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const activeFilters = useMemo(() => {
    const filters = {};
    if (categoryId) filters.category = categoryId;
    const search = searchParams.get('search');
    if (search) filters.search = search;
    if (searchParams.get('bestSeller') === 'true') filters.bestSeller = true;
    if (searchParams.get('trending') === 'true') filters.trending = true;
    if (searchParams.get('newArrival') === 'true') filters.newArrival = true;
    return filters;
  }, [categoryId, searchParams]);

  useEffect(() => {
    fetchProducts(activeFilters);
  }, [fetchProducts, activeFilters]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeFilters.category) {
      result = result.filter(p => p.category === activeFilters.category);
    }
    if (activeFilters.search) {
      const q = activeFilters.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (activeFilters.bestSeller) result = result.filter(p => p.bestSeller);
    if (activeFilters.trending) result = result.filter(p => p.trending);
    if (activeFilters.newArrival) result = result.filter(p => p.newArrival);
    return result;
  }, [products, activeFilters]);

  const categoryName = categoryId 
    ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ')
    : 'Our Collections';

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Breadcrumbs & Header */}
      <div className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            <Link to="/" className="hover:text-emerald-900 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-emerald-900">{categoryName}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
                {categoryName}
              </h1>
              <p className="text-slate-500 font-medium italic">
                Showing {filteredProducts.length} premium essentials
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 border rounded-full font-bold text-sm transition-all ${
                  showFilters ? 'bg-emerald-900 border-emerald-900 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-900 hover:text-emerald-900'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              
              <div className="hidden sm:flex items-center bg-slate-100 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-32">
                <div className="w-12 h-12 border-4 border-emerald-900/10 border-t-emerald-900 rounded-full animate-spin"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-32 luxury-card">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <Search className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">No Essentials Found</h2>
                <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">
                  We couldn't find any products matching your current filters. Try refining your selection.
                </p>
                <button 
                  onClick={() => {
                    window.history.replaceState({}, '', window.location.pathname);
                    fetchProducts({});
                  }}
                  className="luxury-button-primary"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
                  : "flex flex-col gap-8"
                }
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Sidebar Overlay */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-serif font-bold text-slate-900">Filters</h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* Filter Content (Categories, Sort, etc.) */}
              <div className="space-y-10">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-900 mb-6">Collections</h3>
                  <div className="flex flex-col gap-4">
                    {['towels', 'bathrobe', 'bed-essential', 'kids'].map((cat) => (
                      <Link
                        key={cat}
                        to={`/category/${cat}`}
                        onClick={() => setShowFilters(false)}
                        className={`text-lg font-serif transition-colors hover:text-emerald-900 ${categoryId === cat ? 'text-emerald-900 font-bold underline underline-offset-8' : 'text-slate-500'}`}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-900 mb-6">Sort By</h3>
                  <div className="space-y-4">
                    {['Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Best Sellers'].map((sort) => (
                      <label key={sort} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-emerald-900 transition-colors flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-900 opacity-0 transition-opacity group-checked:opacity-100" />
                        </div>
                        <span className="text-slate-600 font-medium group-hover:text-emerald-900 transition-colors">{sort}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-100">
                <button className="luxury-button-primary w-full py-4">
                  Show Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListPage;
