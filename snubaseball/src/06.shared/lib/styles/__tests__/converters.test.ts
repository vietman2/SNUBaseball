import { hexToRgb, hexToRgba } from "@shared/lib/styles";

describe("converters", () => {
  describe("hexToRgb", () => {
    it("should convert 3-digit hex to rgb", () => {
      expect(hexToRgb("#f0a")).toBe("rgb(255, 0, 170)");
    });

    it("should convert 6-digit hex to rgb", () => {
      expect(hexToRgb("#ff00aa")).toBe("rgb(255, 0, 170)");
    });

    it("should handle hex without #", () => {
      expect(hexToRgb("ff00aa")).toBe("rgb(255, 0, 170)");
    });

    it("should return black for invalid hex", () => {
      expect(hexToRgb("#xyz")).toBe("rgb(0, 0, 0)");
    });
  });

  describe("hexToRgba", () => {
    it("should convert 4-digit hex to rgba", () => {
      expect(hexToRgba("#f0a8")).toBe("rgba(255, 0, 170, 0.5333333333333333)");
    });

    it("should convert 8-digit hex to rgba", () => {
      expect(hexToRgba("#ff00aa80")).toBe(
        "rgba(255, 0, 170, 0.5019607843137255)"
      );
    });

    it("should use provided alpha over hex alpha", () => {
      expect(hexToRgba("#ff00aa80", 0.8)).toBe("rgba(255, 0, 170, 0.8)");
    });

    it("should clamp alpha between 0 and 1", () => {
      expect(hexToRgba("#ff00aa", 1.5)).toBe("rgba(255, 0, 170, 1)");
      expect(hexToRgba("#ff00aa", -0.5)).toBe("rgba(255, 0, 170, 0)");
    });

    it("should return black with alpha 1 for invalid hex", () => {
      expect(hexToRgba("#xyz")).toBe("rgba(0, 0, 0, 1)");
    });
  });

  describe("invalid inputs", () => {
    const consoleWarnSpy = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    afterAll(() => {
      consoleWarnSpy.mockRestore();
    });

    it("should warn for invalid hex in hexToRgb", () => {
      hexToRgb("#12345");
      expect(consoleWarnSpy).toHaveBeenCalledWith("Invalid hex color: #12345");
    });
  });
});
