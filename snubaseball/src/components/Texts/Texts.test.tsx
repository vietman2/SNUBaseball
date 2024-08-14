import { render } from "@testing-library/react";

import { Title } from "./Title";

jest.unmock("@components/Texts");

describe("<Title />", () => {
  it("should render", () => {
    render(<Title title="Title" subtitle="Subtitle" />);
  });
});
