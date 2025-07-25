import { ActionType } from "../../types";
import { useContext } from "react";
import { CardsDispatchContext } from "../../contexts/cardsContext";
import { FaPlus } from "react-icons/fa6";

export default function NewColumnButton() {
  const dispatch = useContext(CardsDispatchContext);

  function handleClickAddColumnButton() {
    if (dispatch) {
      dispatch({
        type: ActionType.ADD_COLUMN,
        title: "New Column",
      });
    }
  }

  return (
    <button
      className="cursor-pointer bg-slate-100/50 rounded-md text-left border-slate-200 w-64 shadow-sm text-sm font-semibold p-2 flex items-center hover:bg-slate-100"
      onClick={handleClickAddColumnButton}
    >
      <FaPlus className="mr-2" /> Add Column
    </button>
  );
}
