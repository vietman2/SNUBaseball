import { fireEvent, screen } from "@testing-library/react";
import * as Router from "react-router-dom";

import { EventsContainer } from "./EventsContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./ClosingCeremony/ClosingCeremony", () => ({
  ClosingCeremony: () => <div>Closing Ceremony</div>,
}));
jest.mock("./Graduation/Graduation", () => ({
  Graduation: () => <div>Graduation</div>,
}));
jest.mock("./Homecoming/Homecoming", () => ({
  Homecoming: () => <div>Homecoming</div>,
}));

describe("<EventsContainer />", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/events/homecoming",
      hash: "",
      key: "",
      search: "",
      state: null,
    });
  });

  it("renders Homecoming by default and handles tab clicks", () => {
    renderWithProviders(<EventsContainer />);

    fireEvent.click(screen.getByText("종무식"));
    fireEvent.click(screen.getByText("졸업식"));
    fireEvent.click(screen.getByText("OB전"));
  });
});
