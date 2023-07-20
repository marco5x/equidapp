import { useEffect } from "react";
import { useStore } from "../../hooks/useStore";

export const Calulator = () => {
  const { state } = useStore();

  function getState() {
    return state;
  }
  const total = Object.entries(state).reduce(
    (acc, val) => acc + val[1].price,
    0
  );
  console.log(total);
  console.log(getState());

  useEffect(() => {
    getState();
  }, [state]);

  console.log(getState());

  return (
    <div className="">
      <section>
        <div className="w-96 h-[90px] bg-sky-700 rounded-2xl">Calculadora</div>
        <p>{total}</p>
      </section>
    </div>
  );
};
