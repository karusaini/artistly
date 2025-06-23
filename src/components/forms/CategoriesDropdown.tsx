"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

type Props = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
};

export default function CategoriesDropdown({
  label,
  options,
  selected,
  onChange,
  error,
}: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="font-medium block mb-1">{label}</label>
      <div
        onClick={() => setOpen(!open)}
        className="border rounded px-3 py-2 cursor-pointer flex justify-between items-center"
      >
        <span className="truncate">
          {selected.length > 0 ? selected.join(", ") : "Select Categories"}
        </span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </div>

      {open && (
        <div className="absolute z-10 mt-1 bg-white border shadow rounded w-full max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                readOnly
              />
              <span>{option}</span>
              {selected.includes(option) && (
                <Check className="w-4 h-4 text-green-600 ml-auto" />
              )}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
