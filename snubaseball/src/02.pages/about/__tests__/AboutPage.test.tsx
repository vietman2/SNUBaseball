import { AboutPage, metadata } from "@pages/about";
import { renderWithProviders } from "@test-utils/renderer";

describe("AboutPage", () => {
  describe("UI", () => {
    it("should render AboutPage correctly", () => {
      const { container } = renderWithProviders(<AboutPage />);
      expect(container).toMatchSnapshot();
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
