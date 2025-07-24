import Card from "../Card";
import type { Column } from "../../types";
import { twMerge } from "tailwind-merge";

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  column: Column;
}

const baseClasses =
  "flex flex-col gap-2 bg-slate-100 rounded-sm p-2 border-1 border-slate-200 shadow-sm w-64";

export default function Column({ className, column }: ColumnProps) {
  return (
    <div className={twMerge(baseClasses, className)}>
      <h2>{column.title}</h2>
      <div className="flex flex-col gap-2">
        {column.cards.map((card) => (
          <Card key={`card-${card.id}`} card={card} />
        ))}
      </div>
    </div>
  );
}
