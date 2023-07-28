import { useState } from "react";
import { useStore } from "../../hooks/useStore";

export const FormEditUser = ({ ids }) => {
  const { state, editUser } = useStore();

  const [income, setIncome] = useState({
    name: "",
    incomes: "",
    incomeDollar: "",
  });

  const handleEdit = (event) => {
    event.preventDefault();
    editUser({ id: ids, ...income });
    setIncome(state.users);
  };

  const handleChange = (event) => {
    setIncome({
      ...income,
      [event.target.name]: event.target.value,
    });
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
          value={income?.name}
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
          value={income?.incomes}
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
          value={income?.incomeDollar}
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
