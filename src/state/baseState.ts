import { type State } from "../types";

export const baseState: State = {
  columns: [
    {
      id: crypto.randomUUID(),
      title: "To Do",
      cards: [
        {
          id: crypto.randomUUID(),
          title: "First Task",
          description: "Description for first task",
        },
        {
          id: crypto.randomUUID(),
          title: "Second Task",
          description: "Description for second task",
        },
      ],
    },
    { id: crypto.randomUUID(), title: "In Progress", cards: [] },
    { id: crypto.randomUUID(), title: "Done", cards: [] },
  ],
};