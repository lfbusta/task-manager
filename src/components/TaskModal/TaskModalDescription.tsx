import { twMerge } from "tailwind-merge";

const baseClasses =
  "text-sm border-1 border-white rounded-md focus:bg-white cursor-pointer focus:cursor-text text-slate-800 placeholder:text-slate-400 p-1 min-h-48";

interface DescriptionProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export default function Description({
  value,
  onBlur,
  onChange,
  onKeyDown,
  className,
}: DescriptionProps) {
  const emptyTextAreaClasses = value ? "" : "border-slate-100";

  return (
    <textarea
      className={twMerge(baseClasses, emptyTextAreaClasses, className)}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Click to add a description"
    />
  );
}
