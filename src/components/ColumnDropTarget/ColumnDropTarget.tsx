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
  "w-0 bg-white opacity-25 rounded-md transition-[width] shrink-0";

interface ColumnDropTargetProps extends React.HTMLAttributes<HTMLDivElement> {
  columnPosition: number;
}

export default function ColumnDropTarget({
  columnPosition,
}: ColumnDropTargetProps) {
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
          type: ActionType.REORDER_COLUMNS,
          columnSourceIndex: source.data.position as number,
          columnDestinationIndex: columnPosition,
        });
      }
    }

    if (element) {
      return dropTargetForElements({
        element,
        onDragEnter: () => setIsDraggedOver(true),
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: ({ source }) => handleDrop(source),
      });
    }
  }, [columnPosition, dispatch]);

  useEffect(() => {
    return monitorForElements({
      onDragStart: ({ source }) => {
        if (source.data.type === "column") setIsActive(true);
      },
      onDrop: () => setIsActive(false),
    });
  }, []);

  return (
    <div
      className={twMerge(
        baseClasses,
        isActive && "w-4",
        isDraggedOver && "opacity-50"
      )}
      ref={ref}
    />
  );
}
