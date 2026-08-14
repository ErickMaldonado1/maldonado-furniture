import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteItem {
  id: string;
  name: string;
  image: string;
  price: number;
  category?: string;
  subcategory?: string;
}

interface FavoritesState {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (item) => {
        const favorites = get().favorites;
        const exists = favorites.some((i) => i.id === item.id);

        if (exists) {
          set({ favorites: favorites.filter((i) => i.id !== item.id) });
        } else {
          set({ favorites: [...favorites, item] });
        }
      },
      isFavorite: (id) => get().favorites.some((item) => item.id === id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
    },
  ),
);
