import { Calulator } from "./components/calculator/calculator";
import { Consumption } from "./components/consumption/Consumption";
import { Header } from "./components/header/Header";

export const App = () => {
  return (
    <div className="w-full h-screen bg-slate-600 bg-cover flex flex-col justify-center items-center">
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