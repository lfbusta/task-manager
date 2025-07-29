import { useContext, useEffect, useRef, useState } from "react";
import { CardsDispatchContext } from "../../contexts/cardsContext";
import { ActionType } from "../../types";
import { twMerge } from "tailwind-merge";
import {
  monitorForElements,
  dropTargetForElements,
  type ElementDragPayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const baseClasses =
  "h-0 bg-black opacity-25 rounded-md transition-[height] shrink-0";

interface CardDropTargetProps extends React.HTMLAttributes<HTMLDivElement> {
  columnPosition: number;
  cardPosition: number;
}

export default function CardDropTarget({
  columnPosition,
  cardPosition,
}: CardDropTargetProps) {
  const ref = useRef(null);
  const dispatch = useContext(CardsDispatchContext);
  const [isActive, setIsActive] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const element = ref.current;

    function handleDrop(source: ElementDragPayload) {
      setIsDraggedOver(false);
      if (dispatch) {
        dispatch({
          type: ActionType.REORDER_CARDS,
          columnSourceIndex: source.data.columnPosition as number,
          columnDestinationIndex: columnPosition,
          cardSourceIndex: source.data.cardPosition as number,
          cardDestinationIndex: cardPosition,
        });
      }
    }

    if (element) {
      return dropTargetForElements({
        element: element,
        onDragEnter: () => setIsDraggedOver(true),
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: ({ source }) => handleDrop(source),
      });
    }
  }, [columnPosition, cardPosition, dispatch]);

  useEffect(() => {
    return monitorForElements({
      onDragStart: ({ source }) => {
        if (source.data.type == "card") setIsActive(true);
      },
      onDrop: () => setIsActive(false),
    });
  }, []);

  return (
    <div
      className={twMerge(
        baseClasses,
        isActive && "h-4",
        isDraggedOver && "opacity-10"
      )}
      ref={ref}
    />
  );
}
