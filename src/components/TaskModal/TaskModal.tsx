import TaskModalTitle from "./TaskModalTitle";
import TaskModalDescription from "./TaskModalDescription";
import TaskModalComment from "./TaskModalComment";
import NewCommentButton from "./NewCommentButton";
import {
  FaAlignLeft,
  FaXmark,
  FaRegTrashCan,
  FaRegComments,
} from "react-icons/fa6";
import { useContext, useEffect, useState, useRef } from "react";
import {
  CardsContext,
  CardsDispatchContext,
} from "../../contexts/cardsContext";
import { ActionType } from "../../types";

interface TaskModalProps extends React.HTMLAttributes<HTMLDivElement> {
  columnId: string;
  cardId: string;
  onClose: () => void;
}

export default function TaskModal({
  columnId,
  cardId,
  onClose,
}: TaskModalProps) {
  const state = useContext(CardsContext);
  const dispatch = useContext(CardsDispatchContext);
  const column = state?.columns.find((col) => col.id === columnId);
  const card = column?.cards.find((c) => c.id === cardId);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardComments, setCardComments] = useState(card?.comments || []);
  const [isNewCommentVisible, setIsNewCommentVisible] = useState(false);
  const newCommentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (card) {
      setCardTitle(card.title);
      setCardDescription(card.description);
      setCardComments(card.comments);
    }
  }, [card]);

  // NOTE: This effect is to focus the new comment textarea when it becomes visible.
  useEffect(() => {
    if (newCommentRef.current && isNewCommentVisible) {
      newCommentRef.current.focus();
    }
  }, [isNewCommentVisible]);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCardTitle(event.target.value);
  }

  function handleTitleBlur() {
    if (cardTitle && columnId && cardId && dispatch) {
      dispatch({
        type: ActionType.EDIT_CARD,
        columnId: columnId,
        cardId,
        title: cardTitle,
        description: cardDescription,
        comments: cardComments,
      });
    }
  }

  function handleTitleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleTitleBlur();
      (event.target as HTMLInputElement).blur();
    }
  }

  function handleDescriptionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setCardDescription(event.target.value);
  }

  function handleDescriptionBlur() {
    if (cardTitle && columnId && cardId && dispatch) {
      dispatch({
        type: ActionType.EDIT_CARD,
        columnId: columnId,
        cardId,
        title: cardTitle,
        description: cardDescription,
        comments: cardComments,
      });
    }
  }

  function handleDescriptionKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.key === "Enter") {
      handleDescriptionBlur();
      (event.target as HTMLTextAreaElement).blur();
    }
  }

  function handleClickDeleteCardButton() {
    if (dispatch) {
      dispatch({
        type: ActionType.REMOVE_CARD,
        columnId: columnId,
        cardId: cardId,
      });
      onClose();
    }
  }

  function handleClickNewCommentButton() {
    setIsNewCommentVisible(true);
  }

  function handleSaveComment() {
    setIsNewCommentVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-slate-950/50"
      onClick={onClose}
      style={{
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div
        className="flex flex-col flex-1 bg-white rounded-lg max-w-128"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b-2 border-slate-200 p-2 pr-4">
          <TaskModalTitle
            value={cardTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="flex-1"
          />
          <button
            onClick={onClose}
            className="cursor-pointer text-slate-500  font-semibold rounded-lg hover:bg-slate-200 h-8 w-8 flex items-center justify-center transition-all duration-100"
          >
            <FaXmark />
          </button>
        </div>
        <div className="flex flex-col p-4">
          <h4 className="flex items-center text-sm font-semibold mb-2">
            <FaAlignLeft />
            <span className="ml-2">Description</span>
          </h4>
          <TaskModalDescription
            value={cardDescription}
            onChange={handleDescriptionChange}
            onBlur={handleDescriptionBlur}
            onKeyDown={handleDescriptionKeyDown}
            className="ml-5 mb-4"
          />
          <h4 className="flex items-center text-sm font-semibold mb-2">
            <FaRegComments />
            <span className="ml-2">Comments</span>
          </h4>
          <div className="flex flex-col gap-2 pl-4">
            {!isNewCommentVisible && (
              <NewCommentButton onClick={handleClickNewCommentButton} />
            )}
            {isNewCommentVisible && (
              <TaskModalComment
                columnId={columnId}
                cardId={cardId}
                text=""
                onSaveComment={handleSaveComment}
                ref={newCommentRef}
              />
            )}
            {cardComments.map((comment) => (
              <TaskModalComment
                columnId={columnId}
                cardId={cardId}
                commentId={comment.id}
                text={comment.text}
                key={`comment-${comment.id}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end border-t-2 border-slate-200 p-2">
          <button
            onClick={handleClickDeleteCardButton}
            className="flex items-center justify-center text-slate-500 hover:text-red-500 font-semibold cursor-pointer rounded-lg hover:bg-slate-200 h-8 w-8 mr-1 transition-all duration-100"
            title="Delete Task"
          >
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
}
