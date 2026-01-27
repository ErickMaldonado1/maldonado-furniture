"use client";

import AuthProvider from "@/providers/AuthProvider";
import ClientUI from "@/providers/ClientUI"; 

export function MainProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <ClientUI />
    </AuthProvider>
  );
}
