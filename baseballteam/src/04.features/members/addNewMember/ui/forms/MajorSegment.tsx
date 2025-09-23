import { Horizontal, Segment } from "../styles";
import { CollegeSelect, DepartmentSelect } from "@entities/majors";

export function MajorSegment() {
  return (
    <Segment>
      <span className="title">전공</span>
      <Horizontal>
        <CollegeSelect />
        <DepartmentSelect />
      </Horizontal>
    </Segment>
  );
}
