import { ActionType } from "../../types";
import { useContext } from "react";
import { CardsDispatchContext } from "../../contexts/cardsContext";
import { FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

const baseClasses =
  "flex items-center justify-between cursor-pointer bg-slate-100/50 rounded-md text-left text-xs text-slate-500 font-semibold p-2 hover:bg-slate-200 hover:text-slate-800 transition:all duration-100";

interface NewCardButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  columnId: string;
}

export default function NewCardButton({
  columnId,
  className,
}: NewCardButtonProps) {
  const dispatch = useContext(CardsDispatchContext);

  function handleClickAddColumnButton() {
    if (dispatch) {
      dispatch({
        type: ActionType.ADD_CARD,
        title: "New Card",
        columnId: columnId,
      });
    }
  }

  return (
    <button
      className={twMerge(baseClasses, className)}
      onClick={handleClickAddColumnButton}
    >
      Add Card
      <FaPlus className="mr-1" />
    </button>
  );
}
