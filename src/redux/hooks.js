import { useSelector, useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch();
export const useUserSelector = useSelector;
export const useConsumptionSelector = useSelector;
