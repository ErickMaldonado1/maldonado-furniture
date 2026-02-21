import { Trash, XMark } from "@/utils/icons/actions";
import { FilterSection } from "./FilterSection";
import { ColorFilter } from "./ColorFilter";

export const FilterGroup = ({
  options,
  filters,
  toggleFilter,
  setFilters,
  clearFilters,
}: any) => {
  const OptionCard = ({
    label,
    isActive,
    onClick,
  }: {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`
        flex items-center transition-all duration-200 w-full
        px-2 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest justify-center
        lg:border-none lg:bg-transparent lg:px-0 lg:py-0 lg:justify-start lg:w-full
        ${
          isActive
            ? "bg-[#4A3728]/5 border-[#4A3728] text-[#4A3728] dark:bg-[#4A3728]/10"
            : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500"
        }
      
        lg:dark:bg-transparent lg:bg-transparent
        ${isActive ? "lg:text-[#4A3728]" : "lg:text-zinc-500"}
      `}
    >
      <div
        className={`
          hidden lg:flex w-4 h-4 border rounded-full mr-3 items-center justify-center transition-all shrink-0
          ${isActive ? "bg-[#4A3728] border-[#4A3728]" : "border-zinc-300 dark:border-zinc-700"}
        `}
      >
        <XMark
          className={`text-white w-3 h-3 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <span className="truncate">{label}</span>
    </button>
  );

  return (
    <div className="space-y-4">
      {options.categories?.length > 0 && (
        <FilterSection title="Categoría" defaultOpen>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:space-y-2 lg:block">
            {options.categories.map((cat: string) => (
              <OptionCard
                key={cat}
                label={cat}
                isActive={filters.categories.includes(cat)}
                onClick={() => toggleFilter("categories", cat)}
              />
            ))}
          </div>
        </FilterSection>
      )}
      {options.subcategories?.length > 0 && (
        <FilterSection title="Subcategoría">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:space-y-2 lg:block">
            {options.subcategories.map((sub: string) => (
              <OptionCard
                key={sub}
                label={sub}
                isActive={filters.subcategories.includes(sub)}
                onClick={() => toggleFilter("subcategories", sub)}
              />
            ))}
          </div>
        </FilterSection>
      )}
      {options.colors?.length > 0 && (
        <FilterSection title="Color">
          <ColorFilter
            colors={options.colors}
            selectedColors={filters.colors}
            onToggle={(val) => toggleFilter("colors", val)}
          />
        </FilterSection>
      )}
      {options.styles?.length > 0 && (
        <FilterSection title="Estilo">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:space-y-2 lg:block">
            {["Minimalista", "Contemporáneo", "Moderno"].map(
              (style: string) => (
                <OptionCard
                  key={style}
                  label={style}
                  isActive={filters.styles.includes(style)}
                  onClick={() => toggleFilter("styles", style)}
                />
              ),
            )}
          </div>
        </FilterSection>
      )}
      {options.materials?.length > 0 && (
        <FilterSection title="Material">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:space-y-2 lg:block">
            {options.materials.map((material: string) => (
              <OptionCard
                key={material}
                label={material}
                isActive={filters.materials.includes(material)}
                onClick={() => toggleFilter("materials", material)}
              />
            ))}
          </div>
        </FilterSection>
      )}
      <FilterSection title="Precio Máximo" defaultOpen>
        <div className="mt-1">
          <input
            type="range"
            min="0"
            max="1500"
            step="25"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((prev: any) => ({
                ...prev,
                priceRange: [prev.priceRange[0], parseInt(e.target.value)],
              }))
            }
            className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#4A3728]"
          />
          <div className="flex justify-between mt-2">
            <span className="text-[10px] font-bold text-zinc-400">HASTA</span>
            <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">
              ${filters.priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
      </FilterSection>

      <button
        onClick={clearFilters}
        className="flex items-center gap-2 text-[12px] justify-center font-black uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors pt-6 border-t border-zinc-100 dark:border-zinc-900 w-full"
      >
        <Trash className="w-4 h-4" /> Restablecer
      </button>
    </div>
  );
};
