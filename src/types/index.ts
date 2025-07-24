export interface Card {
    id: string;
    title: string;
    description: string;
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
  }

  export type Action =
    | { type: ActionType.ADD_COLUMN; title: string }
    | { type: ActionType.REMOVE_COLUMN; columnId: string }
    | { type: ActionType.EDIT_COLUMN; columnId: string; title: string }
    | {
        type: ActionType.ADD_CARD;
        columnId: string;
        title: string;
        description: string;
      }
    | { type: ActionType.REMOVE_CARD; columnId: string; cardId: string }
    | {
        type: ActionType.EDIT_CARD;
        columnId: string;
        cardId: string;
        title: string;
        description: string;
      };
