import { cn } from "../lib/utils";
import type React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Button = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        " bg-red-600 flex justify-center items-center text-white px-4 py-1.5 text-md font-bold rounded-xl hover:bg-red-700 hover:text-white/80",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Button;
