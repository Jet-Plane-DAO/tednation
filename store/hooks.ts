import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { mutatedConfig } from "./features/mutateds/mutatedSlice";

// use throughout your app instead of useDispatch and useSelector

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useMutated = () => {
    const mutated = useAppSelector(mutatedConfig);
    return { ...mutated };
};
