import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";

import { NotFoundPage } from "@pages/notfound";
import { renderWithProviders } from "@test-utils/renderer";

describe("NotFoundPage", () => {
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.spyOn(Router, "useNavigate").mockReturnValue(navigateMock);
  });

  it("should render notfound page with default props", async () => {
    const { getByText } = renderWithProviders(<NotFoundPage />);

    await waitFor(() => {
      expect(getByText("존재하지 않는 페이지입니다.")).toBeInTheDocument();
    });

    fireEvent.click(getByText("뒤로가기"));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(-1);
    });
  });

  it("should render notfound page with other props", async () => {
    const { getByText } = renderWithProviders(
      <NotFoundPage label="아무거나" path="/random" />
    );

    await waitFor(() => {
      expect(getByText("존재하지 않는 페이지입니다.")).toBeInTheDocument();
    });

    fireEvent.click(getByText("아무거나"));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/random");
    });
  });
});
