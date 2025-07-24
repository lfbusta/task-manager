import { createContext } from "react";
import type { State, Action } from "../types"; // Adjust the import path as needed

export const CardsContext = createContext<State | null>(null);
export const CardsDispatchContext = createContext<React.ActionDispatch<
  [action: Action]
> | null>(null);
