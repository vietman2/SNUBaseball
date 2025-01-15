import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { MinutesList } from "./MinutesList";
import { sampleMinutes } from "@data/team";
import * as MinutesAPI from "@services/team/minutes";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Minutes", () => ({
  MinutesSimple: () => <div data-testid="minutes-simple" />,
}));

describe("<MinutesList />", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/team/minutes",
      search: "",
      key: "",
      hash: "",
      state: null,
    });
    jest.spyOn(MinutesAPI, "getMinutes").mockResolvedValue(sampleMinutes);
  });

  it("renders in the background", async () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/team/minutes/1",
      search: "",
      key: "",
      hash: "",
      state: null,
    });
    renderWithProviders(<MinutesList />);
  });

  it("handles api error", async () => {
    jest.spyOn(MinutesAPI, "getMinutes").mockResolvedValue(null);
    renderWithProviders(<MinutesList />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("새로고침"));
    });
  });

  it("renders and handles navigate", async () => {
    renderWithProviders(<MinutesList />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("minutes-1"));
      fireEvent.click(screen.getByText("새 회의록"));
    });
  });
});
