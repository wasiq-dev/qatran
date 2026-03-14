import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useUIStore from '../store/uiStore';
import useAuthStore from '../store/authStore';
import { initGoogleAuth } from '../utils/googleAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const addToast = useUIStore(state => state.addToast);
  const login = useAuthStore(state => state.login);
  const googleLogin = useAuthStore(state => state.googleLogin);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      login(formData.email, formData.password);
      addToast('Welcome back to Qatran!', 'success');
      navigate('/account');
    } catch (err) {
      addToast(err.message || 'Invalid credentials', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const googleUser = await initGoogleAuth();
      googleLogin(googleUser);
      addToast('Successfully logged in with Google!', 'success');
      navigate('/account');
    } catch (err) {
      addToast('Google login failed. Please try again.', 'error');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-48 pb-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-emerald-900 font-bold text-xs uppercase tracking-widest transition-colors z-10">
        <ChevronLeft className="w-4 h-4" />
        Back to Store
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-10 bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10"
      >
        <div className="text-center">
          <Link to="/" className="text-3xl font-serif font-bold text-emerald-900 mb-4 block">
            Qatran<span className="text-accent">.</span>
          </Link>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2 text-center">Welcome Back</h2>
          <p className="text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="text-emerald-900 font-bold hover:underline decoration-accent decoration-2 underline-offset-4">
              Create one
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-900 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-900/5 focus:border-emerald-900 transition-all font-medium"
                  placeholder="ahmed@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Password</label>
                <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-accent-dark transition-colors">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-900 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-900/5 focus:border-emerald-900 transition-all font-medium"
                  placeholder="••••••"
                />
              </div>
            </div>
          </div>

          {/* Google Login Option */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-slate-500 font-medium">OR</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-medium text-slate-700 hover:text-slate-900 disabled:opacity-70"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-300 rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.35-1.5-.88-1.5-1.5h-3c0 .83.67 1.5 1.5v3c0 .83-.67 1.5-1.5h3c.83 0 1.5.67 1.5v-3c0-.83-.67-1.5-1.5h-3zm1.5 1.5c0 .83.67 1.5 1.5v3c0 .83-.67 1.5-1.5h3c.83 0 1.5.67 1.5v-3c0-.83-.67-1.5-1.5h-3z"/>
                  <path fill="#34a853" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09 0-1.83.73-2.13 2.13-2.13 0 1.54-.58 2.09-1.36.04-1.36-.04-1.36-1.36z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="luxury-button-primary w-full py-5 flex items-center justify-center gap-3 group disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In Securely</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] pt-4">
          Qatran Secure Authentication
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
