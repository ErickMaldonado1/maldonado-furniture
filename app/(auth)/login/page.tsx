import LoginForm from "@/features/auth/components/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#F8F9FA] dark:bg-[#050505] overflow-x-hidden flex flex-col items-center px-4">
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center w-full max-w-md dark:bg-[#050505] ">
        <Suspense fallback={<div>Cargando...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
