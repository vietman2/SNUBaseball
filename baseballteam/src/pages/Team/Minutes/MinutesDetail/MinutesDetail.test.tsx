import * as Router from "react-router-dom";

import { MinutesDetail } from "./MinutesDetail";
import { sampleMinutes } from "@data/team";
import * as MinutesAPI from "@services/team/minutes";
import { renderWithProviders } from "@utils/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/dom";

describe("<MinutesDetail />", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => null);
    jest.spyOn(window, "confirm").mockReturnValue(true);
    jest.spyOn(window, "open").mockImplementation(() => null);
    jest.spyOn(Router, "useParams").mockReturnValue({ minutesId: "1" });
    jest
      .spyOn(MinutesAPI, "getMinutesDetails")
      .mockResolvedValue(sampleMinutes[1]);
    jest.spyOn(MinutesAPI, "deleteMinutes").mockResolvedValue(true);
  });

  it("handles api error", async () => {
    jest.spyOn(MinutesAPI, "getMinutesDetails").mockResolvedValue(null);
    renderWithProviders(<MinutesDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("handles attachments and navigate", async () => {
    renderWithProviders(<MinutesDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("file1"));
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("수정하기"));
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });

  it("handles delete fail", async () => {
    jest.spyOn(MinutesAPI, "deleteMinutes").mockResolvedValue(null);
    renderWithProviders(<MinutesDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });

  it("handles delete cancel", async () => {
    jest.spyOn(window, "confirm").mockReturnValue(false);
    renderWithProviders(<MinutesDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });
});
