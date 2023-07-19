import { total } from "../consumption/Consumption";

export const Calulator = () => {
  return (
    <div className="">
      <section>
        <div className="w-96 h-[90px] bg-sky-700 rounded-2xl">Calculadora</div>
        <p>{total}</p>
      </section>
    </div>
  );
};
