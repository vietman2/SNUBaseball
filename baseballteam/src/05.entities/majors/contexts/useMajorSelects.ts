import { createContext, useContext } from "react";

import type { CollegeType, DepartmentType } from "@entities/majors";

/**
 * 멤버 생성, 멤버 전공 변경 등에 공통적으로 필요한 단과대/학과 선택 상태 Context
 */

type MajorSelectsContextType = {
  loading: boolean;
  error: boolean;
  isUpdated: boolean;

  // 단과대학 관련
  collegeOptions: CollegeType[];
  selectedCollegeId: number;
  setSelectedCollegeId: (id: number) => void;

  // 학과 관련
  departmentOptions: DepartmentType[];
  selectedMajorId: number;
  setSelectedMajorId: (id: number) => void;
};

export const MajorSelectsContext =
  createContext<MajorSelectsContextType | null>(null);

export function useMajorSelects() {
  const context = useContext(MajorSelectsContext);

  if (!context) {
    throw new Error(
      "useMajorSelects must be used within a MajorSelectsProvider"
    );
  }

  return context;
}
