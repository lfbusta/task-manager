import { twMerge } from "tailwind-merge";

const baseClasses =
  "text-sm font-semibold border border-slate-100 rounded-md p-1 focus:bg-white cursor-pointer focus:cursor-text text-slate-800";

interface ColumnTitleProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  className?: string;
}

export default function ColumnTitle({
  value,
  onBlur,
  onChange,
  className,
}: ColumnTitleProps) {
  return (
    <input
      type="text"
      className={twMerge(baseClasses, className)}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}
