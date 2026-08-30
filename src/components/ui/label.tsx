import { LabelProps } from "@/shared/types/ui/label.props";

export function Label({ className = "", children, ...props }: LabelProps) {
  return (
    <label       
      className={`block text-base md:text-sm font-medium text-gray-700 mb-1.5 md:mb-1 ${className}`} 
      {...props}
    >
      {children}
    </label>
  );
}