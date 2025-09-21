import { useEffect, useMemo, useState, type ReactNode } from "react";

import { useAllMajors } from "../api/getAllMajors";
import { MajorSelectsContext } from "../contexts/useMajorSelects";
import type { DepartmentType } from "../models/majors";

interface Props {
  children: ReactNode;
  originalMajor: DepartmentType;
}

export function MajorSelectsProvider({
  children,
  originalMajor,
}: Readonly<Props>) {
  const [selectedCollegeId, setSelectedCollegeId] = useState<number>(-1);
  const [selectedMajorId, setSelectedMajorId] = useState<number>(-1);

  const { data: colleges, isLoading, isError } = useAllMajors();

  // 학과 옵션은 선택된 단과대 기준으로 파생
  const departmentOptions = useMemo(() => {
    const college = colleges?.find((c) => c.id === selectedCollegeId);
    return college?.departments ?? [];
  }, [colleges, selectedCollegeId]);

  // 버튼 활성화 조건
  const isUpdated = useMemo(
    () => selectedMajorId !== -1 && selectedMajorId !== originalMajor.id,
    [selectedMajorId, originalMajor.id]
  );

  // 초기값 세팅
  useEffect(() => {
    if (!colleges) return;
    const college = colleges.find((c) => c.id === originalMajor.college_id);
    setSelectedCollegeId(college ? college.id : -1);

    const dept = college?.departments.find((d) => d.id === originalMajor.id);
    setSelectedMajorId(dept ? dept.id : -1);
  }, [colleges, originalMajor]);

  const value = useMemo(
    () => ({
      loading: isLoading,
      error: isError || !colleges,
      isUpdated,
      collegeOptions: colleges ?? [],
      selectedCollegeId,
      setSelectedCollegeId,
      departmentOptions,
      selectedMajorId,
      setSelectedMajorId,
    }),
    [
      isLoading,
      isError,
      isUpdated,
      colleges,
      selectedCollegeId,
      setSelectedCollegeId,
      departmentOptions,
      selectedMajorId,
      setSelectedMajorId,
    ]
  );

  return (
    <MajorSelectsContext.Provider value={value}>
      {children}
    </MajorSelectsContext.Provider>
  );
}
