"use client";

import { useState, useTransition } from "react";
import {
  createColor,
  deleteColor,
} from "@/features/admin/colors/color.actions";
import { uploadImage } from "@/features/admin/media/image.actions";
import ImageUpload from "@/features/admin/components/ImageUpload";
import { toast } from "sonner";
import {
  HiOutlineTrash,
  HiPlus,
  HiX,
} from "react-icons/hi";
import Image from "next/image";
import { ColorCompany } from "@prisma/client";

type ColorItem = {
  id: string;
  name: string;
  company: ColorCompany;
  slug: string | null;
  hexCode: string | null;
  imageUrl: string | null;
  publicId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function ColorClient({
  initialColors,
}: {
  initialColors: ColorItem[];
}) {
  const [colors, setColors] =
    useState<ColorItem[]>(initialColors);

  const [isAdding, setIsAdding] = useState(true);
  const [page, setPage] = useState(1);

  const [name, setName] = useState("");

  const [company, setCompany] =
    useState<ColorCompany>("PELIKANO");

  const [hexCode, setHexCode] =
    useState("#4A3728");

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [isPending, startTransition] =
    useTransition();

  const itemsPerPage = 15;
  const getCompanyName = (
    company: ColorCompany
  ) => {
    switch (company) {
      case "PELIKANO":
        return "Pelikano";

      case "EDIMCA":
        return "Edimca";

      case "MASISA":
        return "Masisa";

      default:
        return company;
    }
  };

  const handleCreate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("El nombre es requerido");
      return;
    }

    if (!company) {
      toast.error("Selecciona una empresa");
      return;
    }

    const toastId = toast.loading(
      imageFile
        ? "Subiendo imagen..."
        : "Creando color..."
    );

    startTransition(async () => {
      try {

        let imageUrl: string | undefined;
        let publicId: string | undefined;

        if (imageFile) {
          const formData = new FormData();

          formData.append(
            "file",
            imageFile
          );

          const uploadResult =
            await uploadImage(
              formData,
              "colors"
            );

          if (!uploadResult.success) {
            toast.error(
              uploadResult.error ||
              "No se pudo subir la imagen.",
              {
                id: toastId,
              }
            );

            return;
          }
          imageUrl =
            uploadResult.imageUrl;

          publicId =
            uploadResult.publicId;
        }

        const result =
          await createColor({
            name: name.trim(),

            company,

            hexCode:
              hexCode.trim() || undefined,

            imageUrl,

            publicId,
          });

        if (!result.success) {
          toast.error(
            result.error ||
            "No se pudo crear el color.",
            {
              id: toastId,
            }
          );

          return;
        }

        if (!result.color) {
          toast.error(
            "El color fue creado pero no se recibió la información.",
            {
              id: toastId,
            }
          );

          return;
        }

        setColors((prev) => {
          const updated = [
            ...prev,
            result.color,
          ];

          return updated.sort((a, b) => {
            const companyCompare =
              a.company.localeCompare(
                b.company
              );

            if (companyCompare !== 0) {
              return companyCompare;
            }

            return a.name.localeCompare(
              b.name
            );
          });
        });

        setName("");

        setCompany("PELIKANO");

        setHexCode("#4A3728");

        setImageFile(null);

        setIsAdding(false);

        toast.success(
          "Color creado correctamente",
          {
            id: toastId,
          }
        );
      } catch (error) {
        console.error(
          "Error creando color:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Ocurrió un error al crear el color.",
          {
            id: toastId,
          }
        );
      }
    });
  };

  const handleDelete = async (
    id: string
  ) => {
    if (
      !confirm(
        "¿Eliminar este color?"
      )
    ) {
      return;
    }

    const toastId =
      toast.loading(
        "Eliminando..."
      );

    startTransition(async () => {
      try {
        const result =
          await deleteColor(id);

        if (!result.success) {
          toast.error(
            result.error ||
            "No se pudo eliminar el color.",
            {
              id: toastId,
            }
          );

          return;
        }

        setColors((prev) =>
          prev.filter(
            (color) =>
              color.id !== id
          )
        );

        toast.success(
          "Color eliminado correctamente",
          {
            id: toastId,
          }
        );
      } catch (error) {
        console.error(
          "Error eliminando color:",
          error
        );

        toast.error(
          "No se pudo eliminar el color.",
          {
            id: toastId,
          }
        );
      }
    });
  };

  const displayedColors =
    colors.slice(
      0,
      page * itemsPerPage
    );

  const hasMore =
    displayedColors.length <
    colors.length;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl overflow-hidden shadow-sm">

        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">

          <div>
            <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
              Todos los Colores (
              {colors.length}
              )
            </h3>

            <p className="text-xs text-zinc-400 mt-0.5">
              Administra los colores disponibles
              y su empresa de origen.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setIsAdding(!isAdding)
            }
            className="flex items-center gap-2 px-3 py-2 bg-[#4A3728] text-white text-sm font-medium rounded-lg hover:opacity-90 transition"
          >
            {isAdding ? (
              <HiX size={18} />
            ) : (
              <HiPlus size={18} />
            )}

            {isAdding
              ? "Cancelar"
              : "Nuevo Color"}
          </button>
        </div>

        {isAdding && (
          <form
            onSubmit={handleCreate}
            className="p-5 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">


              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Nombre del color
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-[#4A3728]/20"
                  placeholder="Ej: Cartagena"
                  required
                />
              </div>


              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Empresa
                </label>

                <select
                  value={company}
                  onChange={(e) =>
                    setCompany(
                      e.target.value as ColorCompany
                    )
                  }
                  className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-[#4A3728]/20"
                  required
                >
                  <option value="PELIKANO">
                    Pelikano
                  </option>

                  <option value="EDIMCA">
                    Edimca
                  </option>

                  <option value="MASISA">
                    Masisa
                  </option>
                </select>

                <p className="text-xs text-zinc-400">
                  Empresa de origen de la muestra.
                </p>
              </div>


              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Color base
                </label>

                <div className="flex gap-2">

                  <input
                    type="color"
                    value={hexCode}
                    onChange={(e) =>
                      setHexCode(
                        e.target.value
                      )
                    }
                    className="w-12 h-11 rounded-lg cursor-pointer border border-zinc-200 dark:border-zinc-700 p-1 bg-white"
                  />

                  <input
                    type="text"
                    value={hexCode}
                    onChange={(e) =>
                      setHexCode(
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white uppercase outline-none focus:ring-2 focus:ring-[#4A3728]/20"
                    placeholder="#4A3728"
                  />

                </div>

                <p className="text-xs text-zinc-400">
                  Puedes utilizarlo como color de respaldo.
                </p>
              </div>

              <ImageUpload
                value={imageFile}
                onChange={
                  setImageFile
                }
              />

            </div>


            <div className="mt-5 p-3 rounded-lg bg-[#4A3728]/5 border border-[#4A3728]/10">

              <p className="text-xs text-zinc-600 dark:text-zinc-400">

                <strong>
                  Empresa:
                </strong>{" "}

                {getCompanyName(
                  company
                )}

                {" · "}

                <strong>
                  Color:
                </strong>{" "}

                {name ||
                  "Sin nombre"}

              </p>

            </div>

            <div className="flex justify-end mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800">

              <button
                type="submit"
                disabled={isPending}
                className="px-5 py-2.5 bg-[#4A3728] text-white text-sm font-medium rounded-lg hover:opacity-90 transition disabled:opacity-60"
              >
                {isPending
                  ? "Guardando..."
                  : "Guardar Color"}
              </button>

            </div>

          </form>
        )}

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">

            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-xs uppercase font-semibold text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">

              <tr>

                <th className="px-4 py-3">
                  Muestra
                </th>

                <th className="px-4 py-3">
                  Empresa
                </th>

                <th className="px-4 py-3">
                  Nombre
                </th>

                <th className="px-4 py-3">
                  Slug
                </th>

                <th className="px-4 py-3">
                  Hex
                </th>

                <th className="px-4 py-3 text-right">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">

              {displayedColors.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-zinc-500"
                  >
                    No hay colores registrados.
                    Crea el primero.
                  </td>

                </tr>

              ) : (

                displayedColors.map(
                  (color) => (

                    <tr
                      key={color.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                    >

                      <td className="px-4 py-3">

                        <div
                          className="w-12 h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden relative shadow-sm"
                          style={{
                            backgroundColor:
                              color.hexCode ||
                              "#ccc",
                          }}
                        >

                          {color.imageUrl && (

                            <Image
                              src={
                                color.imageUrl
                              }
                              alt={
                                color.name
                              }
                              fill
                              sizes="48px"
                              className="object-cover"
                              loading="lazy"
                            />

                          )}

                        </div>

                      </td>

                      <td className="px-4 py-3">

                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">

                          {getCompanyName(
                            color.company
                          )}

                        </span>

                      </td>


                      <td className="px-4 py-3">

                        <div className="font-medium text-zinc-900 dark:text-zinc-100">
                          {color.name}
                        </div>

                      </td>


                      <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                        {color.slug ||
                          "-"}
                      </td>

                      <td className="px-4 py-3">

                        <div className="flex items-center gap-2">

                          {color.hexCode && (

                            <span
                              className="w-5 h-5 rounded border border-zinc-200 inline-block"
                              style={{
                                backgroundColor:
                                  color.hexCode,
                              }}
                            />

                          )}

                          <span className="font-mono text-xs">
                            {color.hexCode ||
                              "-"}
                          </span>

                        </div>

                      </td>


                      <td className="px-4 py-3 text-right">

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              color.id
                            )
                          }
                          disabled={
                            isPending
                          }
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-40"
                          title="Eliminar"
                        >

                          <HiOutlineTrash
                            size={18}
                          />

                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>


        {hasMore && (

          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-center bg-zinc-50 dark:bg-zinc-900/30">

            <button
              type="button"
              onClick={() =>
                setPage(
                  (p) => p + 1
                )
              }
              className="px-5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
            >

              Cargar más colores (
              {colors.length -
                displayedColors.length}{" "}
              restantes)

            </button>

          </div>

        )}

      </div>
    </div>
  );
}