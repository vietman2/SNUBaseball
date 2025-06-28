import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { AuthProvider } from "../auth/AuthProvider";
import { AutoLoginProvider } from "../auth/AutoLoginProvider";
import { samplePlayer, useAuth } from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/auth");

const MockComponent = () => {
  const { user } = useAuth();

  const testRequest = async () => {
    try {
      await axios.get("/test");
    } catch {
      // Handle error
    }
  };

  return (
    <div>
      <button onClick={testRequest}>Test Request</button>
      <div>Authenticated: {user ? "Yes" : "No"}</div>
    </div>
  );
};

describe("AutoLoginProvider", () => {
  const mockAxios = new MockAdapter(axios);

  const render = () => {
    return renderWithProviders(
      <AuthProvider>
        <AutoLoginProvider>
          <MockComponent />
        </AutoLoginProvider>
      </AuthProvider>
    );
  };

  beforeEach(() => {
    mockAxios.reset();
    mockAxios.onPost("/api/tokens/refresh/").reply(200, {
      user: samplePlayer,
      access: "test-token",
    });
  });

  it("test auto login success", async () => {
    const { getByText } = render();

    await waitFor(() =>
      expect(getByText("Authenticated: Yes")).toBeInTheDocument()
    );
  });

  it("test auto login fail", async () => {
    mockAxios.onPost("/api/tokens/refresh/").reply(400);

    const { getByText } = render();

    await waitFor(() =>
      expect(getByText("Authenticated: No")).toBeInTheDocument()
    );
  });

  it("test auto refresh success", async () => {
    const { getByText } = render();

    mockAxios
      .onGet("/test")
      .replyOnce(401, { error: "Access Token이 만료되었습니다." });
    mockAxios.onGet("/test").reply(200, {});

    await waitFor(() => {
      fireEvent.click(getByText("Test Request"));
    });
  });

  it("test auto refresh fail", async () => {
    const { getByText } = render();

    mockAxios
      .onGet("/test")
      .replyOnce(401, { error: "Access Token이 만료되었습니다." });
    mockAxios.onPost("/api/tokens/refresh/").reply(400);

    fireEvent.click(getByText("Test Request"));

    await waitFor(() => {
      expect(getByText("Authenticated: No")).toBeInTheDocument();
    });
  });
});
