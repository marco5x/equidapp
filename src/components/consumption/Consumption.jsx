import { useState } from "react";
import { useAppDispatch, useConsumptionSelector } from "../../redux/hooks";
import { deleteConsumption } from "../../redux/features/consumption/consumptionSlice";
import { FormAddConsumption } from "./FormAddConsumption";
import { FormEditConsumption } from "./FormEditConsumption";

export const Consumption = () => {
  const consumption = useConsumptionSelector((state) => state.consumption);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ids, setIds] = useState(null);

  const total = consumption.reduce((acc, val) => acc + val.price, 0);

  return (
    <div className="flex flex-col py-1 md:py-6 sm:overflow-y-hidden">
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg ">
        <table className="w-9/12 text-sm text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Consumos
              </th>
              <th scope="col" className="text-center px-6 py-3">
                $
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Editar
              </th>
              <th scope="col" className="text-center px-3 py-3">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {consumption?.map((value) => (
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
                      setEdit(true);
                    }}
                    type="button"
                    className="text-white bg-gradient-to-br from-green-300 to-sky-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-600 font-medium rounded-lg text-sm px-2 py-1.5 text-center mr-2 mb-2"
                  >
                    Editar
                  </button>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => {
                      dispatch(deleteConsumption(value.id));
                    }}
                    type="button"
                    className=" text-white bg-gradient-to-br from-pink-400 to-orange-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-700 font-medium rounded-lg text-2xl px-2 text-center mr-2 mb-2"
                  >
                    ×
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
        {/* FORMULARIO DE CONSUMOS */}
        {form && !ids ? <FormAddConsumption form={form} set={setForm} /> : null}
        {/* FORMULARIO EDITAR CONSUMOS */}
        {edit && ids ? (
          <FormEditConsumption id={ids} edit={edit} set={setEdit} />
        ) : null}
        {/* BOTON PARA AGREGAR O EDITAR CONSUMOS */}
        <button
          type="button"
          onClick={() => setForm(!form)}
          className=" right-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-normal rounded-[50%] text-2xl p px-2 pb-1 text-center m-1"
        >
          {form ? "×" : "+"}
        </button>
      </div>
    </div>
  );
};
