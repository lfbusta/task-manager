import Column from "../components/Column";
import NewColumnButton from "../components/NewColumnButton";
import TaskModal from "../components/TaskModal";
import ColumnDropTarget from "../components/ColumnDropTarget";
import { useContext, useState, Fragment } from "react";
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
        <ColumnDropTarget columnPosition={0} />
        {state?.columns.map((column, index) => (
          <Fragment key={column.id}>
            <Column
              className="column"
              column={column}
              onClickCard={handleCardClick}
              position={index}
            />
            <ColumnDropTarget columnPosition={index + 1} />
          </Fragment>
        ))}
        <div className="flex flex-col">
          <NewColumnButton />
        </div>
      </div>
    </div>
  );
}
