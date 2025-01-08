import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { MemberEdit } from "./MemberEdit";
import { sampleColleges, sampleMembers } from "@data/user";
import * as MajorsAPI from "@services/person/majors";
import * as MembersAPI from "@services/person/members";
import { renderWithProviders } from "@utils/test-utils";

describe("<MemberEdit />", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useParams").mockReturnValue({
      memberId: "1",
    });
    jest.spyOn(MajorsAPI, "getMajors").mockResolvedValue(sampleColleges);
    jest
      .spyOn(MembersAPI, "getMemberDetail")
      .mockResolvedValue(sampleMembers[0]);
  });

  it("handles api error", async () => {
    jest
      .spyOn(MembersAPI, "getMemberDetail")
      .mockResolvedValue(null);
    renderWithProviders(<MemberEdit />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("handles update correctly", async () => {
    jest.spyOn(MembersAPI, "updateMember").mockResolvedValue(true);
    renderWithProviders(<MemberEdit />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("admission-year"), {
        target: { value: "2023" },
      });
      fireEvent.change(screen.getByTestId("student-id"), {
        target: { value: "test" },
      });
      fireEvent.change(screen.getByTestId("college"), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByTestId("major"), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByTestId("phone"), {
        target: { value: "phone" },
      });
      fireEvent.change(screen.getByTestId("email"), {
        target: { value: "email" },
      });
      fireEvent.change(screen.getByTestId("address"), {
        target: { value: "address" },
      });
      fireEvent.change(screen.getByTestId("birth-date"), {
        target: { value: "2023-10-01" },
      });
      fireEvent.change(screen.getByTestId("notes"), {
        target: { value: "notes" },
      });
      fireEvent.change(screen.getByTestId("role"), {
        target: { value: "매니저" },
      });
      fireEvent.change(screen.getByTestId("status"), {
        target: { value: "군입대" },
      });
      fireEvent.change(screen.getByTestId("date-joined"), {
        target: { value: "2023-10-01" },
      });
      fireEvent.change(screen.getByTestId("num-semesters"), {
        target: { value: "2" },
      });
      fireEvent.change(screen.getByTestId("hands"), {
        target: { value: "좌투좌타" },
      });
      fireEvent.change(screen.getByTestId("position"), {
        target: { value: "외야수" },
      });
      fireEvent.change(screen.getByTestId("back-number"), {
        target: { value: "10" },
      });
      fireEvent.change(screen.getByTestId("is-elite"), {
        target: { value: "X" },
      });
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText("저장"));
    });
  });

  it("handles update fail", async () => {
    jest
      .spyOn(MembersAPI, "getMemberDetail")
      .mockResolvedValue(sampleMembers[1]);
    jest.spyOn(MembersAPI, "updateMember").mockResolvedValue(null);
    renderWithProviders(<MemberEdit />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("저장"));
    });
  });

  it("handles image update correctly", async () => {
    jest.spyOn(MembersAPI, "updateProfileImage").mockResolvedValue(true);
    renderWithProviders(<MemberEdit />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("image-upload-input"), {
        target: { files: [new File(["test"], "test.png")] },
      });
      fireEvent.click(screen.getByTestId("image-upload"));
    });
  });

  it("handles image update fail", async () => {
    jest.spyOn(MembersAPI, "updateProfileImage").mockResolvedValue(null);
    renderWithProviders(<MemberEdit />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("image-upload-input"), {
        target: { files: [new File(["test"], "test.png")] },
      });
      fireEvent.click(screen.getByTestId("image-upload"));
    });
  });

  it("handles image update cancel", async () => {
    renderWithProviders(<MemberEdit />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("image-upload-input"), {
        target: { files: null },
      });
      fireEvent.click(screen.getByTestId("image-upload"));
    });
  });
});
