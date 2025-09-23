import { useMajorSelects } from "../contexts/useMajorSelects";
import { SimpleSelect } from "@shared/ui/Selects";

export function CollegeSelect() {
  const {
    collegeOptions,
    selectedCollegeId,
    setSelectedCollegeId,
    setSelectedMajorId,
  } = useMajorSelects();

  const setCollegeId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollegeId(Number(event.target.value));

    const selectedCollege = collegeOptions.find(
      (c) => c.id === Number(event.target.value)
    );

    if (selectedCollege && selectedCollege.departments.length > 0) {
      setSelectedMajorId(selectedCollege.departments[0].id);
    } else {
      setSelectedMajorId(-1);
    }
  };

  return (
    <SimpleSelect
      value={selectedCollegeId}
      onChange={setCollegeId}
      className="major-select"
      data-testid="college-select"
    >
      <option value={-1} disabled>
        단과대학 선택
      </option>
      {collegeOptions.map((college) => (
        <option key={college.id} value={college.id}>
          {college.name}
        </option>
      ))}
    </SimpleSelect>
  );
}
