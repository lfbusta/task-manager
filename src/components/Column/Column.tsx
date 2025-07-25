import Card from "../Card";
import { ActionType } from "../../types";
import type { Column } from "../../types";
import { useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { CardsDispatchContext } from "../../contexts/cardsContext";
import { useState } from "react";
import ColumnTitle from "./ColumnTitle";
import { FaRegTrashCan } from "react-icons/fa6";

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  column: Column;
}

const baseClasses =
  "flex flex-col gap-2 bg-slate-100 rounded-lg p-2 border-slate-200 shadow-sm w-64";

export default function Column({ className, column }: ColumnProps) {
  const dispatch = useContext(CardsDispatchContext);
  const [columnTitle, setColumnTitle] = useState("");

  // NOTE: Technically unnecessary. I could set the default value from props in useState, but his is more reliable as the application grows.
  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  function handleBlurTitleForm() {
    if (dispatch) {
      dispatch({
        type: ActionType.EDIT_COLUMN,
        columnId: column.id,
        title: columnTitle,
      });
    }
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
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

  return (
    <div className={twMerge(baseClasses, className)}>
      <div className="flex align-middle">
        <ColumnTitle
          value={columnTitle}
          onBlur={handleBlurTitleForm}
          onChange={handleTitleChange}
          className="flex-1"
        />
        <button
          className="flex items-center justify-center text-slate-500 hover:text-red-500 font-semibold cursor-pointer rounded-lg hover:bg-slate-200 h-8 w-8 mr-1"
          title="Delete Column"
          onClick={handleClickDeleteButton}
        >
          <FaRegTrashCan />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {column.cards.map((card) => (
          <Card key={`card-${card.id}`} card={card} />
        ))}
      </div>
    </div>
  );
}
