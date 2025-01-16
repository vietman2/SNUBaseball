import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { MinutesWrite } from "./MinutesWrite";
import { sampleMinutes } from "@data/team";
import * as MinutesAPI from "@services/team/minutes";
import { renderWithProviders } from "@utils/test-utils";

describe("<MinutesWrite />: new", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/team/minutes/new",
      hash: "",
      state: "",
      search: "",
      key: "",
    });
    jest.spyOn(Router, "useParams").mockReturnValue({ minutesId: "" });
  });

  it("handles create", async () => {
    jest.spyOn(MinutesAPI, "createMinutes").mockResolvedValue(true);
    renderWithProviders(<MinutesWrite />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("textinput-제목을 입력하세요"), {
        target: { value: "Title" },
      });
      fireEvent.change(screen.getByTestId("content-input"), {
        target: { value: "Content" },
      });
      fireEvent.click(screen.getByText("등록하기"));
    });
  });

  it("handles file upload cancel create fail", async () => {
    jest.spyOn(MinutesAPI, "createMinutes").mockResolvedValue(null);
    renderWithProviders(<MinutesWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("파일 첨부"));
      fireEvent.change(screen.getByTestId("file-upload"), {
        target: { files: null },
      });
      fireEvent.click(screen.getByText("등록하기"));
    });
  });
});

describe("<MinutesWrite />: edit", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/team/minutes/1/edit",
      hash: "",
      state: "",
      search: "",
      key: "",
    });
    jest.spyOn(Router, "useParams").mockReturnValue({ minutesId: "1" });
    jest
      .spyOn(MinutesAPI, "getMinutesDetails")
      .mockResolvedValue(sampleMinutes[0]);
  });

  it("handles api error", async () => {
    jest.spyOn(MinutesAPI, "getMinutesDetails").mockResolvedValue(null);
    renderWithProviders(<MinutesWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("handles attachments and edit", async () => {
    jest.spyOn(MinutesAPI, "editMinutes").mockResolvedValue(true);
    renderWithProviders(<MinutesWrite />);

    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText("파일 첨부"));
      fireEvent.change(screen.getByTestId("file-upload"), {
        target: { files: [file] },
      });
      fireEvent.click(screen.getByTestId("remove-attachment"));
      fireEvent.click(screen.getByText("수정하기"));
    });
  });

  it("handles edit failure", async () => {
    jest.spyOn(MinutesAPI, "editMinutes").mockResolvedValue(null);
    renderWithProviders(<MinutesWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("수정하기"));
    });
  });
});
