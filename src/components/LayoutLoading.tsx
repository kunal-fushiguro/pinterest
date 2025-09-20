import { cn } from "../lib/utils";

interface Props {
  className?: string;
  w?: string;
  h?: string;
}

const LayoutLoading = ({ className, w = "w-full", h = "h-6" }: Props) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", w, h, className)}
    />
  );
};

export default LayoutLoading;
