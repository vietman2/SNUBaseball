import { useMajorSelects } from "../contexts/useMajorSelects";
import { SimpleSelect } from "@shared/ui/Selects";

export function DepartmentSelect() {
  const { departmentOptions, selectedMajorId, setSelectedMajorId } =
    useMajorSelects();

  const setMajorId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMajorId(Number(event.target.value));
  };

  return (
    <SimpleSelect
      value={selectedMajorId}
      onChange={setMajorId}
      className="major-select"
      data-testid="department-select"
    >
      <option value={-1} disabled>
        전공 선택
      </option>
      {departmentOptions.map((dept) => (
        <option key={dept.id} value={dept.id}>
          {dept.name}
        </option>
      ))}
    </SimpleSelect>
  );
}
