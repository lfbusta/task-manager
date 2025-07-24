import { type State, type Action, ActionType } from "../types";

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.ADD_COLUMN:
      return {
        ...state,
        columns: [
          ...state.columns,
          {
            id: crypto.randomUUID(),
            title: action.title,
            cards: [],
          },
        ],
      };
    case ActionType.REMOVE_COLUMN:
      return {
        ...state,
        columns: state.columns.filter((col) => col.id !== action.columnId),
      };
    case ActionType.EDIT_COLUMN:
      return {
        ...state,
        columns: state.columns.map((col) =>
          col.id === action.columnId ? { ...col, title: action.title } : col
        ),
      };
    case ActionType.ADD_CARD:
      return {
        ...state,
        columns: state.columns.map((col) =>
          col.id === action.columnId
            ? {
                ...col,
                cards: [
                  ...col.cards,
                  {
                    id: crypto.randomUUID(),
                    title: action.title,
                    description: action.description,
                  },
                ],
              }
            : col
        ),
      };
    case ActionType.REMOVE_CARD:
      return {
        ...state,
        columns: state.columns.map((col) =>
          col.id === action.columnId
            ? {
                ...col,
                cards: col.cards.filter((card) => card.id !== action.cardId),
              }
            : col
        ),
      };
    case ActionType.EDIT_CARD:
      return {
        ...state,
        columns: state.columns.map((col) =>
          col.id === action.columnId
            ? {
                ...col,
                cards: col.cards.map((card) =>
                  card.id === action.cardId
                    ? {
                        ...card,
                        title: action.title,
                        description: action.description,
                      }
                    : card
                ),
              }
            : col
        ),
      };
    default:
      return state;
  }
}