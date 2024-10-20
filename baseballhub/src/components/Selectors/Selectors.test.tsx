import { fireEvent, render, screen } from "@testing-library/react";

import { CollegeSelector } from "./CollegeSelector";
import { SimpleSelector } from "./SimpleSelector";
import { sampleColleges } from "@data/user";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Selectors");

describe("<CollegeSelector />", () => {
  it("should render: college selected", () => {
    render(
      <CollegeSelector
        colleges={sampleColleges}
        selectedCollegeId={1}
        selectedDepartmentId={null}
        onSelectCollege={jest.fn()}
        onSelectDepartment={jest.fn()}
      />
    );

    fireEvent.change(screen.getByTestId("college-selector"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByTestId("department-selector"), {
      target: { value: "2" },
    });
  });

  it("should render: college unselected", () => {
    render(
      <CollegeSelector
        colleges={sampleColleges}
        selectedCollegeId={null}
        selectedDepartmentId={null}
        onSelectCollege={jest.fn()}
        onSelectDepartment={jest.fn()}
      />
    );
  });
});

describe("<SimpleSelector />", () => {
  it("should render: selected", () => {
    renderWithProviders(
      <SimpleSelector
        options={["Test1", "Test2"]}
        selected="Test1"
        onSelect={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("selector"));
    fireEvent.click(screen.getByText("Test2"));
  });

  it("should render: unselected", () => {
    renderWithProviders(
      <SimpleSelector options={["Test"]} selected="" onSelect={jest.fn()} />
    );
  });
});
