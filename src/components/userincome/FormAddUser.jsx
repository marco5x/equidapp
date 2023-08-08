import { useAppDispatch, useUserSelector } from "../../redux/hooks";
import { addUser } from "../../redux/features/user/userSlice";

export const FormUsers = ({ form, set }) => {
  const users = useUserSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const forms = event.target;
    const formData = new FormData(forms);
    const id = crypto.randomUUID();
    const name = formData.get("name");
    let incomes = parseInt(formData.get("income"));
    let incomeDollar = parseInt(formData.get("dollar"));
    const userFound = users.map((us) => us.name === name);

    if (isNaN(incomes) && isNaN(incomeDollar) && !name)
      return alert("Debe ingresar al menos un campo");
    if (isNaN(incomes)) incomes = 0;
    if (isNaN(incomeDollar)) incomeDollar = 0;
    if (userFound[0] === true) {
      alert("Ya existe el usuario. Prueba con otro 😏");
    } else {
      dispatch(addUser({ id, name, incomes, incomeDollar }));
    }
    forms.reset();
    set(!form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        type="text"
        name="name"
        placeholder="Usuario de ✕ (Twitter) sin @"
      />
      <input
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        type="number"
        name="income"
        placeholder="99000 (pesos)"
      />
      <input
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        type="number"
        name="dollar"
        placeholder="500 (dolar)"
      />
      <button
        className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900"
        type="submit"
      >
        💾
      </button>
    </form>
  );
};
