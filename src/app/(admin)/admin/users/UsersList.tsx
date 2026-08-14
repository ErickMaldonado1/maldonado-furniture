"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Shield,
  Edit2,
  Trash2,
  Search,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: any;
}

interface UsersListProps {
  initialUsers: User[];
}

export default function UsersList({ initialUsers }: UsersListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState<"USER" | "ADMIN">("USER");
  const [actionLoading, setActionLoading] = useState(false);

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();
    const nameMatch = user.name?.toLowerCase().includes(term) || false;
    const emailMatch = user.email.toLowerCase().includes(term);
    return nameMatch || emailMatch;
  });

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditName(user.name || "");
    setEditRole(user.role);
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditName("");
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    if (!editName.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch(`/api/users/${editingUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, role: editRole }),
      });

      if (!res.ok) {
        throw new Error("No se pudo actualizar el usuario");
      }

      const updated = await res.json();

      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...u, name: updated.name, role: updated.role }
            : u,
        ),
      );

      toast.success("Usuario actualizado correctamente");
      closeEditModal();
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar el usuario");
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteModal = (user: User) => {
    setDeletingUser(user);
  };

  const closeDeleteModal = () => {
    setDeletingUser(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/users/${deletingUser.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("No se pudo eliminar el usuario");
      }

      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
      toast.success("Usuario eliminado correctamente");
      closeDeleteModal();
    } catch (err: any) {
      toast.error(err.message || "Error al eliminar el usuario");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-zinc-200 dark:border-zinc-800/80 pb-6">
        <Link
          href="/admin"
          className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-[#4A3728] dark:hover:text-[#A6866A] transition-colors w-fit group mb-2"
        >
          <ArrowLeft size={13} />
          Volver al Panel
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              Control de{" "}
              <span className="text-[#4A3728] dark:text-[#A6866A]">
                Usuarios
              </span>
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Administra los perfiles, permisos y accesos de los usuarios
              registrados.
            </p>
          </div>
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
            {filteredUsers.length} / {users.length} usuarios
          </span>
        </div>
      </div>
      <div className="relative max-w-md w-full">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          value={search}
          onChange={handleSearchChange}
          className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-11 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all text-zinc-900 dark:text-white text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/60 p-6 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all group relative overflow-hidden shadow-sm hover:shadow-md dark:shadow-none"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
              <button
                onClick={() => openEditModal(user)}
                className="p-2 bg-white dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors border border-zinc-200 dark:border-zinc-800 shadow-sm cursor-pointer"
                title="Editar"
                aria-label="Editar usuario"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => openDeleteModal(user)}
                className="p-2 bg-white dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-red-500 transition-colors border border-zinc-200 dark:border-zinc-800 shadow-sm cursor-pointer"
                title="Eliminar"
                aria-label="Eliminar usuario"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-lg font-bold text-zinc-700 dark:text-zinc-300 shrink-0 group-hover:ring-2 group-hover:ring-[#A6866A]/30 transition-all">
                {getInitials(user.name)}
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide truncate">
                  {user.name || "Usuario sin nombre"}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-1">
                  <Shield
                    size={12}
                    className={
                      user.role === "ADMIN"
                        ? "text-[#4A3728] dark:text-[#A6866A]"
                        : "text-zinc-400 dark:text-zinc-600"
                    }
                  />
                  <span className="uppercase font-bold tracking-wider">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors truncate">
              <Mail size={14} />
              <span className="truncate">{user.email}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="py-20 text-center text-sm text-zinc-400 dark:text-zinc-600 italic">
          No se encontraron usuarios
        </div>
      )}

     
      <AnimatePresence>

        {editingUser && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEditModal}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-100 dark:border-zinc-900">
                <h3 className="font-black text-zinc-950 dark:text-white uppercase -wider text-[10px]">
                  Editar Usuario
                </h3>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="text-zinc-400 hover:text-zinc-750 dark:hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-black -wider">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full text-sm border border-zinc-200 dark:border-zinc-800 rounded-sm p-3 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all font-bold"
                    placeholder="Nombre del usuario"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-black -wider">
                    Rol / Permisos
                  </label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as any)}
                    className="w-full text-sm border border-zinc-200 dark:border-zinc-800 rounded-sm p-3 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-[#A6866A]/50 transition-all cursor-pointer font-bold"
                  >
                    <option value="USER">USER (Cliente)</option>
                    <option value="ADMIN">ADMIN (Administrador)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold text-xs uppercase  hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2.5 rounded-sm bg-zinc-900 dark:bg-[#A6866A] text-white dark:text-black font-bold text-xs uppercase  hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    {actionLoading ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        {deletingUser && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDeleteModal}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-100 dark:border-zinc-900">
                <h3 className="font-black text-red-500 uppercase -wider text-[10px]">
                  Confirmar Eliminación
                </h3>
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  ¿Estás seguro de que deseas eliminar permanentemente a{" "}
                  <strong className="text-zinc-950 dark:text-white font-bold">
                    {deletingUser.name || deletingUser.email}
                  </strong>
                  ?
                </p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-sm border border-zinc-200/50 dark:border-zinc-800/50 uppercase -wider font-bold">
                  Esta acción eliminará su cuenta, sesiones activas y favoritos.
                  No se puede deshacer.
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeDeleteModal}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold text-xs uppercase  hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2.5 rounded-sm bg-red-600 text-white font-bold text-xs uppercase  hover:bg-red-700 transition-colors"
                  >
                    {actionLoading ? "Eliminando..." : "Eliminar Usuario"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
