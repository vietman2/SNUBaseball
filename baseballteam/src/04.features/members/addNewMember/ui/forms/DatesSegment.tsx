import { Horizontal, Segment, Vertical } from "../styles";
import { useDateInputs } from "@entities/members";
import { DateInput } from "@shared/ui/Inputs";

export function DatesSegment() {
  const { birthDate, setBirthDate, dateJoined, setDateJoined } =
    useDateInputs();

  return (
    <Segment>
      <Horizontal>
        <Vertical>
          <span className="title">생년월일</span>
          <DateInput value={birthDate} onChange={setBirthDate} data-testid="birth-date-input" />
        </Vertical>
        <Vertical>
          <span className="title">야구부 입부일</span>
          <DateInput value={dateJoined} onChange={setDateJoined} data-testid="join-date-input" />
        </Vertical>
      </Horizontal>
    </Segment>
  );
}
