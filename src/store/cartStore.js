import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, variant, quantity = 1) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          item => item.productId === product.id && item.variantId === variant.id
        );

        const hasSale = product.salePercentage > 0;
        const basePriceRaw = product.basePrice + (variant.priceAdjustment || 0);
        const unitPrice = hasSale 
          ? (basePriceRaw * (100 - product.salePercentage)) / 100 
          : basePriceRaw;

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          updatedItems[existingItemIndex].subtotal = updatedItems[existingItemIndex].unitPrice * updatedItems[existingItemIndex].quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          const newItem = {
            id: `cart_item_${Date.now()}_${Math.random()}`,
            productId: product.id,
            variantId: variant.id,
            productName: product.name,
            variantName: variant.name,
            image: product.images[0] || '/images/placeholder.jpg',
            quantity,
            unitPrice,
            subtotal: unitPrice * quantity,
            available: variant.inventory.available >= quantity,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter(item => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const items = get().items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity,
              subtotal: item.unitPrice * quantity,
            };
          }
          return item;
        });
        set({ items });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.subtotal, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shippingCost = subtotal > 0 ? 50000 : 0; // 500 PKR shipping
        const tax = subtotal * 0.15; // 15% tax
        return subtotal + shippingCost + tax;
      },
    }),
    {
      name: 'towel-store-cart',
    }
  )
);

export default useCartStore;



