import { MembersPage, metadata } from "@pages/members-list";
import { sampleMembers } from "@entities/members";
import {
  getElementFromAsyncServerComponent,
  renderWithProviders,
} from "@test-utils/renderer";

describe("MembersPage", () => {
  const render = async () => {
    const elements = await getElementFromAsyncServerComponent(MembersPage, {});

    return renderWithProviders(elements);
  };

  beforeAll(() => {
    global.fetch = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(sampleMembers),
    });
    // mock date to 2025-01-01
    jest.useFakeTimers().setSystemTime(new Date("2025-01-01"));
  });

  describe("UI", () => {
    it("renders correctly", async () => {
      const { getByText } = await render();

      expect(getByText("매니저")).toBeInTheDocument();
      expect(getByText("2025년 1학기 서울대 야구부"))
    });

    it("handles 2nd semester", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2025-09-01"));

      const { getByText } = await render();

      expect(getByText("2025년 2학기 서울대 야구부"));
    })

    it("handles fetch error", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue({ message: "Error" }),
      });
      
      expect(render()).rejects.toThrow("데이터를 불러오는 중에 오류가 발생했습니다: Error");
    });
  });

  describe("metadata", () => {
    it("returns correct metadata", async () => {
      expect(metadata.title).toBe("선수 • 매니저 | 서울대 야구부");
    });
  });
});
