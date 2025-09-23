import { cn } from "@/lib/cn";

interface Props {
  title: string;
  placeHolderText: string;
  input: string | number;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  type: React.HTMLInputTypeAttribute;
  className?: string;
  error: boolean;
  errorMsg: string;
}

const InputBox = ({
  input,
  placeHolderText,
  title,
  type,
  setInput,
  className,
  error,
  errorMsg,
}: Props) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <span className="text-sm font-semibold text-neutral-800">{title}</span>
      <input
        type={type}
        value={input}
        placeholder={placeHolderText}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className={cn(
          "w-full rounded-lg border border-neutral-300 bg-white px-3 py-3 text-sm transition outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200",
          className,
        )}
      />
      {error && (
        <span className="text-sm font-semibold text-red-800">*{errorMsg}</span>
      )}
    </div>
  );
};

export default InputBox;
