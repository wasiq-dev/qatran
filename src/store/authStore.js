import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      // Simulate signup (saving to a mock list in localStorage)
      signup: (userData) => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        if (users.find(u => u.email === userData.email)) {
          throw new Error('Email already exists');
        }
        users.push(userData);
        localStorage.setItem('mock_users', JSON.stringify(users));
        set({ user: userData, isAuthenticated: true });
      },

      // Simulate login
      login: (email, password) => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
          throw new Error('Invalid email or password');
        }
        set({ user, isAuthenticated: true });
      },

      // Google OAuth login
      googleLogin: (googleUser) => {
        const userData = {
          id: Date.now().toString(),
          fullName: googleUser.name,
          email: googleUser.email,
          password: 'google_oauth_' + Date.now(), // Mock password for Google users
          createdAt: new Date().toISOString()
        };
        
        // Save Google user to localStorage
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        if (users.find(u => u.email === googleUser.email)) {
          // User already exists, just login
          set({ user: users.find(u => u.email === googleUser.email), isAuthenticated: true });
        } else {
          // New Google user, save to mock users
          users.push(userData);
          localStorage.setItem('mock_users', JSON.stringify(users));
          set({ user: userData, isAuthenticated: true });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (updatedData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedData } : null
        }));
      }
    }),
    {
      name: 'toliya-auth-storage',
    }
  )
);

export default useAuthStore;
