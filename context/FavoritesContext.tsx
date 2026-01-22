"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface FavoriteItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (product: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // 1. Cargar favoritos guardados al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // 2. Guardar cada vez que cambien
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Si ya existe, lo quitamos (Toggle)
        return prev.filter((item) => item.id !== product.id);
      }
      // Si no existe, lo agregamos
      return [...prev, product];
    });
  };

  const isFavorite = (id: string) => favorites.some((item) => item.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return context;
};
