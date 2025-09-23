import { useMemo } from "react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { RouterContext, useRouter } from "@shared/lib/router";

vi.unmock("@shared/lib/router");

const MockComponent = () => {
  const { isModal } = useRouter();

  return (
    <div>
      <h1>{isModal ? "Modal is open" : "Modal is closed"}</h1>
    </div>
  );
};

const MockProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo(
    () => ({
      backgroundLocation: {
        pathname: "/home",
        search: "",
        hash: "",
        state: null,
        key: "",
      },
      displayLocation: {
        pathname: "/home",
        search: "",
        hash: "",
        state: null,
        key: "",
      },
      isModal: false,
    }),
    []
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

describe("useTabs", () => {
  it("should throw an error if used outside of TabsProvider", () => {
    expect(() => render(<MockComponent />)).toThrow();
  });

  it("should return active tab and subtab when used within TabsProvider", () => {
    const { getByText } = render(
      <MockProvider>
        <MockComponent />
      </MockProvider>
    );

    expect(getByText("Modal is closed")).toBeInTheDocument();
  });
});
