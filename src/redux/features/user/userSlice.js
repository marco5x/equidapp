import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
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
      state.concat(action.payload);
    },
  },
  editUser: (state, action) => {
    const { id, name, income, incomeDollar } = action.payload;
    const foundUser = state.users.find((user) => user.id === id);
    foundUser.name = name;
    foundUser.income = income;
    foundUser.incomeDollar = incomeDollar;
  },
  deleteUser: (state, action) => {
    const id = action.payload;
    return { ...state.filter((user) => user.id !== id) };
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
