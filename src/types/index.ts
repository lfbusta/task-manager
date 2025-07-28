export interface Comment {
  id: string;
  text: string;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  comments: Comment[];
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export interface State {
  columns: Column[];
};

export enum ActionType {
  ADD_COLUMN = "ADD_COLUMN",
  REMOVE_COLUMN = "REMOVE_COLUMN",
  EDIT_COLUMN = "EDIT_COLUMN",
  ADD_CARD = "ADD_CARD",
  REMOVE_CARD = "REMOVE_CARD",
  EDIT_CARD = "EDIT_CARD",
  ADD_COMMENT = "ADD_COMMENT",
  REMOVE_COMMENT = "REMOVE_COMMENT",
  EDIT_COMMENT = "EDIT_COMMENT",
  REORDER_COLUMNS = "REORDER_COLUMNS",
  REORDER_CARDS = "REORDER_CARDS",
}

export type Action =
  | { type: ActionType.ADD_COLUMN; title: string }
  | { type: ActionType.REMOVE_COLUMN; columnId: string }
  | { type: ActionType.EDIT_COLUMN; columnId: string; title: string }
  | { type: ActionType.ADD_CARD; columnId: string; title: string }
  | { type: ActionType.REMOVE_CARD; columnId: string; cardId: string }
  | {
      type: ActionType.EDIT_CARD;
      columnId: string;
      cardId: string;
      title: string;
      description: string;
      comments: Comment[];
    }
  | { type: ActionType.ADD_COMMENT; columnId: string; cardId: string; text: string }
  | { type: ActionType.REMOVE_COMMENT; columnId: string; cardId: string; commentId: string }
  | { type: ActionType.EDIT_COMMENT; columnId: string; cardId: string; commentId: string; text: string }
  | { type: ActionType.REORDER_COLUMNS; columnSourceIndex: number; columnDestinationIndex: number }
  | { type: ActionType.REORDER_CARDS; columnSourceIndex: number; columnDestinationIndex: number; cardSourceIndex: number; cardDestinationIndex: number };