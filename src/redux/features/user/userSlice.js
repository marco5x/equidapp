import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "marco5x",
    incomes: 60000,
    incomeDollar: 10,
  },
];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, name, incomes, incomeDollar } = action.payload;
      const foundUser = state.find((user) => user.id === id);
      if (foundUser) {
        foundUser.name = name;
        foundUser.incomes = incomes;
        foundUser.incomeDollar = incomeDollar;
      } else {
        return state;
      }
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      const newState = state.filter((user) => user.id !== id);
      return newState;
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
