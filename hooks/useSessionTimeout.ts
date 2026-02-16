"use client";
import { useEffect, useRef, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

const INACTIVITY_TIMEOUT = 20 * 60 * 1000;
const WARNING_TIME = 2 * 60 * 1000;

export function useSessionTimeout() {
  const { status } = useSession();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningShownRef = useRef(false);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (status === "authenticated") {
      warningShownRef.current = false;
      setTimeout(() => {
        if (status === "authenticated" && !warningShownRef.current) {
          warningShownRef.current = true;
          toast.warning("Tu sesión expirará pronto", {
            description: "Por inactividad, tu sesión se cerrará en 2 minutos",
            duration: 5000,
          });
        }
      }, INACTIVITY_TIMEOUT - WARNING_TIME);

      timeoutRef.current = setTimeout(() => {
        if (status === "authenticated") {
          toast.error("Sesión cerrada por inactividad", {
            description: "Has estado inactivo por más de 20 minutos",
            duration: 3000,
          });
          signOut({ callbackUrl: "/login" });
        }
      }, INACTIVITY_TIMEOUT);
    }
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") return;
    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
    resetTimer();
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [status, resetTimer]);

  return null;
}
