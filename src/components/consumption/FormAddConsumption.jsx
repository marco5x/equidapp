import { useAppDispatch } from "../../redux/hooks";
import { addConsumption } from "../../redux/features/consumption/consumptionSlice";

export const FormAddConsumption = ({ form, set }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const forms = event.target;
    const formData = new FormData(forms);
    const expense = formData.get("expense");
    const price = parseInt(formData.get("price"));
    const id = crypto.randomUUID();
    dispatch(addConsumption({ id, expense, price }));
    forms.reset();
    set(!form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="expense"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        <input
          type="text"
          name="expense"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="alquiler departamento.."
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
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="80000"
          required
        />
      </label>
      <button
        type="submit"
        className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900"
      >
        Agregar
      </button>
    </form>
  );
};
