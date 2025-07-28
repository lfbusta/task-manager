import { type State, type Action, ActionType } from "../types";

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.ADD_COLUMN: {
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
    }
    case ActionType.REMOVE_COLUMN: {
      return {
        ...state,
        columns: state.columns.filter((col) => col.id !== action.columnId),
      };
    }
    case ActionType.EDIT_COLUMN: {
      return {
        ...state,
        columns: state.columns.map((col) =>
          col.id === action.columnId ? { ...col, title: action.title } : col
        ),
      };
    }
    case ActionType.ADD_CARD: {
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
                    description: "",
                    comments: [],
                  },
                ],
              }
            : col
        ),
      };
    }
    case ActionType.REMOVE_CARD: {
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
    }
    case ActionType.EDIT_CARD: {
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
                        comments: action.comments,
                      }
                    : card
                ),
              }
            : col
        ),
      };
    }
    case ActionType.ADD_COMMENT: {
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
                        comments: [
                          {
                            id: crypto.randomUUID(),
                            text: action.text,
                          },
                          ...card.comments,
                        ],
                      }
                    : card
                ),
              }
            : col
        ),
      };
    }
    case ActionType.REMOVE_COMMENT: {
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
                        comments: card.comments.filter(
                          (comment) => comment.id !== action.commentId
                        ),
                      }
                    : card
                ),
              }
            : col
        ),
      };
    }
    case ActionType.EDIT_COMMENT: {
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
                        comments: card.comments.map((comment) =>
                          comment.id === action.commentId
                            ? { ...comment, text: action.text }
                            : comment
                        ),
                      }
                    : card
                ),
              }
            : col
        ),
      };
    }
    case ActionType.REORDER_COLUMNS: {
      const { columnSourceIndex, columnDestinationIndex } = action;
      const columnsCopy = [...state.columns];
      const [columnToMove] = columnsCopy.splice(columnSourceIndex, 1);
      columnsCopy.splice(
        columnSourceIndex < columnDestinationIndex ? columnDestinationIndex-1 : columnDestinationIndex,
        0,
        columnToMove
      );
      return {
        ...state,
        columns: columnsCopy,
      };
    }
    case ActionType.REORDER_CARDS: {
      const { columnSourceIndex, columnDestinationIndex, cardSourceIndex, cardDestinationIndex } = action
      
      const sourceColumn = state.columns[columnSourceIndex]
      const sourceColumnCards = [...sourceColumn.cards]
      const [cardToMove] = sourceColumnCards.splice(cardSourceIndex, 1)

      if(columnSourceIndex === columnDestinationIndex) {
        const destinationColumnCards = sourceColumnCards
        destinationColumnCards.splice(cardSourceIndex < cardDestinationIndex ? cardDestinationIndex-1 : cardDestinationIndex, 0, cardToMove)
  
        const destinationColumn = {...sourceColumn, cards: destinationColumnCards}
        const destinationColumns = state.columns.map((col, index) => {
          if(index === columnDestinationIndex) {
            return destinationColumn
          } else {
            return col
          }
        });
        
        return {
          ...state,
          columns: destinationColumns
        }
      } else {
        const destinationColumn = state.columns[columnDestinationIndex]
        const destinationColumnCards = [...destinationColumn.cards]
        destinationColumnCards.splice(cardDestinationIndex, 0, cardToMove)
        
        const newSourceColumn = {...sourceColumn, cards: sourceColumnCards}
        const newDestinationColumn = {...destinationColumn, cards: destinationColumnCards}

        const outputColumns = state.columns.map((col,index) => {
          if(index === columnSourceIndex) {
            return newSourceColumn
          } else if(index === columnDestinationIndex) {
            return newDestinationColumn
          } else {
            return col
          }
        })

        return {
          ...state,
          columns: outputColumns
        }
      }
    }
    default:
      return state;
  }
}
