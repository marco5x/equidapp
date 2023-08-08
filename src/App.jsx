import { UserIncomes } from "./components/userincome/UserIncomes";
import { Consumption } from "./components/consumption/Consumption";
import { Header } from "./components/header/Header";

export const App = () => {
  return (
    <div className="w-full h-[100dvh] bg-slate-600 bg-cover flex flex-col pl-3 md:ml-0 md:place-items-center sm:w-screen">
      <h1 className="hidden">equidApp</h1>
      <Header />
      <Consumption />
      <UserIncomes />
      <footer className="fixed bottom-1 text-sm font-semibold text-white text-center md:text-xl">
        <h2>VIVAMOS EN UN MUNDO MAS EQUITATIVO!! ⚖</h2>
      </footer>
    </div>
  );
};
