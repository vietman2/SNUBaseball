import { fireEvent, screen, waitFor } from "@testing-library/react";

import { EquipmentUpdateModal } from "./EquipmentUpdate";
import { sampleEquipmentDetail } from "@data/management";
import { sampleMembers } from "@data/user";
import * as EquipmentAPI from "@services/management/equipment";
import { renderWithProviders } from "@utils/test-utils";

describe("<EquipmentUpdateModal />", () => {
  it("renders closed modal", () => {
    renderWithProviders(
      <EquipmentUpdateModal
        equipment={sampleEquipmentDetail}
        activeMembers={sampleMembers}
        modalOpen={false}
        closeModal={jest.fn()}
      />
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    renderWithProviders(
      <EquipmentUpdateModal
        equipment={sampleEquipmentDetail}
        activeMembers={sampleMembers}
        modalOpen
        closeModal={jest.fn()}
      />
    );
  });

  const changeValue = (testId: string, value: string) => {
    fireEvent.change(screen.getByTestId(testId), {
      target: { value },
    });
  };

  it("handles quantity update", async () => {
    jest
      .spyOn(EquipmentAPI, "updateEquipmentQuantity")
      .mockResolvedValueOnce({});

    await waitFor(() => {
      changeValue("type-select", "수량 업데이트");
      changeValue("equipment-select", "1");
      changeValue("new-quantity", "10");
      changeValue("notes", "test");
      fireEvent.click(screen.getByText("저장"));
    });
  });

  it("handles quantity update fail", async () => {
    jest
      .spyOn(EquipmentAPI, "updateEquipmentQuantity")
      .mockResolvedValueOnce(null);

    await waitFor(() => {
      changeValue("type-select", "수량 업데이트");
      fireEvent.click(screen.getByText("저장"));
    });
  });

  it("handles change manager", async () => {
    jest
      .spyOn(EquipmentAPI, "updateEquipmentManager")
      .mockResolvedValueOnce({});

    await waitFor(() => {
      changeValue("type-select", "담당자 변경");
      changeValue("member-select", "-1");
      changeValue("member-select", "1");
      fireEvent.click(screen.getByTestId("remove-member"));
      fireEvent.click(screen.getByText("저장"));
    });
  });

  it("handles change manager fail", async () => {
    jest
      .spyOn(EquipmentAPI, "updateEquipmentManager")
      .mockResolvedValueOnce(null);

    await waitFor(() => {
      changeValue("type-select", "담당자 변경");
      fireEvent.click(screen.getByText("저장"));
    });
  });

  it("handles new equipment", async () => {
    jest.spyOn(EquipmentAPI, "addNewEquipment").mockResolvedValueOnce({});

    await waitFor(() => {
      changeValue("type-select", "신규 물품 추가");
      changeValue("location-select", "부실");
      changeValue("name", "test");
      changeValue("quantity", "10");
      changeValue("unit", "개");
      changeValue("notes", "test");
      fireEvent.click(screen.getByText("저장"));
    });
  });

  it("handles new equipment fail", async () => {
    jest.spyOn(EquipmentAPI, "addNewEquipment").mockResolvedValueOnce(null);

    await waitFor(() => {
      changeValue("type-select", "신규 물품 추가");
      fireEvent.click(screen.getByText("저장"));
    });
  });
});
