import { FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

const baseClasses =
  "flex items-center justify-between cursor-pointer bg-slate-100/50 rounded-md text-left text-xs text-slate-500 font-semibold p-2 hover:bg-slate-200 hover:text-slate-800 transition:all duration-100";

export default function NewCommentButton({
  className,
  onClick,
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={twMerge(baseClasses, className)} onClick={onClick}>
      Add Comment
      <FaPlus className="mr-1" />
    </button>
  );
}
