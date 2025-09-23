import { StaffPage, metadata } from "@pages/staff";
import { renderWithProviders } from "@test-utils/renderer";

describe("StaffPage", () => {
  const render = () => {
    return renderWithProviders(<StaffPage />);
  };

  describe("UI", () => {
    it("renders correctly", () => {
      const { getByText } = render();

      expect(getByText("지도교수")).toBeInTheDocument();
      expect(getByText("감독")).toBeInTheDocument();
    });
  });

  describe("metadata", () => {
    it("returns correct metadata", async () => {
      expect(metadata.title).toBe("지도자 | 서울대 야구부");
    });
  });
});
