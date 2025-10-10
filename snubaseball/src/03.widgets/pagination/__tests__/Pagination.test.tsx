import * as Router from "next/navigation";
import { fireEvent } from "@testing-library/react";

import { Pagination, usePagination } from "@widgets/pagination";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  // Test with custom properties
  const { page, setPage } = usePagination("p", 5);

  return (
    <Pagination
      currentPage={page}
      totalPages={20}
      onPageChange={setPage}
      siblingCount={1}
    />
  );
};

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Router, "useSearchParams").mockImplementation(
      () =>
        ({
          get: (key: string) => {
            if (key === "p") return "5";
            return null;
          },
          toString: () => "p=5",
        } as unknown as Router.ReadonlyURLSearchParams)
    );
  });

  it("renders pagination buttons correctly", () => {
    const { getByTestId } = renderWithProviders(<TestComponent />);

    // Check if specific page buttons are rendered
    expect(getByTestId("page-button-1")).toBeInTheDocument();
    expect(getByTestId("page-button-4")).toBeInTheDocument();
    expect(getByTestId("page-button-5")).toBeInTheDocument();
    expect(getByTestId("page-button-6")).toBeInTheDocument();
    expect(getByTestId("page-button-20")).toBeInTheDocument();

    // Check if ellipsis is rendered
    expect(getByTestId("page-button-prev")).toBeInTheDocument();
    expect(getByTestId("page-button-next")).toBeInTheDocument();
  });

  it("renders last page correctly", () => {
    jest.spyOn(Router, "useSearchParams").mockImplementation(
      () =>
        ({
          get: (key: string) => {
            if (key === "p") return "20";
            return null;
          },
          toString: () => "p=20",
        } as unknown as Router.ReadonlyURLSearchParams)
    );
    const { getByTestId } = renderWithProviders(<TestComponent />);

    // Check if last page button is rendered
    expect(getByTestId("page-button-20")).toBeInTheDocument();
  });

  it("handles page button clicks correctly", () => {
    const { getByTestId } = renderWithProviders(<TestComponent />);

    // 클릭 테스트
    fireEvent.click(getByTestId("page-button-6"));
    fireEvent.click(getByTestId("page-button-next"));
    fireEvent.click(getByTestId("page-button-prev"));
    fireEvent.click(getByTestId("page-button-1"));
  });

  it("handles incorrect search param gracefully", () => {
    jest.spyOn(Router, "useSearchParams").mockImplementation(
      () =>
        ({
          get: (key: string) => {
            if (key === "p") return "invalid"; // Invalid page number
            return null;
          },
          toString: () => "p=invalid",
        } as unknown as Router.ReadonlyURLSearchParams)
    );

    const { getByTestId } = renderWithProviders(<TestComponent />);

    // Should default to initialPage which is 5
    expect(getByTestId("page-button-5")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
