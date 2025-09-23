import { describe, expect, it } from "vitest";
import { fireEvent } from "@testing-library/react";

import {
  NameIDInputProvider,
  useContactInputs,
  useDateInputs,
  useNameIDInput,
} from "@entities/members";
import { renderWithProviders } from "@test-utils/renderer";

// Coverage를 올리기 위한 테스트

const TestNameComponent = () => {
  const { name, setName, admissionYear, setAdmissionYear, toggleMode } =
    useNameIDInput();
  return (
    <div>
      <div data-testid="name">{name}</div>
      <button data-testid="setName" onClick={() => setName("John Doe")}>
        Set Name
      </button>
      <div data-testid="admissionYear">{admissionYear}</div>
      <button
        data-testid="setAdmissionYear"
        onClick={() => setAdmissionYear(2022)}
      >
        Set Admission Year
      </button>
      <button data-testid="toggleMode" onClick={toggleMode}>
        Toggle Mode
      </button>
    </div>
  );
};

const TestDateComponent = () => {
  const { birthDate } = useDateInputs();
  return <div data-testid="birthDate">{birthDate}</div>;
};

const TestContactComponent = () => {
  const { phone } = useContactInputs();
  return <div data-testid="phone">{phone}</div>;
};

describe("contexts", () => {
  it("should raise errors when used outside of providers", () => {
    // useNameIDInput
    expect(() => renderWithProviders(<TestNameComponent />)).toThrow(
      "useNameIDInput must be used within a NameIDInputProvider"
    );
    // useDateInputs
    expect(() => renderWithProviders(<TestDateComponent />)).toThrow(
      "useDateInputs must be used within a DateInputsProvider"
    );
    // useContactInputs
    expect(() => renderWithProviders(<TestContactComponent />)).toThrow(
      "useContactInputs must be used within a ContactInputsProvider"
    );
  });

  it("should handle NameIDInputProvider correctly", () => {
    const { getByTestId } = renderWithProviders(
      <NameIDInputProvider>
        <TestNameComponent />
      </NameIDInputProvider>
    );

    // 초기에는 전체 학번 모드로 되어있기 때문에, 입학년도 모드로 전환
    fireEvent.click(getByTestId("toggleMode"));

    fireEvent.click(getByTestId("setName"));
    fireEvent.click(getByTestId("setAdmissionYear"));

    expect(getByTestId("name").textContent).toBe("John Doe");
    expect(getByTestId("admissionYear").textContent).toBe("2022");
  });
});
