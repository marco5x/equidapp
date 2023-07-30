import { useState } from "react";
import { useAppDispatch, useUserSelector } from "../../redux/hooks";
import { editUser } from "../../redux/features/user/userSlice";

export const FormEditUser = ({ id, edit, set }) => {
  const users = useUserSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const userEdit = users.find((user) => user.id === id);

  const [income, setIncome] = useState({
    name: userEdit.name,
    incomes: userEdit.incomes,
    incomeDollar: userEdit.incomeDollar,
  });

  const handleChange = (event) => {
    setIncome({
      ...income,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    dispatch(editUser({ id, ...income }));
    set(!edit);
  };

  return (
    <form onSubmit={handleEdit}>
      <label
        htmlFor="expense"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={income.name}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </label>
      <label
        htmlFor="incomes"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        <input
          type="number"
          name="incomes"
          onChange={handleChange}
          value={income.incomes}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </label>
      <label
        htmlFor="price"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        <input
          type="number"
          name="incomeDollar"
          onChange={handleChange}
          value={income.incomeDollar}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </label>
      <button
        type="submit"
        className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900"
      >
        Guardar
      </button>
    </form>
  );
};
