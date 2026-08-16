"use client";

import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Save, Package, Tags, Image as ImageIcon, Layers } from "lucide-react";
import { useProductForm } from "../hooks/useProductForm";
import { useProductModal } from "../hooks/useProductModal";
import { ProductModal } from "./ProductModal";
import { GeneralTab } from "./GeneralTab";
import { AttributesTab } from "./AttributesTab";
import { ImagesTab } from "./ImagesTab";
import { VariantsTab } from "./VariantsTab";
import { TabType } from "../types/product.types";
import { categories } from "@/utils/categories";

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const { modal, showModal, closeModal } = useProductModal();
  
  const { 
    methods, 
    onSubmit, 
    activeTab, 
    setActiveTab, 
    availableColors 
  } = useProductForm({ initialData, showModal });

  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const attributeCategories = categories.map((category) => ({
    id: category.slug,
    name: category.label,
  }));
  const attributeSubcategories = categories.flatMap((category) =>
    (category.subcategories || []).map((subcategory) => ({
      id: subcategory.sub,
      name: subcategory.label,
      categoryId: category.slug,
    }))
  );
  const attributeMaterials = [
    "Madera Sólida",
    "Melamina",
    "Mixto (Melamina y Madera)",
    "Vidrio",
    "Tela",
  ].map((name) => ({ id: name, name }));

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="animate-in fade-in duration-500 pb-24"
        >
          <div className="pt-16 sticky top-0 z-40 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 px-4 sm:px-8 border-b border-zinc-200 dark:border-zinc-800/60 shadow-sm -mx-2 sm:-mx-8 mb-8 transition-colors">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {initialData ? "Editar Producto" : "Nuevo Producto"}
              </h1>
              <p className="text-zinc-500 text-sm mt-1 font-medium">
                {initialData
                  ? "Actualiza los detalles del producto"
                  : "Completa la información para publicar"}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-bold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-zinc-900 dark:bg-[#A6866A] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {isSubmitting ? <span className="animate-spin">⏳</span> : <Save size={18} />}
                {initialData ? "Guardar Cambios" : "Publicar Producto"}
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex gap-2 sm:gap-4 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto custom-scrollbar pb-px mb-6">
              {[
                { id: "general", label: "General", icon: Package },
                { id: "attributes", label: "Atributos", icon: Tags },
                { id: "images", label: "Imágenes", icon: ImageIcon },
                { id: "variants", label: "Variantes", icon: Layers, error: errors.variantConfig },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap font-bold text-sm ${
                      isActive
                        ? "border-[#A6866A] text-[#A6866A]"
                        : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-[#A6866A]" : ""} />
                    {tab.label}
                    {tab.error && (
                      <span className="text-red-500 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded text-[10px] ml-1">
                        ⚠️ Error
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className={activeTab === "general" ? "block animate-in fade-in slide-in-from-bottom-2 duration-300" : "hidden"}>
              <GeneralTab />
            </div>

            <div className={activeTab === "attributes" ? "block animate-in fade-in slide-in-from-bottom-2 duration-300" : "hidden"}>
              <AttributesTab
                register={methods.register}
                setValue={methods.setValue}
                watch={methods.watch}
                watchedColors={watch("colors") || []}
                availableColors={availableColors}
                selectedCategory={watch("category")}
                selectedSubcategory={watch("subcategory")}
                categories={attributeCategories}
                subcategories={attributeSubcategories}
                materials={attributeMaterials}
                showModal={showModal}
              />
            </div>

            <div className={activeTab === "images" ? "block animate-in fade-in slide-in-from-bottom-2 duration-300" : "hidden"}>
              <ImagesTab showModal={showModal} />
            </div>

            <div className={activeTab === "variants" ? "block animate-in fade-in slide-in-from-bottom-2 duration-300" : "hidden"}>
              <VariantsTab
                availableColors={availableColors}
                showModal={showModal}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>
        </form>
      </FormProvider>
      
      <ProductModal modal={modal} closeModal={closeModal} />
    </div>
  );
}