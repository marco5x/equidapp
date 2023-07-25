import { useState } from "react";
import { useStore } from "../../hooks/useStore";

export const Calulator = () => {
  const { state } = useStore();
  const tot = Object.entries(state).reduce((acc, val) => acc + val[1].price, 0);
  const [name, setName] = useState("");
  const [income, setIncome] = useState(70);
  const incomes = income * 3;
  const part = Math.round((income / incomes) * 100);

  const handleSubmit = (event) => {
    event.preventDefault();
    const forms = event.target;
    const formData = new FormData(forms);
    const user = formData.get("name");
    setName(user);
    forms.reset();
  };

  return (
    <div className="">
      <section>
        <p>{tot}</p>
        <table className="w-9/12 text-sm text-left text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Usuario
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
            <tr className="bg-blue-500 border-b border-blue-400">
              <td
                scope="row"
                className="px-6 py-3 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                {!name ? (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Usuario de github"
                    />
                    <button type="submit">💾</button>
                  </form>
                ) : (
                  <img
                    className="rounded-full"
                    src={`https://unavatar.io/github/${name}`}
                    alt=""
                    width={45}
                  />
                )}
              </td>
              <td className="px-6 py-3">{500}</td>
              <td className="px-6 py-3">
                <td className="px-6 py-3">{income}</td>
              </td>
              <td className="px-6 py-3">
                {/* { % considerado} */}
                <td className="px-6 py-3">{part}</td>
              </td>
              <td className="px-6 py-3">
                {/* $ considerado */}
                <td className="px-6 py-3 text-lg">
                  <strong> {(incomes * part) / 100}</strong>
                </td>
              </td>
              {/* u$s total */}
              <td className="px-6 py-3">{6546}</td>
            </tr>
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
