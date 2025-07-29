import reducer from '../state/reducer';
import { ActionType } from '../types';
import type {Action, State} from '../types'

describe('reducer', () => {
  let initialState: State;

  beforeEach(() => {
    initialState = {
      columns: [
        {
          id: 'col-1',
          title: 'Column 1',
          cards: [
            {
              id: 'card-1',
              title: 'Card 1',
              description: '',
              comments: [
                { id: 'comment-1', text: 'First comment' },
                { id: 'comment-2', text: 'Second comment' },
              ],
            },
            {
              id: 'card-2',
              title: 'Card 2',
              description: '',
              comments: [],
            },
          ],
        },
        {
          id: 'col-2',
          title: 'Column 2',
          cards: [
            { id: 'card-3', title: 'Card 3', description: '', comments: [] },
          ],
        },
      ],
    };
  });


  it('should add a column', () => {
    const action: Action = { type: ActionType.ADD_COLUMN, title: 'New Column' };
    const state = reducer(initialState, action);
    expect(state.columns.length).toBe(initialState.columns.length + 1);
    expect(state.columns[state.columns.length - 1].title).toBe('New Column');
    expect(state.columns[state.columns.length - 1].cards).toEqual([]);
  });

  it('should remove a column', () => {
    const action: Action = { type: ActionType.REMOVE_COLUMN, columnId: 'col-1' };
    const state = reducer(initialState, action);
    expect(state.columns.length).toBe(initialState.columns.length - 1);
    expect(state.columns.find(c => c.id === 'col-1')).toBeUndefined();
  });

  it('should edit a column title', () => {
    const action: Action = { type: ActionType.EDIT_COLUMN, columnId: 'col-1', title: 'Updated Title' };
    const state = reducer(initialState, action);
    expect(state.columns.find(c => c.id === 'col-1')?.title).toBe('Updated Title');
  });

  it('should add a card to a column', () => {
    const action: Action = { type: ActionType.ADD_CARD, columnId: 'col-1', title: 'New Card' };
    const state = reducer(initialState, action);
    const col = state.columns.find(c => c.id === 'col-1');
    expect(col?.cards.length).toBe(initialState.columns.find(c => c.id === 'col-1')!.cards.length + 1);
    expect(col?.cards[col.cards.length - 1].title).toBe('New Card');
  });

  it('should remove a card from a column', () => {
    const action: Action = { type: ActionType.REMOVE_CARD, columnId: 'col-1', cardId: 'card-1' };
    const state = reducer(initialState, action);
    const col = state.columns.find(c => c.id === 'col-1');
    expect(col?.cards.find(c => c.id === 'card-1')).toBeUndefined();
  });

  it('should edit a card', () => {
    const action: Action = {
      type: ActionType.EDIT_CARD,
      columnId: 'col-1',
      cardId: 'card-1',
      title: 'Updated Card',
      description: 'Updated description',
      comments: [],
    };
    const state = reducer(initialState, action);
    const card = state.columns.find(c => c.id === 'col-1')?.cards.find(c => c.id === 'card-1');
    expect(card?.title).toBe('Updated Card');
    expect(card?.description).toBe('Updated description');
  });

  it('should add a comment to a card', () => {
    const action: Action = {
      type: ActionType.ADD_COMMENT,
      columnId: 'col-1',
      cardId: 'card-1',
      text: 'New comment',
    };
    const state = reducer(initialState, action);
    const card = state.columns[0].cards.find(c => c.id === 'card-1');
    expect(card?.comments.length).toBe(3);
    expect(card?.comments[0].text).toBe('New comment'); // new comment is added at front
  });

  it('should remove a comment from a card', () => {
    const action: Action = {
      type: ActionType.REMOVE_COMMENT,
      columnId: 'col-1',
      cardId: 'card-1',
      commentId: 'comment-1',
    };
    const state = reducer(initialState, action);
    const card = state.columns[0].cards.find(c => c.id === 'card-1');
    expect(card?.comments.find(c => c.id === 'comment-1')).toBeUndefined();
    expect(card?.comments.length).toBe(1);
  });

  it('should edit a comment text', () => {
    const action: Action = {
      type: ActionType.EDIT_COMMENT,
      columnId: 'col-1',
      cardId: 'card-1',
      commentId: 'comment-2',
      text: 'Updated comment text',
    };
    const state = reducer(initialState, action);
    const comment = state.columns[0].cards.find(c => c.id === 'card-1')?.comments.find(c => c.id === 'comment-2');
    expect(comment?.text).toBe('Updated comment text');
  });

  it('should reorder columns', () => {
    const action: Action = {
      type: ActionType.REORDER_COLUMNS,
      columnSourceIndex: 0,
      columnDestinationIndex: 2,
    };
    const state = reducer(initialState, action);
    expect(state.columns[0].id).toBe('col-2');
    expect(state.columns[1].id).toBe('col-1');
  });

  it('should reorder cards within same column', () => {
    const action: Action = {
      type: ActionType.REORDER_CARDS,
      columnSourceIndex: 0,
      columnDestinationIndex: 0,
      cardSourceIndex: 0,
      cardDestinationIndex: 2,
    };
    const state = reducer(initialState, action);
    const cards = state.columns[0].cards;
    expect(cards[0].id).toBe('card-2');
    expect(cards[1].id).toBe('card-1');
  });

  it('should reorder cards between columns', () => {
    const action: Action = {
      type: ActionType.REORDER_CARDS,
      columnSourceIndex: 0,
      columnDestinationIndex: 1,
      cardSourceIndex: 0,
      cardDestinationIndex: 1,
    };
    const state = reducer(initialState, action);
    expect(state.columns[0].cards.length).toBe(1);
    expect(state.columns[1].cards.length).toBe(2);
    expect(state.columns[1].cards[1].id).toBe('card-1');
  });
});
