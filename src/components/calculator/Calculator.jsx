import { useEffect, useState } from "react";
import { useStore } from "../../hooks/useStore";
import { FormUsers } from "./FormAddUser";
import { FormEditUser } from "./FormEditUser";

export const Calulator = () => {
  const { state, deleteUser } = useStore();
  const [ids, setIds] = useState(null);
  const [form, setForm] = useState(false);
  const [dolar, setDolar] = useState("");
  const [valueDolar, setValueDolar] = useState(undefined);

  const dollars = async () => {
    const { data } = await fetch(
      "https://dolar-api-argentina.vercel.app/v1/dolares/"
    );
    return await data;
  };

  const dollar = (tipo) => {
    if (tipo === "oficial") return dolar[0].compra;
    else if (tipo === "mep") return dolar[2].compra;
    else if (tipo === "blue") return dolar[1].compra;
    else if (tipo === undefined) return 500;
  };

  const tot = Object.entries(state?.consumptions).reduce(
    (acc, val) => acc + val[1].price,
    0
  );

  const incomesTotals = Object.entries(state?.users).reduce(
    (acc, val) => acc + val[1].incomes,
    0
  );
  const dollarsTotals =
    Object.entries(state?.users).reduce(
      (acc, val) => acc + val[1].incomeDollar,
      0
    ) * dollar(valueDolar?.valueDolar);
  const totals = incomesTotals + dollarsTotals;

  useEffect(() => {
    dollars().then((dolar) => setDolar(dolar));
  }, []);

  const handleDollar = (event) => {
    event.preventDefault();
    setValueDolar({
      ...valueDolar,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="relative overflow-y-auto shadow-sm ">
      <section>
        <p>{tot}</p>
        <table className="w-9/12 text-sm text-left text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-3 py-3">
                Usuario
              </th>
              <th scope="col" className="px-3 py-3">
                <p>{dollar(valueDolar?.valueDolar)} (Compra)</p>
                <select
                  className=" rounded-sm bg-blue-600 "
                  name="valueDolar"
                  onChange={handleDollar}
                >
                  <option value="oficial">💵 OFICIAL 🟢</option>
                  <option value="mep">💰 MEP 🟣</option>
                  <option value="blue">💸 BLUE 🔵</option>
                </select>
              </th>
              <th scope="col" className="px-3 py-3">
                Ingresos
              </th>
              <th scope="col" className="uppercase px-3 py-3">
                % Considerado
              </th>
              <th scope="col" className="uppercase px-3 py-3">
                $ Considerado
              </th>
              <th scope="col" className="uppercase px-3 py-3">
                u$s Total
              </th>
              <th scope="col" className="px-3 py-3">
                Editar
              </th>
              <th scope="col" className="uppercase px-3 py-3">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {/**  ** BODY ** */}
            {state.users.map((user) => (
              <tr
                key={user.id}
                className="bg-blue-500 border-b border-blue-400"
              >
                <td
                  scope="row"
                  className="px-3 py-3 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  <img
                    className="rounded-full"
                    src={`https://unavatar.io/github/${user.name}`}
                    alt=""
                    width={45}
                  />
                </td>
                <td className="px-3 py-3">
                  {(user.incomeDollar * dollar(valueDolar?.valueDolar)).toFixed(
                    2
                  )}
                </td>
                <td className="px-3 py-3">
                  <td className="px-6 py-3">
                    {(
                      user.incomes +
                      user.incomeDollar * dollar(valueDolar?.valueDolar)
                    ).toFixed(2)}
                  </td>
                </td>
                <td className="px-3 py-3">
                  <td className="px-3 py-3">
                    {Math.round(
                      ((user.incomes +
                        user.incomeDollar * dollar(valueDolar?.valueDolar)) /
                        totals) *
                        100
                    )}
                  </td>
                </td>
                <td className="px-3 py-3">
                  <td className="px-3 py-3 text-lg">
                    <strong>
                      {Math.round(
                        (tot *
                          (((user.incomes +
                            user.incomeDollar *
                              dollar(valueDolar?.valueDolar)) /
                            totals) *
                            100)) /
                          100
                      )}
                    </strong>
                  </td>
                </td>
                <td className="px-3 py-3">
                  {(
                    (tot *
                      (((user.incomes +
                        user.incomeDollar * dollar(valueDolar?.valueDolar)) /
                        totals) *
                        100)) /
                    100 /
                    dollar(valueDolar?.valueDolar)
                  ).toFixed(2)}
                </td>
                <td className="px-3 py-3">
                  <button
                    onClick={() => {
                      setIds(user.id);
                    }}
                    type="button"
                    className="text-white bg-gradient-to-br from-green-300 to-sky-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-600 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                  >
                    Editar
                  </button>
                </td>
                <td className="px-3 py-3">
                  <button
                    onClick={() => {
                      deleteUser(user.id);
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
              <td className=" font-bold text-lg px-0 py-1"></td>
              <td className=" font-bold text-lg px-0 py-1"></td>
              <td className=" font-bold text-lg px-0 py-1"></td>
              <td className=" font-bold text-lg px-0 py-1"></td>
              <td className=" font-bold text-lg px-0 py-1">{`$ ${tot}`}</td>
            </tr>
          </tfoot>
        </table>
        {form && !ids ? <FormUsers /> : null}
        {ids ? <FormEditUser ids={ids} /> : null}
        {/* BOTON PARA AGREGAR O EDITAR CONSUMOS */}
        <button
          type="button"
          onClick={() => setForm(!form)}
          className=" right-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-normal rounded-[50%] text-2xl p px-2 pb-1 text-center m-1"
        >
          {form ? "×" : "+"}
        </button>
      </section>
    </div>
  );
};
