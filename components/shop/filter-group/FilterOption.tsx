import { XMark } from "@/utils/icons/index";

export const FilterOption = ({
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
      px-2 py-1 rounded-lg border text-xs font-bold uppercase tracking-widest justify-center
      lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:justify-start lg:w-full lg:rounded-none
      ${
        isActive
          ? "bg-[#4A3728]/5 border-[#4A3728] text-[#4A3728] dark:bg-[#4A3728]/10"
          : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500"
      }
      lg:dark:bg-transparent lg:bg-transparent lg:border-transparent
      ${isActive ? "lg:text-[#4A3728]" : "lg:text-zinc-500 lg:hover:text-zinc-800"}
    `}
  >
    <div
      className={`
        hidden lg:flex w-4 h-4 border rounded-full mr-3 items-center justify-center transition-all shrink-0
        ${isActive ? "bg-[#4A3728] border-[#4A3728]" : "border-zinc-300 dark:border-zinc-700"}
      `}
    >
      <XMark
        className={`w-3 h-3 text-white transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
      />
    </div>

    <span className="truncate">{label}</span>
  </button>
);
