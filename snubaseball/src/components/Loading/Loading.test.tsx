import { render } from "@testing-library/react";

import { LoadingPage } from "./LoadingPage";

jest.unmock("@components/Loading");

describe("<LoadingPage />", () => {
  it("should render", () => {
    render(<LoadingPage />);
  });
});
