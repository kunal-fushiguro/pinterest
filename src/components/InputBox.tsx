import { cn } from "../lib/utils";

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
    <div className="flex flex-col gap-1 w-full">
      <span className="text-neutral-800 font-semibold text-sm">{title}</span>
      <input
        type={type}
        value={input}
        placeholder={placeHolderText}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className={cn(
          "outline-none bg-white px-3 py-3 rounded-lg border border-neutral-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition w-full text-sm",
          className
        )}
      />
      {error && (
        <span className="font-semibold text-sm text-red-500">*{errorMsg}</span>
      )}
    </div>
  );
};

export default InputBox;
