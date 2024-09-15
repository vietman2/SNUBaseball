import styled from "styled-components";

import { CollegeType } from "@models/user/person";

interface Props {
  colleges: CollegeType[];
  selectedCollegeId: number | null;
  selectedDepartmentId: number | null;
  onSelectCollege: (collegeId: number) => void;
  onSelectDepartment: (departmentId: number) => void;
}

export function CollegeSelector({
  colleges,
  selectedCollegeId,
  selectedDepartmentId,
  onSelectCollege,
  onSelectDepartment,
}: Readonly<Props>) {
  return (
    <Container>
      <select
        value={selectedCollegeId || ""}
        onChange={(e) => onSelectCollege(Number(e.target.value))}
        data-testid="college-selector"
      >
        <option value="" disabled>
          대학 선택
        </option>
        {colleges.map((college) => (
          <option key={college.id} value={college.id}>
            {college.name}
          </option>
        ))}
      </select>
      <select
        value={selectedDepartmentId || ""}
        onChange={(e) => onSelectDepartment(Number(e.target.value))}
        data-testid="department-selector"
      >
        <option value="" disabled>
          학과 선택
        </option>
        {colleges
          .find((college) => college.id === selectedCollegeId)
          ?.departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
      </select>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  select {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 2px solid #0f0f70;
    border-radius: 4px;
  }
`;
