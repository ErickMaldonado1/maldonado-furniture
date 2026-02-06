import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  materials: string;
  material: string;
  dimensions: string;
  variantName: string;
  sku: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variantId?: string;
  maxQuantity?: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const cart = get().cart;
        const exists = cart.find((i) => i.id === item.id);

        if (exists) {
          const newQuantity = Math.min(exists.quantity + item.quantity, 3);
          set({
            cart: cart.map((i) =>
              i.id === item.id ? { ...i, quantity: newQuantity } : i,
            ),
          });
        } else {
          const quantity = Math.min(item.quantity, 3);
          set({ cart: [...cart, { ...item, quantity }] });
        }
      },
      removeFromCart: (itemId) => {
        set({ cart: get().cart.filter((i) => i.id !== itemId) });
      },
      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) return;
        const safeQuantity = Math.min(quantity, 3);
        set({
          cart: get().cart.map((i) =>
            i.id === itemId ? { ...i, quantity: safeQuantity } : i,
          ),
        });
      },
      isInCart: (itemId) => get().cart.some((i) => i.id === itemId),
      clearCart: () => set({ cart: [] }),
      getTotalItems: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),
      getTotalPrice: () =>
        get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "shopping-cart",
    },
  ),
);
