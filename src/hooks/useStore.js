import { useReducer } from "react";

const initialState = [
  { id: "1", expense: "Apple MacBook Pro 17", price: 1000 },
  { id: "2", expense: "Microsoft Surface Pro", price: 1250 },
];

const reducer = (state, action) => {
  // lógica del estado dentro del reducer
  // porque lo evitamos en los componentes
  const { type } = action;

  if (type === "ADD_CONSUMTION") {
    return [...state, action.payload];
  } else if (type === "EDIT_CONSUMTION") {
    const { id, expense, price } = action.payload;
    const foundConsumption = state.find((consumption) => consumption.id === id);
    if (foundConsumption) {
      foundConsumption.expense = expense;
      foundConsumption.price = parseInt(price);
    }
  } else if (type === "DELETE_CONSUMTION") {
    const id = action.payload;
    return [...state.filter((consumption) => consumption.id !== id)];
  }
  return state;
};

export const useStore = () => {
  // 3. usar el hook useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  const addConsumption = (payload) => {
    dispatch({ type: "ADD_CONSUMTION", payload });
  };

  const editConsumption = (payload) => {
    dispatch({ type: "EDIT_CONSUMTION", payload });
  };

  const deleteConsumption = (payload) => {
    dispatch({ type: "DELETE_CONSUMTION", payload });
  };

  return {
    state,
    addConsumption,
    editConsumption,
    deleteConsumption,
  };
};
