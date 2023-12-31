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
  const [valueDolar, setValueDolar] = useState("");

  const { data: oficial, error: err } = useGetDolarOficialQuery();
  const { data: mep, error } = useGetDolarMepQuery();
  const { data: blue, error: errors } = useGetDolarBlueQuery();

  const dollar = (tipo) => {
    if (!tipo || tipo === "") return 1;
    else if (tipo === "oficial") return oficial?.compra;
    else if (tipo === "mep") return mep?.compra;
    else if (tipo === "blue") return blue?.compra;
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

  const parseCurrency = (value) => {
    return value.toLocalString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  // if (err || error || errors) return "Error en datos del dólar";

  return (
    <div className="relative overflow-y-auto shadow-sm md:overflow-x-hidden">
      <table className="max-w-[80%] text-sm text-left text-blue-100 rounded-lg">
        <thead className="text-xs text-white uppercase bg-blue-600 ">
          <tr>
            <th scope="col" className="rounded-tl-lg text-center px-1 py-3">
              Usuario
            </th>
            <th scope="col" className="px-1 py-3">
              <p>
                {valueDolar.valueDolar === "" ||
                valueDolar.valueDolar === undefined
                  ? ""
                  : dollar(valueDolar?.valueDolar)}{" "}
                (Compra)
              </p>
              <label>
                <select
                  className="rounded-sm bg-blue-400"
                  name="valueDolar"
                  onChange={handleDollar}
                >
                  <option value="">💵 DOLAR</option>
                  <option value="oficial">💵 OFICIAL 🟢</option>
                  <option value="mep">💰 MEP 🟣</option>
                  <option value="blue">💸 BLUE 🔵</option>
                </select>
              </label>
            </th>
            <th scope="col" className="text-center px-1 py-3">
              Ingresos
            </th>
            <th scope="col" className="text-center px-1 py-3">
              % Considerado
            </th>
            <th scope="col" className="text-center px-1 py-3">
              $ Considerado
            </th>
            <th scope="col" className="text-center px-1 py-3">
              u$s Total
            </th>
            <th scope="col" className="text-center px-1 py-3">
              Editar
            </th>
            <th scope="col" className="rounded-tr-lg text-center px-1 py-3">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody>
          {/**  ** BODY ** */}
          {users.map((user) => (
            <tr key={user.id} className="bg-blue-500 border-b border-blue-400">
              <td
                scope="row"
                className="flex justify-center px-1 py-3 font-medium text-white whitespace-nowrap"
              >
                <img
                  className="rounded-full"
                  src={`https://unavatar.io/twitter/${user.name}`}
                  alt="user"
                  width={45}
                />
              </td>
              <td className="text-center px-1 py-3">
                {(user.incomeDollar * dollar(valueDolar?.valueDolar)).toFixed(
                  2
                )}
              </td>
              <td className="text-center py-3">
                {(
                  user.incomes +
                  user.incomeDollar * dollar(valueDolar?.valueDolar)
                ).toFixed(2)}
              </td>
              <td className="text-center px-1 py-3">
                {Math.round(
                  ((user.incomes +
                    user.incomeDollar * dollar(valueDolar?.valueDolar)) /
                    totals) *
                    100
                )}{" "}
                %
              </td>
              <td className="text-center px-1 py-3 text-lg">
                <strong>
                  ${" "}
                  {Math.round(
                    (tot *
                      (((user.incomes +
                        user.incomeDollar * dollar(valueDolar?.valueDolar)) /
                        totals) *
                        100)) /
                      100
                  )}
                </strong>
              </td>
              <td className="text-center px-1 py-3">
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
              <td className="text-center px-1 py-3">
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
              <td className="text-center px-1 py-3">
                <button
                  onClick={() => {
                    dispatch(deleteUser(user.id));
                  }}
                  type="button"
                  className="text-white bg-gradient-to-br from-pink-400 to-orange-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-700 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-blue-500 border-b border-blue-400">
            <td className="rounded-bl-lg px-6 py-4 font-bold text-white whitespace-nowrap">
              TOTAL
            </td>
            <td className=" font-bold text-lg px-0 py-1"></td>
            <td className=" font-bold text-lg px-0 py-1"></td>
            <td className=" font-bold text-lg px-0 py-1"></td>
            <td className=" font-bold text-lg px-0 py-1"></td>
            <td className=" font-bold text-lg px-0 py-1"></td>
            <td className=" font-bold text-lg px-0 py-1"></td>
            <td className="rounded-br-lg font-bold text-lg px-0 py-1">{`$ ${tot}`}</td>
          </tr>
        </tfoot>
      </table>
      {form && !ids ? <FormUsers form={form} set={setForm} /> : null}
      {ids && edit ? <FormEditUser id={ids} edit={edit} set={setEdit} /> : null}
      {/* BOTON PARA AGREGAR O EDITAR CONSUMOS */}
      <button
        type="button"
        onClick={() => setForm(!form)}
        className="right-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-normal rounded-full text-2xl px-2 pb-1 text-center m-1 mb-10"
      >
        {form ? "×" : "+"}
      </button>
    </div>
  );
};
