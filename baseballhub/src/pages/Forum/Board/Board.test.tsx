import { render } from "@testing-library/react";

import Board from "./Board";

jest.mock("@fragments/Post", () => ({
  PostSimple: () => <div />,
}));

describe("<Board />", () => {
  it("should render", () => {
    render(<Board />);
  });
});
