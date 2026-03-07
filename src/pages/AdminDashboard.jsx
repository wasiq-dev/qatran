import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductStore from '../store/productStore';
import { Package, Plus, Trash2, Edit2, Check, X, LogOut, Upload, Image as ImageIcon, AlertCircle, Percent, List as ListIcon } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { products, fetchProducts, updateProduct, addProduct, deleteProduct } = useProductStore();
  
  // UI States
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  
  // Form State
  const initialFormState = {
    name: '',
    basePrice: 0,
    category: 'towels',
    stock: 10,
    description: '',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    salePercentage: 0,
    features: '' // comma separated string for the form
  };
  
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const auth = sessionStorage.getItem('isAdminAuthenticated');
    if (auth !== 'true') {
      navigate('/admin/login');
    }
    fetchProducts();
  }, [navigate, fetchProducts]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f !== '');
    
    const productData = {
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/ /g, '-'),
      description: formData.description,
      shortDescription: formData.description.slice(0, 50),
      basePrice: parseInt(formData.basePrice) * 100,
      currency: 'PKR',
      category: formData.category,
      images: [formData.image],
      featured: true,
      salePercentage: parseInt(formData.salePercentage) || 0,
      features: featuresArray,
      variants: [
        {
          id: `v_${Date.now()}`,
          name: 'Standard',
          type: 'size',
          value: 'Standard',
          priceAdjustment: 0,
          inventory: { available: parseInt(formData.stock), sku: `SKU-${Date.now()}` }
        }
      ],
      specifications: {
        material: 'Cotton',
        origin: 'Pakistan'
      }
    };
    
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    
    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      basePrice: product.basePrice / 100,
      category: product.category,
      stock: product.variants[0]?.inventory.available || 0,
      description: product.description,
      image: product.images[0],
      salePercentage: product.salePercentage || 0,
      features: product.features ? product.features.join(', ') : ''
    });
    setImagePreview(product.images[0]);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingProduct(null);
    setImagePreview(null);
    setShowForm(false);
  };

  const confirmDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const handleDelete = () => {
    deleteProduct(deleteConfirmId);
    setDeleteConfirmId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 py-8">
      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Product?</h3>
              <p className="text-gray-600 mb-8">Are you sure? This action cannot be undone and will remove the product from store.</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <Package className="text-primary w-8 h-8" />
              Owner Dashboard
            </h1>
            <p className="text-gray-500">Manage your products, stock and sales from here.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </header>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Products List ({products.length})</h2>
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          )}
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary/20 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-primary">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload Section */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-48 h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => { setImagePreview(null); setFormData({ ...formData, image: '' }); }}
                          className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <X className="w-8 h-8" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">No image selected</p>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div className="relative">
                      <input 
                        type="file" 
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label 
                        htmlFor="imageUpload"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border-2 border-primary text-primary font-bold rounded-xl cursor-pointer hover:bg-primary/5 transition-all"
                      >
                        <Upload className="w-5 h-5" />
                        Upload from Computer
                      </label>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <input 
                        type="url" 
                        value={formData.image}
                        onChange={e => { setFormData({...formData, image: e.target.value}); setImagePreview(e.target.value); }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none text-sm"
                        placeholder="Or paste an image URL here..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. Premium White Towel"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (PKR)</label>
                <input 
                  required
                  type="number" 
                  value={formData.basePrice}
                  onChange={e => setFormData({...formData, basePrice: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. 1500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="towels">Towels</option>
                  <option value="bathrobe">Bathrobe</option>
                  <option value="bed-essential">Bed Essential</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-red-500" />
                  Sale Percentage (%)
                </label>
                <input 
                  type="number" 
                  value={formData.salePercentage}
                  onChange={e => setFormData({...formData, salePercentage: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. 10"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Stock (Available)</label>
                <input 
                  required
                  type="number" 
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <ListIcon className="w-4 h-4 text-primary" />
                  Features / Bullets (Comma separated)
                </label>
                <input 
                  type="text" 
                  value={formData.features}
                  onChange={e => setFormData({...formData, features: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. 100% Cotton, Super Soft, Fast Dry"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  rows="3"
                ></textarea>
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="flex-1 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                  {editingProduct ? 'Update Product' : 'Save Product'}
                </button>
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="px-8 border border-gray-300 font-bold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-700">Product</th>
                  <th className="px-6 py-4 font-bold text-gray-700">Category</th>
                  <th className="px-6 py-4 font-bold text-gray-700">Price</th>
                  <th className="px-6 py-4 font-bold text-gray-700">Sale</th>
                  <th className="px-6 py-4 font-bold text-gray-700">Stock</th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover border" />
                        <div>
                          <p className="font-bold text-gray-900">{p.name}</p>
                          <p className="text-xs text-gray-500">ID: {p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold capitalize">{p.category}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {formatPrice(p.basePrice, p.currency)}
                    </td>
                    <td className="px-6 py-4">
                      {p.salePercentage > 0 ? (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">-{p.salePercentage}%</span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${p.variants[0]?.inventory.available > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-sm font-medium">{p.variants[0]?.inventory.available || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(p)}
                          className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => confirmDelete(p.id)}
                          className="text-red-400 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No products found. Add a new product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
