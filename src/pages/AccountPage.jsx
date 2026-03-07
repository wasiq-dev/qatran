import { motion } from 'framer-motion';
import { User, Package, MapPin, LogOut, ChevronRight, Settings } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const addToast = useUIStore(state => state.addToast);

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'success');
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-12">
          <Link to="/" className="hover:text-emerald-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-900">My Account</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="luxury-card p-10 space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-900 text-3xl font-serif font-bold shadow-inner">
                  {user.fullName[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900">{user.fullName}</h2>
                  <p className="text-slate-400 font-medium text-sm">{user.email}</p>
                </div>
              </div>

              <nav className="flex flex-col gap-2 pt-8 border-t border-slate-100">
                {[
                  { icon: User, label: 'Profile Details', active: true },
                  { icon: Package, label: 'Order History', active: false },
                  { icon: MapPin, label: 'Saved Addresses', active: false },
                  { icon: Settings, label: 'Account Settings', active: false },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all font-bold text-sm uppercase tracking-widest ${
                      item.active ? 'bg-emerald-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-emerald-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.active && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 p-4 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-all font-bold text-sm uppercase tracking-widest mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div>
                <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Account Dashboard</h1>
                <p className="text-slate-500 font-medium">Manage your profile, track orders, and update your preferences.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="luxury-card p-8 bg-slate-50/50">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6 block">Personal Info</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">Full Name</span>
                      <span className="text-lg font-bold text-slate-900">{user.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">Email Address</span>
                      <span className="text-lg font-bold text-slate-900">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="luxury-card p-8 bg-emerald-900 text-white">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-6 block">Member Status</h3>
                  <div className="space-y-4">
                    <p className="text-2xl font-serif font-bold">Inner Circle Member</p>
                    <p className="text-white/60 text-sm font-medium">Since March 2026</p>
                    <div className="pt-4">
                      <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Gold Tier
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8">Recent Orders</h3>
                <div className="luxury-card p-12 text-center border-dashed border-2 border-slate-200 bg-transparent">
                  <Package className="w-12 h-12 text-slate-200 mx-auto mb-6" />
                  <p className="text-slate-400 font-medium italic">No orders found yet. Ready to elevate your daily rituals?</p>
                  <Link to="/products" className="text-emerald-900 font-bold uppercase tracking-widest text-xs mt-6 inline-block hover:underline decoration-accent underline-offset-8">
                    Browse Collection →
                  </Link>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
