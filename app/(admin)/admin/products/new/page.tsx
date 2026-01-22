"use client";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  productSchema,
  ProductFormValues,
} from "@/features/admin/product.schema";
import {
  createFullProduct,
  uploadProductImage,
} from "@/features/admin/product.actions";

export default function NewProductPage() {
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      price: 0,
      category: "",
      images: [],
      variants: [
        {
          name: "Estándar",
          sku: "",
          width: 0,
          height: 0,
          depth: 0,
          thickness: null,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const currentImages = watch("images");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const res = await uploadProductImage(reader.result as string);

      if (res.success) {
        if ("url" in res && "publicId" in res) {
          const newImage = { url: res.url, publicId: res.publicId };
          setValue("images", [...currentImages, newImage]);
        }
      } else {
        alert("Error al subir: " + ("error" in res ? res.error : "Unknown"));
      }
      setUploading(false);
    };
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const res = await createFullProduct(data);
    if (res.success) {
      alert("Producto creado con éxito");
    } else {
      alert("Error al guardar: " + (res as any).error);
    }
  };

  return (
    <div className="p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto"
      >
        <h1 className="text-2xl font-bold">Crear Nuevo Producto</h1>
        <div className="border-2 border-dashed p-4 rounded-lg bg-gray-50">
          <input
            type="file"
            onChange={handleImageUpload}
            disabled={uploading}
            className="mb-4"
          />
          <div className="flex gap-2">
            {currentImages.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt="preview"
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            {...register("name")}
            placeholder="Nombre"
            className="border p-2 rounded"
          />
          <input
            {...register("sku")}
            placeholder="SKU"
            className="border p-2 rounded"
          />
          <input
            {...register("price")}
            type="number"
            step="any"
            placeholder="Precio"
            className="border p-2 rounded"
          />
          <input
            {...register("category")}
            placeholder="Categoría"
            className="border p-2 rounded"
          />
        </div>

        <textarea
          {...register("description")}
          placeholder="Descripción"
          className="w-full border p-2 rounded h-24"
        />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Variantes y Dimensiones</h3>
            <button
              type="button"
              onClick={() =>
                append({
                  name: "",
                  sku: "",
                  width: 0,
                  height: 0,
                  depth: 0,
                  thickness: null,
                })
              }
              className="bg-gray-200 px-3 py-1 rounded text-sm"
            >
              + Añadir Variante
            </button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border p-4 rounded bg-white grid grid-cols-3 gap-3 relative"
            >
              <input
                {...register(`variants.${index}.name`)}
                placeholder="Nombre (ej. Grande)"
                className="border p-1"
              />
              <input
                {...register(`variants.${index}.sku`)}
                placeholder="SKU Variante"
                className="border p-1"
              />
              <input
                {...register(`variants.${index}.width`)}
                type="number"
                placeholder="Ancho"
                className="border p-1"
              />
              <input
                {...register(`variants.${index}.height`)}
                type="number"
                placeholder="Alto"
                className="border p-1"
              />
              <input
                {...register(`variants.${index}.depth`)}
                type="number"
                placeholder="Profundidad"
                className="border p-1"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-xs"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Guardando en Base de Datos..." : "Publicar Producto"}
        </button>
      </form>
    </div>
  );
}
