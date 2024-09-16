import { render } from "@testing-library/react";

import { Results } from "./Results";

jest.mock("@fragments/Records", () => ({
  Tournament: () => <div>Tournament</div>,
}));
jest.mock("@hooks/useOrientation", () => ({
  useOrientation: () => "landscape",
}));

describe("<Results />", () => {
  it("renders", () => {
    render(<Results onSelectGame={jest.fn()} />);
  });
});
