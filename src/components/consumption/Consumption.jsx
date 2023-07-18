import { useState, useRef } from "react";
import { useStore } from "../../hooks/useStore";

export const Consumption = () => {
  const { consumption, addConsumption, editConsumption, deleteConsumption } =
    useStore();

  const [result, setResult] = useState(null);
  const [form, setForm] = useState(true);
  const [edit, setEdit] = useState(true);

  const id = useRef("");
  const expense = useRef("");
  const price = useRef("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const forms = event.target;
    const formData = new FormData(forms);

    const id = crypto.randomUUID();
    const expense = formData.get("expense");
    const price = parseInt(formData.get("price"));

    if (!consumption || !price) {
      // validaciones que tu quieras
      return setResult("Error, falta uno o mas campos");
    }
    addConsumption({ id, expense, price });
    setResult("ok");
    forms.reset();
    setForm(true);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const consumptions = {
      id: id.current.value,
      expense: expense.current.value,
      price: parseInt(price.current.value),
    };

    if (window.confirm("¿Esta seguro de que desea modificar este consumo?")) {
      editConsumption(consumptions);
    }
  };

  const total = Object.entries(consumption).reduce(
    (acc, val) => acc + val[1].price,
    0
  );

  return (
    <div className="flex flex-col bg-slata-200">
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
            {consumption.map((value) => (
              <tr
                key={value.id}
                className="bg-blue-500 border-b border-blue-400"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  {value.expense}
                </th>
                <td className="px-6 py-4">{value.price}</td>
                <td className="px-6 py-4">
                  <button
                    id="edit"
                    onClick={() => {
                      setEdit(!edit);
                      setForm(!form);
                    }}
                    type="button"
                    className="text-white bg-gradient-to-br from-green-300 to-sky-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-600 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                  >
                    Editar
                  </button>
                </td>
                <td className="px-6 py-4">
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
        {!form && edit ? (
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="expense"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              <input
                type="text"
                id="expense"
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
                id="price"
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

        {!form && !edit ? (
          <form onSubmit={(event) => handleEdit(event)}>
            {consumption.map((value) => (
              <div key={value.id}>
                <input
                  value={value.id}
                  ref={id}
                  className="hidden"
                  id="id"
                  name="id"
                  type="text"
                />
                <label
                  htmlFor="expense"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <input
                    value={value.expense}
                    ref={expense}
                    type="text"
                    id="expense"
                    name="expense"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="alquiler departamento.."
                  />
                </label>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <input
                    ref={price}
                    type="number"
                    id="price"
                    name="price"
                    value={value.price}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="80000"
                  />
                </label>
                <button
                  type="submit"
                  className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900"
                >
                  Guardar
                </button>
              </div>
            ))}
          </form>
        ) : null}
        <button
          type="button"
          onClick={() => setForm(false)}
          className=" right-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-[50%] text-2xl p px-2 pb-1 text-center m-1"
        >
          +
        </button>
      </div>
    </div>
  );
};
