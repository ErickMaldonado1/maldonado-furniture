"use client";

import { useState, KeyboardEvent } from "react";
import { Icons } from "@/utils/icons";

interface ArrayInputProps {
  label: string;
  placeholder?: string;
  values: string[];
  onChange: (values: string[]) => void;
}

export function ArrayInput({
  label,
  placeholder,
  values,
  onChange,
}: ArrayInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addValue();
    }
  };

  const addValue = () => {
    const val = inputValue.trim();
    if (val && !values.includes(val)) {
      onChange([...values, val]);
      setInputValue("");
    }
  };

  const removeValue = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Escribe y presiona Enter..."}
          className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#4A3728]/20 outline-none font-medium text-sm"
        />
        <button
          type="button"
          onClick={addValue}
          className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-4 rounded-xl hover:bg-[#4A3728] hover:text-white transition-colors"
        >
          <Icons.Plus className="text-xl" />
        </button>
      </div>

      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {values.map((val, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4A3728]/10 text-[#4A3728] text-xs font-bold"
            >
              {val}
              <button
                type="button"
                onClick={() => removeValue(idx)}
                className="hover:text-red-500 transition-colors"
                aria-label="remove-tag"
              >
                <Icons.XMark className="text-lg" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
