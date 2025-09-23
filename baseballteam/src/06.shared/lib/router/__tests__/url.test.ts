import { describe, expect, it, vi } from "vitest";

import { getAllTabs, parseCurrentPath } from "@shared/lib/router";

vi.unmock("@shared/lib/router");

describe("getAllTabs", () => {
  it("should return main and training tabs when isAdminMode is false", () => {
    const tabs = getAllTabs(false);
    expect(tabs.length).toBe(2);
    expect(tabs[0].title).toBe("Main");
    expect(tabs[1].title).toBe("Training");
  });

  it("should return main, training, and admin tabs when isAdminMode is true", () => {
    const tabs = getAllTabs(true);
    expect(tabs.length).toBe(3);
    expect(tabs[0].title).toBe("Main");
    expect(tabs[1].title).toBe("Training");
    expect(tabs[2].title).toBe("Admin");
  });
});

describe("parseCurrentPath", () => {
  it("should parse active tab correctly (normal mode)", () => {
    const result2 = parseCurrentPath("/feedback", false);
    expect(result2.tab?.title).toBe("피드백");
    expect(result2.subTab).toBeNull();
  });

  it("should parse active tab and subtab correctly (normal mode)", () => {
    const result = parseCurrentPath("/records/results", false);
    expect(result.tab?.title).toBe("기록실");
    expect(result.subTab?.title).toBe("경기결과");
  });

  it("should handle incorrect tab path correctly", () => {
    const result = parseCurrentPath("/invalid", false);
    expect(result.tab).toBeNull();
    expect(result.subTab).toBeNull();
  });

  it("should handle incorrect subtab correctly", () => {
    const result1 = parseCurrentPath("/home/results", false);
    expect(result1.tab?.title).toBe("Home");
    expect(result1.subTab).toBeNull();

    const result2 = parseCurrentPath("/records/invalid", false);
    expect(result2.tab?.title).toBe("기록실");
    expect(result2.subTab).toBeNull();
  });

  it("should handle index correctly", () => {
    const result = parseCurrentPath("/", false);
    expect(result.tab).toBeNull();
    expect(result.subTab).toBeNull();
  });
});
