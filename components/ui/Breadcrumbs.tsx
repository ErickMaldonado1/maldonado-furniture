import Link from "next/link";
import { ChevronRight } from "@/utils/icons/navigation";

interface BreadcrumbStep {
  label: string;
  href?: string;
}

export function Breadcrumbs({ steps }: { steps: BreadcrumbStep[] }) {
  return (
    <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6">
      <Link
        href="/"
        className="text-zinc-400 hover:text-[#4A3728] transition-colors"
      >
        INICIO
      </Link>

      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {step.href ? (
            <Link
              href={step.href}
              className="text-zinc-400 hover:text-[#4A3728] transition-colors whitespace-nowrap"
            >
              {step.label}
            </Link>
          ) : (
            <span className="text-[#4A3728] whitespace-nowrap">
              {step.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
