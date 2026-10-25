import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "outlineBlue" | "ghost" ;
  size?: "default" | "sm" | "lg" | "icon"; 
}