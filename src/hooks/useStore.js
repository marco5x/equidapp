import { useReducer } from "react";

// 1. Create a initialState
const initialState = {
  consumption: [
    { id: "1", expense: "Apple MacBook Pro 17", price: 1000 },
    { id: "2", expense: "Microsoft Surface Pro", price: 1250 },
  ],
  consumptionEqual: [],
};

// 2. Create a reducer
const reducer = (state, action) => {
  // lógica del estado dentro del reducer
  // porque lo evitamos en los componentes
  const { type } = action;

  if (type === "ADD_CONSUMTION") {
    return {
      ...state,
      consumption: [...initialState.consumption, action.payload],
    };
  }

  if (type === "EDIT_CONSUMTION") {
    console.log(action.payload);

    return initialState.consumption.map((cons) => {
      if (cons.id === action.payload.id) {
        return action.payload;
      } else {
        return cons;
      }
    });
  }
  if (type === "DELETE_CONSUMTION") {
    const id = action.payload;

    return {
      ...state,
      consumption: [
        ...initialState.consumption.filter(
          (consumption) => consumption.id !== id
        ),
      ],
    };
  }

  if (type === "SET_FROM_TEXT") {
    const loading = action.payload !== "";

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
};

export const useStore = () => {
  // 3. usar el hook useReducer
  const [{ consumption, consumptionEqual }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
    consumption,
    consumptionEqual,
    addConsumption,
    editConsumption,
    deleteConsumption,
  };
};
