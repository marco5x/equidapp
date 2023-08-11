import { useState } from "react";
import { useAppDispatch, useConsumptionSelector } from "../../redux/hooks";
import { editConsumption } from "../../redux/features/consumption/consumptionSlice";

export const FormEditConsumption = ({ id, edit, set }) => {
  const consumption = useConsumptionSelector((state) => state.consumption);
  const dispatch = useAppDispatch();
  const editConsumptions = consumption.find((cons) => cons.id === id);

  const [consumptions, setConsumptions] = useState({
    expense: editConsumptions.expense,
    price: editConsumptions.price,
  });

  const handleChange = (event) => {
    setConsumptions({
      ...consumptions,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    dispatch(editConsumption({ id, ...consumptions }));
    setConsumptions(consumption);
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
          name="expense"
          minLength={3}
          maxLength={45}
          onChange={handleChange}
          value={consumptions?.expense}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </label>
      <label
        htmlFor="price"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        <input
          type="number"
          name="price"
          min={0}
          onChange={handleChange}
          value={consumptions?.price}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
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
