import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { useCreateNewMemberAPI } from "../api/createNewMember";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

const testData = {
  name: "Test User",
  student_id: "2025-00001",
  admission_year: 2025,
  phone: null,
  email: null,
  address: null,
  birth_date: null,
  date_joined: null,
  is_player: false,
};

const TestComponent = () => {
  const { mutateAsync: request, isSuccess } = useCreateNewMemberAPI();

  const click = async () => {
    await request({ ...testData, major_id: 1 });
  };

  return (
    <div>
      <button onClick={click}>Create Member</button>
      {isSuccess && <div>Success!</div>}
    </div>
  );
};

describe("useCreateNewMemberAPI", () => {
  beforeEach(() => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValue({
      data: {
        ...testData,
        id: 1,
        role: "MEMBER",
        status: "ACTIVE",
        major: null,
        profile_image: null,
      },
    });
  });

  it("create new member", async () => {
    const { getByText } = renderWithProviders(<TestComponent />);

    const button = getByText("Create Member");
    fireEvent.click(button);

    await waitFor(() => expect(getByText("Success!")).toBeInTheDocument());
  });
});
