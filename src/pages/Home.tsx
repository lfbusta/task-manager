import { ActionType } from "../types";
import Column from "../components/Column";
import { useContext } from "react";
import { CardsContext, CardsDispatchContext } from "../contexts/cardsContext";

export default function Home() {
  const state = useContext(CardsContext);
  const dispatch = useContext(CardsDispatchContext);

  return (
    <div className="bg-red-100 p-2">
      <h1>Task Manager</h1>
      <div className="flex gap-2">
        {state?.columns.map((column) => (
          <Column key={column.id} className="column" column={column} />
        ))}
        <div className="flex flex-col gap-2 bg-slate-100/50 rounded-sm p-2 border-1 border-slate-200 shadow-sm w-64">
          <button
            className="cursor-pointer"
            onClick={() =>
              dispatch &&
              dispatch({
                type: ActionType.ADD_COLUMN,
                title: " New Column",
              })
            }
          >
            + Add Column
          </button>
        </div>
      </div>
    </div>
  );
}
