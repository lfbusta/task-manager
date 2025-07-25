import { twMerge } from "tailwind-merge";

const baseClasses =
  "text-xl font-semibold border border-white rounded-md focus:bg-white cursor-pointer focus:cursor-text text-slate-800 pl-2";

interface TaskModalTitleProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function TaskModalTitle({
  value,
  onBlur,
  onChange,
  onKeyDown,
  className,
}: TaskModalTitleProps) {
  return (
    <input
      type="text"
      role="heading"
      aria-level={3}
      className={twMerge(baseClasses, className)}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
