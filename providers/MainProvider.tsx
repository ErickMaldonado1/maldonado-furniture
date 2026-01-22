"use client";
import AuthProvider from "@/providers/AuthProvider";

export function MainProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
