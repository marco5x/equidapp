import { useState } from "react";
import {
  useAppDispatch,
  useUserSelector,
  useConsumptionSelector,
} from "../../redux/hooks";
import {
  useGetDolarOficialQuery,
  useGetDolarMepQuery,
  useGetDolarBlueQuery,
} from "../../redux/api/dolarApi";
import { deleteUser } from "../../redux/features/user/userSlice";
import { FormUsers } from "./FormAddUser";
import { FormEditUser } from "./FormEditUser";

export const UserIncomes = () => {
  const consumption = useConsumptionSelector((state) => state.consumption);
  const users = useUserSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [ids, setIds] = useState(0);
  const [form, setForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [valueDolar, setValueDolar] = useState(undefined);

  const { data: oficial, error: err } = useGetDolarOficialQuery();
  const { data: mep, error } = useGetDolarMepQuery();
  const { data: blue, error: errors } = useGetDolarBlueQuery();
  const dolarOficial = oficial?.compra;
  const dolarMep = mep?.compra;
  const dolarBlue = blue?.compra;

  const dollar = (tipo) => {
    if (tipo === "oficial") return dolarOficial;
    else if (tipo === "mep") return dolarMep;
    else if (tipo === "blue") return dolarBlue;
    else if (tipo === undefined) return dolarOficial;
  };

  const tot = consumption.reduce((acc, val) => acc + val.price, 0);

  const incomesTotals = users.reduce((acc, val) => acc + val.incomes, 0);
  const dollarsTotals =
    users.reduce((acc, val) => acc + val.incomeDollar, 0) *
    dollar(valueDolar?.valueDolar);
  const totals = incomesTotals + dollarsTotals;

  const handleDollar = (event) => {
    event.preventDefault();
    setValueDolar({
      ...valueDolar,
      [event.target.name]: event.target.value,
    });
  };
  if (err || error || errors) return "Error en datos de dolar";

  return (
    <div className="relative overflow-y-auto shadow-sm ">
      <section>
        <table className="w-9/12 text-sm text-left text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-3 py-3">
                Usuario
              </th>
              <th scope="col" className="px-3 py-3">
                <p>{dollar(valueDolar?.valueDolar)} (Compra)</p>
                <select
                  className=" rounded-sm bg-blue-400 "
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
            {users.map((user) => (
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
                      setEdit(true);
                    }}
                    type="button"
                    className="text-white bg-gradient-to-br from-green-300 to-sky-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-600 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                  >
                    EDITAR
                  </button>
                </td>
                <td className="px-3 py-3">
                  <button
                    onClick={() => {
                      dispatch(deleteUser(user.id));
                    }}
                    type="button"
                    className=" text-white bg-gradient-to-br from-pink-400 to-orange-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-700 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-500 border-b border-blue-400">
              <td className=" px-6 py-4 font-bold text-blue-50 whitespace-nowrap dark:text-blue-100">
                TOTAL
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
        {form && !ids ? <FormUsers form={form} set={setForm} /> : null}
        {ids && edit ? (
          <FormEditUser id={ids} edit={edit} set={setEdit} />
        ) : null}
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
