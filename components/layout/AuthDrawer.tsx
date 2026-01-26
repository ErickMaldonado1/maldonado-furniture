"use client";

import React, { useState } from "react";
import Drawer from "@/components/ui/Drawer";
import LoginForm from "@/features/auth/components/LoginForm";
import RegisterForm from "@/features/auth/components/RegisterForm";

interface AuthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthDrawer: React.FC<AuthDrawerProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<"login" | "register">("login");

  React.useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setView("login"), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={view === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
    >
      <div className="flex flex-col justify-center h-full">
        {view === "login" ? (
          <LoginForm
            onSuccess={onClose}
            onSwitchToRegister={() => setView("register")}
          />
        ) : (
          <RegisterForm
            onSuccess={onClose}
            onSwitchToLogin={() => setView("login")}
          />
        )}
      </div>
    </Drawer>
  );
};

export default AuthDrawer;
