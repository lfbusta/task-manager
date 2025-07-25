import { twMerge } from "tailwind-merge";
import { useContext, useEffect, useState } from "react";
import { ActionType } from "../../types";
import { CardsDispatchContext } from "../../contexts/cardsContext";
import { FaComment } from "react-icons/fa6";

const baseClasses =
  "flex gap-1 items-center text-sm border-1 border-white rounded-md focus:bg-white focus:cursor-text text-slate-800 placeholder:text-slate-400 p-1";

const buttonsClasses =
  "text-xs cursor-pointer font-semibold text-sky-600 underline";

interface TaskModalCommentProps
  extends React.HTMLAttributes<HTMLTextAreaElement> {
  columnId: string;
  cardId: string;
  commentId?: string;
  text: string;
  onSaveComment?: () => void;
  ref?: React.RefObject<HTMLTextAreaElement | null>;
}

export default function TaskModalComment({
  className,
  columnId,
  cardId,
  commentId,
  text,
  onSaveComment,
  ref,
}: TaskModalCommentProps) {
  const dispatch = useContext(CardsDispatchContext);
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(text);
  }, [text]);

  function handleChangeComment(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  function handleBlurComment() {
    if (dispatch && value) {
      if (commentId) {
        dispatch({
          type: ActionType.EDIT_COMMENT,
          columnId,
          cardId,
          commentId,
          text: value,
        });
      } else {
        dispatch({
          type: ActionType.ADD_COMMENT,
          columnId,
          cardId,
          text: value,
        });
      }
    }
    setIsEditing(false);
    if (onSaveComment) onSaveComment();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  }

  function handleClickEdit() {
    setIsEditing(true);
  }

  function handleClickDelete() {
    if (dispatch && commentId) {
      dispatch({
        type: ActionType.REMOVE_COMMENT,
        columnId,
        cardId,
        commentId,
      });
    }
  }

  return commentId && !isEditing ? (
    <div className="flex-col gap-1">
      <div className={twMerge(baseClasses, className)}>
        <FaComment className="text-slate-400" /> {value}
      </div>
      <div className={twMerge(baseClasses, "gap-2", className)}>
        <button className={buttonsClasses} onClick={handleClickEdit}>
          Edit
        </button>
        <button className={buttonsClasses} onClick={handleClickDelete}>
          Delete
        </button>
      </div>
    </div>
  ) : (
    <textarea
      className={twMerge(baseClasses, className)}
      value={value}
      onBlur={handleBlurComment}
      onChange={handleChangeComment}
      onKeyDown={handleKeyDown}
      ref={ref}
    />
  );
}
