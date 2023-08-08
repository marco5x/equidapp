import { UserIncomes } from "./components/userincome/UserIncomes";
import { Consumption } from "./components/consumption/Consumption";
import { Header } from "./components/header/Header";
import arrow from "../src/assets/arrow.gif";
import { CounterLikes } from "./components/Counter/CounterLikes";

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col pl-3 md:pl-0 md:items-center sm:w-[96vw]">
      <h1 className="hidden">equidApp</h1>
      <Header />
      <Consumption />

      <img
        className="ml-9 animate-[wiggle_1s_ease-in-out_infinite] sm:hidden"
        src={arrow}
        alt="derecha"
        width={45}
      />
      <UserIncomes />
      <div className="flex flex-col justify-center items-center">
        <CounterLikes />
        <footer className="fixed bottom-3 text-sm font-semibold text-white text-center md:text-xl">
          <h2>VIVAMOS EN UN MUNDO MAS EQUITATIVO!! ⚖</h2>
        </footer>
      </div>
    </div>
  );
};
