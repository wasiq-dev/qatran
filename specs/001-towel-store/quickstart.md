# Quickstart Guide: E-Commerce Towel Store

**Date**: 2025-01-27  
**Feature**: 001-towel-store

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git
- Code editor (VS Code recommended)

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Required Packages

```bash
# Core dependencies
npm install react react-dom react-router-dom

# State management
npm install zustand

# Forms
npm install react-hook-form

# Animations
npm install framer-motion

# Styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Payment (choose one or both)
npm install @stripe/stripe-js
# OR
npm install @paypal/react-paypal-js

# Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @playwright/test
```

### 3. Configure Tailwind CSS

Edit `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#your-brand-color',
          // Add your brand colors
        },
      },
    },
  },
  plugins: [],
}
```

### 4. Setup Environment Variables

Create `.env` file:

```env
# Payment Gateway
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
# OR
VITE_PAYPAL_CLIENT_ID=...

# API (for future use)
VITE_API_URL=http://localhost:3000/api/v1
```

### 5. Create Project Structure

```bash
mkdir -p src/components/{common,product,cart,checkout,layout}
mkdir -p src/pages
mkdir -p src/hooks
mkdir -p src/services
mkdir -p src/store
mkdir -p src/data
mkdir -p src/utils
mkdir -p public/images/products
```

## Development Workflow

### Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

Output will be in `dist/` directory

### Preview Production Build

```bash
npm run preview
```

## Project Structure Overview

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Buttons, cards, modals
│   ├── product/        # ProductCard, ProductImage
│   ├── cart/           # CartItem, CartSummary
│   ├── checkout/       # CheckoutForm, PaymentForm
│   └── layout/         # Header, Footer, Navigation
├── pages/              # Page components (routes)
├── hooks/              # Custom React hooks
├── services/           # Business logic & API calls
├── store/              # Zustand stores
├── data/               # JSON data files
└── utils/              # Utility functions
```

## Key Files to Create

### 1. Router Setup (`src/App.jsx`)

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import Layout from './components/layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductListPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order-confirmation/:orderId', element: <OrderConfirmationPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

### 2. Cart Store (`src/store/cartStore.js`)

```jsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (product, variant, quantity) => {
        // Implementation
      },
      removeItem: (itemId) => {
        // Implementation
      },
      updateQuantity: (itemId, quantity) => {
        // Implementation
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        // Calculate total
      },
    }),
    {
      name: 'towel-store-cart',
    }
  )
);

export default useCartStore;
```

### 3. Product Service (`src/services/productService.js`)

```jsx
// Initial implementation with JSON
import productsData from '../data/products.json';

export const getProducts = async (filters = {}) => {
  // Filter products based on filters
  // Return filtered products
};

export const getProductById = async (id) => {
  // Find and return product by ID
};

export const getProductBySlug = async (slug) => {
  // Find and return product by slug
};

// Future: Replace with API calls
// export const getProducts = async (filters = {}) => {
//   const response = await fetch(`${import.meta.env.VITE_API_URL}/products?${new URLSearchParams(filters)}`);
//   return response.json();
// };
```

### 4. Sample Product Data (`src/data/products.json`)

See `data-model.md` for structure. Create initial products array with sample data.

## Testing

### Run Unit Tests

```bash
npm run test
```

### Run E2E Tests

```bash
npx playwright test
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Configure environment variables in Vercel dashboard
4. Connect GitHub repository for automatic deployments

### Netlify Deployment

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`
3. Configure environment variables in Netlify dashboard
4. Connect GitHub repository for automatic deployments

## Next Steps

1. Create sample product data in `src/data/products.json`
2. Implement core components (ProductCard, Cart, etc.)
3. Set up payment gateway (Stripe or PayPal)
4. Add animations with Framer Motion
5. Implement search and filtering
6. Add tests for critical flows
7. Deploy to production

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:watch   # Watch mode for tests
```

## Troubleshooting

### Images not loading
- Check image paths in `public/images/`
- Verify image URLs in product data
- Check browser console for 404 errors

### Cart not persisting
- Check localStorage in browser DevTools
- Verify Zustand persist middleware is configured
- Check for localStorage quota issues

### Payment not working
- Verify environment variables are set
- Check payment gateway API keys
- Review browser console for errors
- Test with payment gateway test credentials

## Resources

- [React Router Docs](https://reactrouter.com/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Stripe Docs](https://stripe.com/docs)
- [Vite Docs](https://vite.dev/)



