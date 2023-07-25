import { useReducer } from "react";

const initialState = {
  consumptions: [
    { id: "1", expense: "Apple MacBook Pro 17", price: 1000 },
    { id: "2", expense: "Microsoft Surface Pro", price: 1250 },
  ],
  users: [
    {
      name: "marco5x",
      incomes: 30000,
    },
  ],
};

const reducer = (state, action) => {
  // lógica del estado dentro del reducer
  // porque lo evitamos en los componentes
  const { type } = action;

  if (type === "ADD_CONSUMTION") {
    return { ...state, consumptions: [...state.consumptions, action.payload] };
  } else if (type === "EDIT_CONSUMTION") {
    const { id, expense, price } = action.payload;
    const foundConsumption = state.consumptions.find(
      (consumption) => consumption.id === id
    );
    if (foundConsumption) {
      foundConsumption.expense = expense;
      foundConsumption.price = parseInt(price);
    }
  } else if (type === "DELETE_CONSUMTION") {
    const id = action.payload;
    return {
      ...state,
      consumptions: [
        ...state.consumptions.filter((consumption) => consumption.id !== id),
      ],
    };
  }
  if (type === "ADD_USER") {
    return { ...state, users: [...state.users, action.payload] };
  } else if (type === "EDIT_USER") {
    const { id, name, income } = action.payload;
    const foundUser = state.users.find((user) => user.id === id);
    if (foundUser) {
      foundUser.name = name;
      foundUser.income = income;
    }
  } else if (type === "DELETE_USER") {
    const id = action.payload;
    return {
      ...state,
      users: [...state.users.filter((user) => user.id !== id)],
    };
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

  const addUser = (payload) => {
    dispatch({ type: "ADD_USER", payload });
  };

  const editUser = (payload) => {
    dispatch({ type: "EDIT_USER", payload });
  };

  const deleteUser = (payload) => {
    dispatch({ type: "DELETE_USER", payload });
  };

  return {
    state,
    addConsumption,
    editConsumption,
    deleteConsumption,
    addUser,
    editUser,
    deleteUser,
  };
};
