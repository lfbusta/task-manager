import type { Card } from "../../types";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  card: Card;
}

const baseClasses = "bg-white p-2 rounded shadow hover:shadow-md transition";

export default function Card({ className, card }: CardProps) {
  return (
    <div className={twMerge(baseClasses, className)}>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <button>Edit Card</button>
      <button>Remove Card</button>
    </div>
  );
}
