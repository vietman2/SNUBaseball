import { createContext, useContext } from "react";

export type StudentIdCheckContextType = {
  studentId: string;
  setStudentId: (studentId: string) => void;
  memberId: number | null;
  setMemberId: (memberId: number) => void;
};

export const StudentIdCheckContext = createContext<
  StudentIdCheckContextType | undefined
>(undefined);

export function useStudentIdCheck() {
  const context = useContext(StudentIdCheckContext);
  if (!context) {
    throw new Error(
      "useStudentIdCheck must be used within a StudentIdCheckProvider"
    );
  }
  return context;
}
