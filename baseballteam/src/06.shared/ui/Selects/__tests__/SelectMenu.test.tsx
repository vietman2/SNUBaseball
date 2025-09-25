import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { useMenu } from "../SelectMenu/useMenu";
import { SingleSelectMenu, MultiSelectMenu } from "@shared/ui/Selects";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Selects");

describe("SelectMenu", () => {
  const options = ["Alpha", "Beta", "Gamma", "Delta"];
  const getLabel = (option: string) => option;

  describe("SingleSelectMenu", () => {
    it("renders selected value and handles remove", () => {
      const { getByTestId } = renderWithProviders(
        <SingleSelectMenu
          options={options}
          value="Alpha"
          onSelect={vi.fn()}
          getLabel={getLabel}
        />
      );

      fireEvent.click(getByTestId("open-dropdown"));
      fireEvent.click(getByTestId("remove-selected"));
    });

    it("renders null value and handles select", () => {
      const { getByTestId } = renderWithProviders(
        <SingleSelectMenu
          options={options}
          value={null}
          onSelect={vi.fn()}
          getLabel={getLabel}
        />
      );

      fireEvent.click(getByTestId("open-dropdown"));
      fireEvent.click(getByTestId("select-Beta"));
    });
  });

  describe("MultiSelectMenu", () => {
    it("renders selected values and handles deselect", () => {
      const { getByTestId } = renderWithProviders(
        <MultiSelectMenu
          options={options}
          value={["Alpha", "Gamma"]}
          onSelect={vi.fn()}
          getLabel={getLabel}
        />
      );

      fireEvent.click(getByTestId("open-dropdown"));
      fireEvent.click(getByTestId("deselect-Alpha"));
      fireEvent.click(getByTestId("deselect-Gamma"));
    });

    it("renders empty state and handles select", () => {
      const { getByTestId } = renderWithProviders(
        <MultiSelectMenu
          options={options}
          value={[]}
          onSelect={vi.fn()}
          getLabel={getLabel}
        />
      );

      fireEvent.click(getByTestId("open-dropdown"));
      fireEvent.click(getByTestId("select-Beta"));
    });
  });

  describe("common behavior", () => {
    it("handles closing the dropdown menu using escape key", async () => {
      const { getByTestId } = renderWithProviders(
        <SingleSelectMenu
          options={options}
          value={null}
          onSelect={vi.fn()}
          getLabel={getLabel}
        />
      );

      fireEvent.click(getByTestId("open-dropdown"));
      expect(getByTestId("dropdown-menu")).toHaveStyle({
        display: "block",
      });

      // 다른키를 누르면, 그대로 열려있음
      fireEvent.keyDown(getByTestId("select-container"), {
        key: "ArrowDown",
        code: "ArrowDown",
      });
      expect(getByTestId("dropdown-menu")).toHaveStyle({
        display: "block",
      });

      fireEvent.keyDown(getByTestId("select-container"), {
        key: "Escape",
        code: "Escape",
      });
      await waitFor(() => {
        expect(getByTestId("dropdown-menu")).toHaveStyle({
          display: "none",
        });
      });
    });

    it("handles closing the dropdown menu by clicking outside", async () => {
      const { getByTestId } = renderWithProviders(
        <SingleSelectMenu
          options={options}
          value={null}
          onSelect={vi.fn()}
          getLabel={getLabel}
        />
      );

      fireEvent.click(getByTestId("open-dropdown"));
      expect(getByTestId("dropdown-menu")).toHaveStyle({
        display: "block",
      });

      // 안쪽을 누르면 계속 열려있음
      fireEvent.pointerDown(getByTestId("select-container"));
      expect(getByTestId("dropdown-menu")).toHaveStyle({
        display: "block",
      });

      // 바깥을 누르면 닫힘
      fireEvent.pointerDown(document.body);
      await waitFor(() => {
        expect(getByTestId("dropdown-menu")).toHaveStyle({
          display: "none",
        });
      });
    });
  });

  const TestComponent = () => {
    const { openMenu } = useMenu();

    return (
      <button onClick={openMenu} data-testid="open-menu">
        Open Menu
      </button>
    );
  };

  describe("COVERAGE PURPOSE", () => {
    it("does nothing when ref is not set", () => {
      const { getByTestId } = renderWithProviders(<TestComponent />);

      fireEvent.click(getByTestId("open-menu"));

      fireEvent.pointerDown(getByTestId("open-menu"), {
        key: "ArrowDown",
        code: "ArrowDown",
      });
    });
  });
});
