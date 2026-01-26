import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#050505]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-72 transition-all duration-300">
        <div className="p-4 md:p-8 pt-24 lg:pt-8 min-h-screen">{children}</div>
      </main>
    </div>
  );
}
