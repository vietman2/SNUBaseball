import { render } from "@testing-library/react";

import { Caption } from "./Caption";
import { Subtitle } from "./Subtitle";
import { Title } from "./Title";

jest.unmock("@components/Texts");

describe("<Title />", () => {
  it("should render", () => {
    render(<Title title="Title" subtitle="Subtitle" />);
  });
});

describe("<Subtitle />", () => {
  it("should render without icon", () => {
    render(<Subtitle subtitle="Subtitle" />);
  });

  it("should render with icon", () => {
    render(<Subtitle subtitle="Subtitle" icon="baseball" />);
  });
});

describe("<Caption />", () => {
  it("should render", () => {
    render(<Caption text="Caption" />);
  });
});
