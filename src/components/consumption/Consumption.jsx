import { useState, useEffect } from "react";
import { useStore } from "../../hooks/useStore";

export const Consumption = () => {
  const { state, addConsumption, editConsumption, deleteConsumption } =
    useStore();

  const [ids, setIds] = useState(null);
  const [form, setForm] = useState(false);
  const [consumptions, setConsumptions] = useState({
    expense: "",
    price: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const forms = event.target;
    const formData = new FormData(forms);

    const expense = formData.get("expense");
    const price = parseInt(formData.get("price"));

    const id = crypto.randomUUID();
    addConsumption({ id, expense, price });
    forms.reset();
    setForm(false);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    editConsumption({ id: ids, ...consumptions });
    setConsumptions(state);
    setIds(null);
  };

  const handleChange = (event) => {
    setConsumptions({
      ...consumptions,
      [event.target.name]: event.target.value,
    });
  };

  const total = Object.entries(state).reduce(
    (acc, val) => acc + val[1].price,
    0
  );

  useEffect(() => {
    if (ids) {
      setConsumptions(state.find((cons) => cons.id === ids));
    }
  }, [ids, state]);

  return (
    <div className="flex flex-col ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-9/12 text-sm text-left text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Consumos
              </th>
              <th scope="col" className="px-6 py-3">
                $
              </th>
              <th scope="col" className=" px-6 py-3">
                Editar
              </th>
              <th scope="col" className="uppercase px-6 py-3">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {state.map((value) => (
              <tr
                key={value.id}
                className="bg-blue-500 border-b border-blue-400"
              >
                <th
                  scope="row"
                  className="px-6 py-3 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  {value.expense}
                </th>
                <td className="px-6 py-3">{value.price}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => {
                      setIds(value.id);
                      setForm(false);
                    }}
                    type="button"
                    className="text-white bg-gradient-to-br from-green-300 to-sky-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-600 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                  >
                    Editar
                  </button>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => {
                      deleteConsumption(value.id);
                    }}
                    type="button"
                    className="uppercase text-white bg-gradient-to-br from-pink-400 to-orange-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-700 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-500 border-b border-blue-400">
              <td className="uppercase px-6 py-4 font-bold text-blue-50 whitespace-nowrap dark:text-blue-100">
                total
              </td>
              <td className=" font-bold text-lg px-0 py-1"></td>
              <td className=" font-bold text-lg px-0 py-1"></td>
              <td className=" font-bold text-lg px-0 py-1">{`$ ${total}`}</td>
            </tr>
          </tfoot>
        </table>
        {form && !ids ? (
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
        ) : null}
        {!form && ids ? (
          <form onSubmit={handleEdit}>
            <label
              htmlFor="expense"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              <input
                type="text"
                name="expense"
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
        ) : null}
        <button
          type="button"
          onClick={() => setForm(true)}
          className=" right-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-[50%] text-2xl p px-2 pb-1 text-center m-1"
        >
          +
        </button>
      </div>
    </div>
  );
};
