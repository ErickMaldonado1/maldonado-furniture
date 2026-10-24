import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemCustomization {
  isCustom: boolean;
  customWidth?: number | string;
  customHeight?: number | string;
  customDepth?: number | string;
  finish?: string;
  notes?: string;
  clientName?: string;
  clientCity?: string;
}

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
  customization?: CartItemCustomization;
  customKey?: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    itemId: string,
    variantId?: string,
    customKey?: string,
  ) => void;
  updateQuantity: (
    itemId: string,
    variantId?: string,
    quantity?: number,
    customKey?: string,
  ) => void;
  clearCart: () => void;
  isInCart: (itemId: string, variantId?: string, customKey?: string) => boolean;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const cart = get().cart;
        const exists = cart.find((i) => {
          if (item.customKey) {
            return (
              i.id === item.id &&
              i.variantId === item.variantId &&
              i.customKey === item.customKey
            );
          }
          return (
            i.id === item.id && i.variantId === item.variantId && !i.customKey
          );
        });

        if (exists) {
          const max = item.maxQuantity || 10;
          const newQuantity = Math.min(exists.quantity + item.quantity, max);
          set({
            cart: cart.map((i) => {
              const matches = item.customKey
                ? i.id === item.id &&
                  i.variantId === item.variantId &&
                  i.customKey === item.customKey
                : i.id === item.id &&
                  i.variantId === item.variantId &&
                  !i.customKey;
              return matches ? { ...i, quantity: newQuantity } : i;
            }),
          });
        } else {
          const max = item.maxQuantity || 10;
          const quantity = Math.min(item.quantity, max);
          set({ cart: [...cart, { ...item, quantity }] });
        }
      },
      removeFromCart: (itemId, variantId, customKey) => {
        set({
          cart: get().cart.filter((i) => {
            if (customKey) {
              return !(
                i.id === itemId &&
                i.variantId === variantId &&
                i.customKey === customKey
              );
            }
            return !(
              i.id === itemId &&
              i.variantId === variantId &&
              !i.customKey
            );
          }),
        });
      },
      updateQuantity: (itemId, variantId, quantity = 1, customKey) => {
        if (quantity < 1) return;
        const safeQuantity = Math.min(quantity, 10);
        set({
          cart: get().cart.map((i) => {
            const matches = customKey
              ? i.id === itemId &&
                i.variantId === variantId &&
                i.customKey === customKey
              : i.id === itemId && i.variantId === variantId && !i.customKey;
            return matches ? { ...i, quantity: safeQuantity } : i;
          }),
        });
      },
      isInCart: (itemId, variantId, customKey) =>
        get().cart.some((i) =>
          customKey
            ? i.id === itemId &&
              i.variantId === variantId &&
              i.customKey === customKey
            : i.id === itemId && i.variantId === variantId && !i.customKey,
        ),
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
