import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { Pagination } from "@shared/ui/Pagination";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("react-router");
vi.unmock("@shared/ui/Pagination"); 

describe("Pagination", () => {
  it("should render pagination correctly (in the middle)", () => {
    const { getByText } = renderWithProviders(
      <Pagination numPages={12} currentPage={2} />
    );
    
    expect(getByText("««")).toBeInTheDocument();
    expect(getByText("«")).toBeInTheDocument();
    expect(getByText("2")).toBeDisabled();
    expect(getByText("»")).toBeInTheDocument();
    expect(getByText("»»")).toBeInTheDocument();

    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("««"));
    fireEvent.click(getByText("«"));
    fireEvent.click(getByText("»"));
    fireEvent.click(getByText("»»"));
  });

  it("should render pagination correctly (first page)", () => {
    const { getByText } = renderWithProviders(
      <Pagination numPages={12} currentPage={1} />
    );
    
    expect(getByText("««")).toBeDisabled();
    expect(getByText("«")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("»")).toBeInTheDocument();
    expect(getByText("»»")).toBeInTheDocument();
  });
});
