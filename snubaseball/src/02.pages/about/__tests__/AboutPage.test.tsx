import { AboutPage, metadata } from "@pages/about";
import { renderWithProviders } from "@test-utils/renderer";

describe("AboutPage", () => {
  describe("UI", () => {
    it("should render AboutPage correctly", () => {
      const { getByText } = renderWithProviders(<AboutPage />);
      expect(getByText("서울대 야구부에 대하여")).toBeInTheDocument();
    });
  });

  describe("metadata", () => {
    it("should have correct metadata", () => {
      expect(metadata).toEqual({
        title: "팀 소개 - 서울대 야구부",
        description: "서울대 야구부에 대하여",
      });
    });
  });
});
