import { describe, expect, it } from "vitest";

import { useStudentIdCheck } from "@features/auth/signup";
import { renderWithProviders } from "@test-utils/renderer";

const MockComponent = () => {
  const { studentId } = useStudentIdCheck();

  return (
    <div>
      <div>studentId: {studentId}</div>
    </div>
  );
};

describe("useStudentIdCheck", () => {
  it("should throw error when used outside of StudentIdCheckProvider", () => {
    expect(() => renderWithProviders(<MockComponent />)).toThrow(
      "useStudentIdCheck must be used within a StudentIdCheckProvider"
    );
  });
});
