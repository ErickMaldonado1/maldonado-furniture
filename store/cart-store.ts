import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
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
          set({
            cart: cart.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          });
        } else {
          set({ cart: [...cart, item] });
        }
      },
      removeFromCart: (itemId) => {
        set({ cart: get().cart.filter((i) => i.id !== itemId) });
      },
      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) return;
        set({
          cart: get().cart.map((i) =>
            i.id === itemId ? { ...i, quantity } : i,
          ),
        });
      },
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
