import Column from "../components/Column";
import { useContext } from "react";
import { CardsContext } from "../contexts/cardsContext";
import NewColumnButton from "../components/NewColumnButton";

export default function Home() {
  const state = useContext(CardsContext);

  return (
    <div className="bg-red-100 p-2">
      <h1>Task Manager</h1>
      <div className="flex gap-2">
        {state?.columns.map((column) => (
          <Column key={column.id} className="column" column={column} />
        ))}
        <div className="flex flex-col">
          <NewColumnButton />
        </div>
      </div>
    </div>
  );
}
