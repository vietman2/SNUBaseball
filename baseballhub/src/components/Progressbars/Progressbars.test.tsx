import { render } from "@testing-library/react";

import { Statsbar } from "./Statsbar";

jest.unmock("@components/Progressbars");

describe("<Statsbar />", () => {
  it("renders without errors", () => {
    render(<Statsbar text="안타" number={5} />);
  });
});
