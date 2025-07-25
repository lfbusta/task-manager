import type { Card } from "../../types";
import { twMerge } from "tailwind-merge";
import { FaAlignRight } from "react-icons/fa6";

interface CardProps extends React.HTMLAttributes<HTMLButtonElement> {
  card: Card;
}

const baseClasses =
  "flex items-center justify-between bg-white p-2 rounded-lg shadow hover:shadow-md border-2 border-white hover:border-blue-500 transition-all transition-duration-100 min-h-8 cursor-pointer";

export default function Card({ className, card, onClick }: CardProps) {
  return (
    <button
      className={twMerge(baseClasses, className)}
      onClick={onClick}
      data-card-id={card.id}
    >
      <h3 className="text-xs text-slate-600 font-semibold placeholder:text-slate-400">
        {card.title}
      </h3>
      {card.description && (
        <FaAlignRight className="text-slate-300 text-xs" title="" />
      )}
    </button>
  );
}
