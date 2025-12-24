import React from "react";
import clsx from "clsx";

type TextProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: "500" | "600" | "700";
  color?: "black" | "white" | "gray" | "blue" | "red";
  className?: string;
  children: React.ReactNode;
};

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const weightClasses = {
  "500": "font-medium",
  "600": "font-semibold",
  "700": "font-bold",
};

const colorClasses = {
  black: "text-black",
  white: "white",
  gray: "text-gray-600",
  blue: "text-blue-600",
  red: "text-red-600",
};

export default function Text({
  as = "p",
  size = "md",
  weight = "500",
  color = "black",
  className,
  children,
}: TextProps) {
  const Component = as;

  return (
    <Component
      className={clsx(
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  );
}
