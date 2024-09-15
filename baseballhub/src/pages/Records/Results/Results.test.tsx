import { render } from "@testing-library/react";

import Results from "./Results";

jest.mock("@fragments/Records", () => ({
  GameSummary: () => <div>GameSummary</div>,
  Scoreboard: () => <div>Scoreboard</div>,
}));

describe("<Results />", () => {
  it("renders", () => {
    render(<Results />);
  });
});
