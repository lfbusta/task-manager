import Column from "../components/Column";
import NewColumnButton from "../components/NewColumnButton";
import TaskModal from "../components/TaskModal";
import { useContext, useState } from "react";
import { CardsContext } from "../contexts/cardsContext";

export default function Home() {
  const state = useContext(CardsContext);
  const [selectedCard, setSelectedCard] = useState<{
    columnId: string | null;
    cardId: string | null;
  }>({ columnId: null, cardId: null });

  function handleCardClick({
    columnId,
    cardId,
  }: {
    columnId: string;
    cardId: string | null;
  }) {
    setSelectedCard({ columnId, cardId });
  }

  function handleCloseModal() {
    setSelectedCard({ columnId: null, cardId: null });
  }

  return (
    <div className="board p-2">
      {selectedCard.columnId && selectedCard.cardId && (
        <TaskModal
          columnId={selectedCard.columnId}
          cardId={selectedCard.cardId}
          onClose={handleCloseModal}
          className="transition-transform duration-300 ease-in-out transform translate-y-0"
        />
      )}
      <h1 className="text-2xl font-bold text-slate-100 mt-1 mb-4">
        Task Manager
      </h1>
      <div className="flex gap-2">
        {state?.columns.map((column) => (
          <Column
            key={column.id}
            className="column"
            column={column}
            onClickCard={handleCardClick}
          />
        ))}
        <div className="flex flex-col">
          <NewColumnButton />
        </div>
      </div>
    </div>
  );
}
