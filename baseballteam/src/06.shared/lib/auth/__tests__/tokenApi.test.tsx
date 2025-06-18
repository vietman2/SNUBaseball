import { describe, it, vi } from "vitest";
import axios from "axios";

import { refresh, samplePlayer } from "@shared/lib/auth";

describe("refresh", () => {
  it("should return user profile and token", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({
      data: { user: samplePlayer, token: "mock_token" },
    });

    await refresh();
  });
});
