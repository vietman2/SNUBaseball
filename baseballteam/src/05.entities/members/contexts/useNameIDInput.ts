import { createContext, useContext } from "react";

type NameIDInputContextType = {
  name: string;
  setName: (name: string) => void;

  fullStudentID: string;
  setFullStudentID: (id: string) => void;

  admissionYear: number;
  setAdmissionYear: (year: number) => void;

  isPlayer: boolean;
  setIsPlayer: (isPlayer: boolean) => void;

  isFullID: boolean;
  toggleMode: () => void;

  payload: {
    name: string;
    student_id: string | null;
    admission_year: number | null;
    is_player: boolean;
  };
  ready: boolean;
};

export const NameIDInputContext = createContext<NameIDInputContextType | null>(
  null
);

export function useNameIDInput() {
  const context = useContext(NameIDInputContext);

  if (!context) {
    throw new Error("useNameIDInput must be used within a NameIDInputProvider");
  }

  return context;
}
