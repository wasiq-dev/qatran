import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Ghalat password! Phir se koshish kijiye.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-emerald-900 font-bold text-xs uppercase tracking-widest transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to Store
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 md:p-12 border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="bg-emerald-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-900 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Owner Concierge</h1>
          <p className="text-slate-500 font-medium">Please enter your secure access key.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Access Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 px-6 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-900/5 focus:border-emerald-900 outline-none transition-all font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-red-500 text-sm text-center font-bold"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="luxury-button-primary w-full py-5"
          >
            Authenticate
          </button>
        </form>
        
        <p className="mt-10 text-center text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
          Toliya.co Secure Portal
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
