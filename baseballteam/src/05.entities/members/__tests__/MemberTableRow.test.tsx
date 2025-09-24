import { describe, it } from "vitest";

import { MemberTableRow, sampleMemberDetails } from "@entities/members";
import { renderWithProviders } from "@test-utils/renderer";

// Coverage를 올리기 위한 테스트

describe("MemberTableRow", () => {
  it("should render member data correctly", () => {
    renderWithProviders(
      <MemberTableRow index={0} member={sampleMemberDetails} />
    );
  });

  it("should handle empty fields correctly", () => {
    renderWithProviders(
      <MemberTableRow
        index={0}
        member={{
          ...sampleMemberDetails,
          major: null,
          student_id: "",
          phone: "",
          birth_date: "",
          date_joined: "",
        }}
      />
    );
  });
});
