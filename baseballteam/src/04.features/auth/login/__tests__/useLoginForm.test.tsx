import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { useLoginForm } from "@features/auth/login";

const MockComponent = () => {
  const { username } = useLoginForm();

  return (
    <div>
      <p>{username}</p>
    </div>
  );
};

describe("useLoginForm", () => {
  it("should throw an error if used outside of LoginFormProvider", () => {
    expect(() => render(<MockComponent />)).toThrow();
  });
});
