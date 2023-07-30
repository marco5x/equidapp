import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", expense: "Apple MacBook Pro 17", price: 1000 },
  { id: "2", expense: "Microsoft Surface Pro", price: 1250 },
];

export const consumptionSlice = createSlice({
  name: "consumption",
  initialState,
  reducers: {
    addConsumption: (state, action) => {
      state.push(action.payload);
    },
    editConsumption: (state, action) => {
      const { id, expense, price } = action.payload;
      const foundConsumption = state.find(
        (consumption) => consumption.id === id
      );
      if (foundConsumption) {
        foundConsumption.expense = expense;
        foundConsumption.price = parseInt(price);
      } else {
        return state;
      }
    },
    deleteConsumption: (state, action) => {
      const id = action.payload;
      const newState = state.filter((consumption) => consumption.id !== id);
      return newState;
    },
  },
});

export const { addConsumption, editConsumption, deleteConsumption } =
  consumptionSlice.actions;

export default consumptionSlice.reducer;
