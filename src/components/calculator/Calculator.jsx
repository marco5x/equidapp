import { useEffect, useState } from "react";
import { useStore } from "../../hooks/useStore";
import axios from "axios";

export const Calulator = () => {
  const { state, addUser, editUser, deleteUser } = useStore();
  const [ids, setIds] = useState(null);
  const [dolar, setDolar] = useState("oficial");
  const [valueDolar, setValueDolar] = useState("oficial");

  const [income, setIncome] = useState({
    name: "",
    incomes: "",
    incomeDollar: "",
  });

  const incomesTotals = Object.entries(state.users).reduce(
    (acc, val) => acc + val[1].incomes,
    0
  );

  const tot = Object.entries(state.consumptions).reduce(
    (acc, val) => acc + val[1].price,
    0
  );

  const dollars = async () => {
    const { data } = await axios.get(
      "https://dolar-api-argentina.vercel.app/v1/dolares/"
    );
    return await data;
  };

  const dollar = (tipo) => {
    if (tipo === "oficial") {
      return dolar[0].compra;
    } else if (tipo === "mep") {
      return dolar[2].compra;
    } else if (tipo === "blue") {
      return dolar[1].compra;
    }
  };

  useEffect(() => {
    dollars().then((dolar) => setDolar(dolar));
  }, []);
  //console.log(dolar[2].compra);
  //console.log(dollar(valueDolar));

  const handleSubmit = (event) => {
    event.preventDefault();
    const forms = event.target;
    const formData = new FormData(forms);
    const id = crypto.randomUUID();
    const name = formData.get("name");
    const incomes = parseInt(formData.get("income"));
    const incomeDollar = parseInt(formData.get("dollar"));
    const userFound = Object.entries(state.users).map(
      (us) => us[1].name === name
    );
    if (userFound[0] === true) {
      alert("Ya existe el usuario. Prueba con otro 😏");
    } else {
      addUser({ id, name, incomes, incomeDollar });
    }
    forms.reset();
  };

  const handleDollar = (event) => {
    event.preventDefault();
    setValueDolar({
      ...valueDolar,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    editUser({ id: ids, ...income });
    setIncome(state.users);
    setIds(null);
  };
  /** <div class="relative overflow-x-auto shadow-md sm:rounded-lg"> clase para ser responsive */

  return (
    <div className="relative overflow-x-auto shadow-md">
      <section>
        <p>{tot}</p>
        <table className="w-9/12 text-sm text-left text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3">
                <select
                  className=" rounded-sm bg-blue-600 "
                  name="valueDolar"
                  onChange={handleDollar}
                >
                  <option>T. CAMBIO</option>
                  <option value="oficial">OFICIAL 🟢</option>
                  <option value="mep">MEP 🟣</option>
                  <option value="blue">BLUE 🔵</option>
                </select>
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
              <th scope="col" className=" px-6 py-3">
                Editar
              </th>
              <th scope="col" className="uppercase px-6 py-3">
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
                  className="px-6 py-3 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  <img
                    className="rounded-full"
                    src={`https://unavatar.io/github/${user.name}`}
                    alt=""
                    width={45}
                  />
                </td>
                {/* Ver tipo de cambio con select */}
                <td className="px-6 py-3">
                  {(user.incomeDollar
                    ? user.incomeDollar
                    : 0 * dollar(valueDolar?.valueDolar)
                  ).toFixed(2)}
                </td>
                <td className="px-6 py-3">
                  <td className="px-6 py-3">{user.incomes}</td>
                </td>
                <td className="px-6 py-3">
                  <td className="px-6 py-3">
                    {Math.round((user.incomes / incomesTotals) * 100)}
                  </td>
                </td>
                <td className="px-6 py-3">
                  <td className="px-6 py-3 text-lg">
                    <strong>
                      {Math.round(
                        (tot * ((user.incomes / incomesTotals) * 100)) / 100
                      )}
                    </strong>
                  </td>
                </td>
                {/* u$s total ver select para dolares */}
                <td className="px-6 py-3">
                  {(
                    (tot * ((user.incomes / incomesTotals) * 100)) /
                    100 /
                    500
                  ).toFixed(2)}
                </td>
                <td className="px-6 py-3">
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
                <td className="px-6 py-3">
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
        {/** FORMULARIO */}
        <form onSubmit={handleSubmit}>
          <input
            className="w-auto rounded-sm"
            type="text"
            name="name"
            placeholder="Usuario de github"
          />
          <input
            className="w-auto rounded-sm"
            type="number"
            name="income"
            placeholder="90000"
          />
          <input
            className="w-auto rounded-sm"
            type="number"
            name="dollar"
            placeholder="500 (dollar)"
          />
          <button type="submit">💾</button>
        </form>
      </section>
    </div>
  );
};
