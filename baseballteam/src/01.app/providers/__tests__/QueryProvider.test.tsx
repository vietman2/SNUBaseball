import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { QueryProvider } from "../query/QueryProvider";

describe("QueryProvider", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <QueryProvider>
        <div>Test Child</div>
      </QueryProvider>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });
});
