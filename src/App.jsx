import { Calulator } from "./components/calculator/Calculator";
import { Consumption } from "./components/consumption/Consumption";
import { Header } from "./components/header/Header";

export const App = () => {
  return (
    <div className="w-full h-full bg-slate-600 bg-scroll flex flex-col justify-center items-center">
      <h1 className="hidden">equidApp</h1>
      <Header />
      <Consumption />
      <Calulator />
      <footer className="fixed bottom-1">
        Vivamos en un mundo mas equitativo ⚖
      </footer>
    </div>
  );
};
