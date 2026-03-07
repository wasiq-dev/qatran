import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ChevronLeft, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Basic validation
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('All fields are required!');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Password does not match!');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters!');
        setLoading(false);
        return;
      }

      // Store admin data (in real app, this would be sent to backend)
      const adminData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      // Get existing admins or create new array
      const existingAdmins = JSON.parse(localStorage.getItem('admins') || '[]');
      existingAdmins.push(adminData);
      localStorage.setItem('admins', JSON.stringify(existingAdmins));

      setSuccess('Account created successfully! Please login.');
      setLoading(false);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    }, 1000);
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
            <UserPlus className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Admin Signup</h1>
          <p className="text-slate-500 font-medium">Create new admin account</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full bg-slate-50 px-6 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-900/5 focus:border-emerald-900 outline-none transition-all font-medium"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-slate-50 px-6 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-900/5 focus:border-emerald-900 outline-none transition-all font-medium"
              placeholder="admin@qatran.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-slate-50 px-6 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-900/5 focus:border-emerald-900 outline-none transition-all font-medium"
              placeholder="Strong password"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full bg-slate-50 px-6 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-900/5 focus:border-emerald-900 outline-none transition-all font-medium"
              placeholder="Re-enter password"
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

          {success && (
            <motion.p 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-green-500 text-sm text-center font-bold"
            >
              {success}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="luxury-button-primary w-full py-5 flex items-center justify-center gap-3 group disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{' '}
            <Link to="/admin/login" className="text-emerald-900 hover:text-emerald-700 font-bold transition-colors">
              Login here
            </Link>
          </p>
        </div>

        <p className="mt-10 text-center text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
          Qatran Secure Portal
        </p>
      </motion.div>
    </div>
  );
};

export default AdminSignupPage;
