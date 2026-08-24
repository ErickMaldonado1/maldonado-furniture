import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  materials: string;
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
  category?: string;
  subcategory?: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string, variantId?: string) => void;
  updateQuantity: (itemId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string, variantId?: string) => boolean;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const cart = get().cart;
        const exists = cart.find(
          (i) => i.id === item.id && i.variantId === item.variantId
        );

        if (exists) {
          const newQuantity = Math.min(exists.quantity + item.quantity, 3);
          set({
            cart: cart.map((i) =>
              i.id === item.id && i.variantId === item.variantId
                ? { ...i, quantity: newQuantity }
                : i
            ),
          });
        } else {
          const quantity = Math.min(item.quantity, 3);
          set({ cart: [...cart, { ...item, quantity }] });
        }
      },
      removeFromCart: (itemId, variantId) => {
        set({
          cart: get().cart.filter(
            (i) => !(i.id === itemId && i.variantId === variantId)
          ),
        });
      },
      updateQuantity: (itemId, variantId, quantity) => {
        if (quantity < 1) return;
        const safeQuantity = Math.min(quantity, 3);
        set({
          cart: get().cart.map((i) =>
            i.id === itemId && i.variantId === variantId
              ? { ...i, quantity: safeQuantity }
              : i
          ),
        });
      },
      isInCart: (itemId, variantId) =>
        get().cart.some((i) => i.id === itemId && i.variantId === variantId),
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
