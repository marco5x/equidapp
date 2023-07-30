import { UserIncomes } from "./components/userincome/UserIncomes";
import { Consumption } from "./components/consumption/Consumption";
import { Header } from "./components/header/Header";

export const App = () => {
  return (
    <div className="w-full h-full bg-slate-600 bg-scroll flex flex-col justify-center items-center">
      <h1 className="hidden">equidApp</h1>
      <Header />
      <Consumption />
      <UserIncomes />
      <footer className="fixed bottom-1">
        VIVAMOS EN UN MUNDO MAS EQUITATIVO!! ⚖
      </footer>
    </div>
  );
};
