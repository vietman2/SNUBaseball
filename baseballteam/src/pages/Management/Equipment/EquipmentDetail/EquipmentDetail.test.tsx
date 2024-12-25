import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { EquipmentDetail } from "./EquipmentDetail";
import * as AuthContext from "@contexts/auth";
import { sampleEquipmentDetail } from "@data/management";
import { sampleAdmin, sampleMembers } from "@data/user";
import * as EquipmentAPI from "@services/management/equipment";
import * as MembersAPI from "@services/person/members";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useAuth: jest.fn(),
}));
jest.mock("@fragments/Equipment", () => ({
  EquipmentUpdateModal: ({ closeModal }: { closeModal: () => void }) => (
    <button onClick={closeModal}>닫기</button>
  ),
  EquipmentUpdateTip: ({ closeModal }: { closeModal: () => void }) => (
    <button onClick={closeModal}>닫기2</button>
  ),
}));

describe("<EquipmentDetail />", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({
      equipmentId: "1",
    });
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      login: jest.fn(),
      logout: jest.fn(),
    });
    jest
      .spyOn(EquipmentAPI, "getEquipmentDetails")
      .mockResolvedValue(sampleEquipmentDetail);
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(sampleMembers);
  });

  it("handles data fetch fail correctly", async () => {
    jest.spyOn(EquipmentAPI, "getEquipmentDetails").mockResolvedValue(null);
    renderWithProviders(<EquipmentDetail />);

    await waitFor(() => fireEvent.click(screen.getByText("뒤로가기")));
  });

  it("handles update modal", async () => {
    renderWithProviders(<EquipmentDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("업데이트"));
      fireEvent.click(screen.getByText("닫기"));
    });
  });

  it("handles tip modal", async () => {
    renderWithProviders(<EquipmentDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("수정"));
      fireEvent.click(screen.getByText("닫기2"));
    });
  });
});
