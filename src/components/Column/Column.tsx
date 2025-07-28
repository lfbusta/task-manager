import Card from "../Card";
import ColumnTitle from "./ColumnTitle";
import NewCardButton from "../NewCardButton/NewCardButton";
import { ActionType } from "../../types";
import { useContext, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { CardsDispatchContext } from "../../contexts/cardsContext";
import { useState, Fragment } from "react";
import { FaRegTrashCan, FaGripLinesVertical } from "react-icons/fa6";
import type { Column } from "../../types";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import CardDropTarget from "../CardDropTarget";

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  column: Column;
  position: number;
  onClickCard: ({
    columnId,
    cardId,
  }: {
    columnId: string;
    cardId: string | null;
  }) => void;
}

const baseClasses =
  "flex flex-col gap-2 bg-slate-100 rounded-xl p-2 border-slate-200 shadow-sm w-64 h-fit";

export default function Column({
  className,
  column,
  onClickCard,
  position,
}: ColumnProps) {
  const dispatch = useContext(CardsDispatchContext);
  const [columnTitle, setColumnTitle] = useState("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const ref = useRef(null);

  // Make the column draggable.
  useEffect(() => {
    const element = ref.current;
    if (element) {
      return draggable({
        element: element,
        getInitialData: () => ({ type: "column", position }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      });
    }
  }, [position]);

  // NOTE: Technically unnecessary. I could set the default value from props in useState, but his is more reliable as the application grows.
  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  function handleBlurTitleInput() {
    if (dispatch) {
      dispatch({
        type: ActionType.EDIT_COLUMN,
        columnId: column.id,
        title: columnTitle,
      });
    }
  }

  function handleKeydownTitleInput(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  }

  function handleTitleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setColumnTitle(event.target.value);
  }

  function handleClickDeleteButton() {
    if (dispatch) {
      dispatch({
        type: ActionType.REMOVE_COLUMN,
        columnId: column.id,
      });
    }
  }

  function handleClickCard(event: React.MouseEvent<HTMLButtonElement>) {
    const cardId = event.currentTarget.getAttribute("data-card-id");
    onClickCard({ columnId: column.id, cardId });
  }

  return (
    <div
      className={twMerge(baseClasses, className, isDragging && "opacity-70")}
      ref={ref}
    >
      <div className="flex align-middle items-center">
        <FaGripLinesVertical className="text-slate-400 cursor-all-scroll" />
        <ColumnTitle
          value={columnTitle}
          onBlur={handleBlurTitleInput}
          onKeyDown={handleKeydownTitleInput}
          onChange={handleTitleInputChange}
          className="flex-1"
        />
        <button
          className="flex items-center justify-center text-slate-500 hover:text-red-500 font-semibold cursor-pointer rounded-lg hover:bg-slate-200 h-8 w-8 mr-1 transition-all duration-100"
          title="Delete Column"
          onClick={handleClickDeleteButton}
        >
          <FaRegTrashCan />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <CardDropTarget columnPosition={position} cardPosition={0} />
        {column.cards.map((card, index) => (
          <Fragment key={`card-${card.id}`}>
            <Card
              card={card}
              onClick={handleClickCard}
              position={index}
              columnPosition={position}
            />
            <CardDropTarget
              columnPosition={position}
              cardPosition={index + 1}
            />
          </Fragment>
        ))}
        <NewCardButton columnId={column.id} className="mt-1" />
      </div>
    </div>
  );
}
