import { createContext, useContext } from "react";

type DateInputsContextType = {
  birthDate: string | null;
  setBirthDate: (date: string | null) => void;

  dateJoined: string | null;
  setDateJoined: (date: string | null) => void;

  isUpdated: boolean;
};

export const DateInputsContext =
  createContext<DateInputsContextType | null>(null);

export function useDateInputs() {
  const context = useContext(DateInputsContext);

  if (!context) {
    throw new Error(
      "useDateInputs must be used within a DateInputsProvider"
    );
  }

  return context;
}
