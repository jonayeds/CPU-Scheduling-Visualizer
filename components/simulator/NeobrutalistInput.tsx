import React from "react";

interface NeobrutalistInputProps {
  label?: string;
  type?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function NeobrutalistInput({
  label,
  type = "number",
  value,
  onChange,
  placeholder,
  disabled = false,
  className = "",
}: NeobrutalistInputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="font-body text-xs font-bold uppercase tracking-wider text-foreground/60">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="border-4 border-black bg-white px-3 py-2 font-body outline-none transition-all focus:bg-primary-highlight disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}
