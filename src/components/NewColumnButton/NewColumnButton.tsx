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
      className="flex items-center justify-between cursor-pointer bg-slate-100/50 rounded-md text-left w-64 shadow-sm text-sm font-semibold p-2 hover:bg-slate-100 text-white hover:text-slate-800 transition-all duration-100"
      onClick={handleClickAddColumnButton}
    >
      Add Column
      <FaPlus className="flex align-middle justify-center mr-2" />
    </button>
  );
}
