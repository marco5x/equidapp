import { useStore } from "../../hooks/useStore";

export const Calulator = () => {
  const { state } = useStore();

  const tot = Object.entries(state).reduce((acc, val) => acc + val[1].price, 0);

  return (
    <div className="">
      <section>
        <p>{tot}</p>
        <table className="w-9/12 text-sm text-left text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                $ T. Cambio
              </th>
              <th scope="col" className=" px-6 py-3">
                Ingresos
              </th>
              <th scope="col" className="uppercase px-6 py-3">
                % Considerado
              </th>
              <th scope="col" className="uppercase px-6 py-3">
                $ Considerado
              </th>
              <th scope="col" className="uppercase px-6 py-3">
                u$s Total
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
                    onClick={""}
                    type="button"
                    className="text-white bg-gradient-to-br from-green-300 to-sky-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-600 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                  >
                    Editar
                  </button>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={""}
                    type="button"
                    className="uppercase text-white bg-gradient-to-br from-pink-400 to-orange-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-700 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                  >
                    x
                  </button>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={""}
                    type="button"
                    className="uppercase text-white bg-gradient-to-br from-pink-400 to-orange-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-700 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                  >
                    x
                  </button>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={""}
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
              <td className=" font-bold text-lg px-0 py-1"></td>
              <td className=" font-bold text-lg px-0 py-1"></td>
              <td className=" font-bold text-lg px-0 py-1">{`$ ${tot}`}</td>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  );
};
