import React from "react";

interface NeobrutalistButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  disabled?: boolean;
}

export default function NeobrutalistButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}: NeobrutalistButtonProps) {
  const variants = {
    primary: "bg-primary-highlight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    secondary: "bg-secondary-highlight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    danger: "bg-red-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        border-4 border-black px-6 py-3 font-bold uppercase tracking-tight text-black
        transition-all active:translate-x-1 active:translate-y-1 active:shadow-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
