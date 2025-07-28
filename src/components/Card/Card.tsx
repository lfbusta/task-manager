import type { Card } from "../../types";
import { useEffect, useState, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { FaAlignRight, FaComments, FaGripLinesVertical } from "react-icons/fa6";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

interface CardProps extends React.HTMLAttributes<HTMLButtonElement> {
  card: Card;
  position: number;
  columnPosition: number;
}

const baseClasses =
  "flex items-center bg-white p-2 pl-0 rounded-lg shadow hover:shadow-md border-2 border-white hover:border-blue-500 transition-all transition-duration-100 min-h-8 cursor-pointer";

export default function Card({
  className,
  card,
  onClick,
  position,
  columnPosition,
}: CardProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const ref = useRef(null);

  // Make the card draggable.
  useEffect(() => {
    const element = ref.current;
    if (element) {
      return draggable({
        element: element,
        getInitialData: () => ({
          type: "card",
          cardPosition: position,
          columnPosition,
        }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      });
    }
  }, [position, columnPosition]);

  return (
    <button
      className={twMerge(baseClasses, isDragging && "opacity-70", className)}
      onClick={onClick}
      data-card-id={card.id}
      ref={ref}
    >
      <FaGripLinesVertical className="text-slate-400 cursor-all-scroll mr-1" />
      <h3 className="text-xs text-slate-600 flex-1 text-left font-semibold placeholder:text-slate-400">
        {card.title}
      </h3>
      <div className="flex gap-2">
        {card.comments.length > 0 && (
          <FaComments className="text-slate-300 text-xs" />
        )}
        {card.description && (
          <FaAlignRight className="text-slate-300 text-xs" />
        )}
      </div>
    </button>
  );
}
