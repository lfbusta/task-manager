import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import { type State } from "./types";
import { useReducer, useEffect } from "react";
import { CardsContext, CardsDispatchContext } from "./contexts/cardsContext";
import { baseState } from "./state/baseState";
import reducer from "./state/reducer";

function App() {
  // Load initial state from localStorage or use baseState.
  const initialState: State =
    JSON.parse(localStorage.getItem("board") || "null") || baseState;
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save state to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(state));
  }, [state]);

  return (
    <CardsContext value={state}>
      <CardsDispatchContext value={dispatch}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </CardsDispatchContext>
    </CardsContext>
  );
}

export default App;
