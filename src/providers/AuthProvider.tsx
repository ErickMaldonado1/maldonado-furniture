"use client";

import { SessionProvider } from "next-auth/react";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <SessionMonitor />
      {children}
    </SessionProvider>
  );
}

function SessionMonitor() {
  useSessionTimeout();
  return null;
}
