import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
};

const baseClasses =
  "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantClasses = {
  primary: "bg-black text-white hover:bg-gray-800 focus:ring-black",
  secondary: "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-700",
  outline: "border border-black text-black hover:bg-gray-100 focus:ring-black",
  ghost: "text-black hover:bg-gray-100 focus:ring-gray-300",
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
}
