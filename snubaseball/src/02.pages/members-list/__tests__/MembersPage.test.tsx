import { MembersPage, metadata } from "@pages/members-list";
import { sampleRoster } from "@entities/rosters";
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
      json: jest.fn().mockResolvedValue(sampleRoster),
    });
    // mock date to 2025-01-01
    jest.useFakeTimers().setSystemTime(new Date("2025-01-01"));
  });

  describe("UI", () => {
    it("renders correctly", async () => {
      const { getByText } = await render();

      expect(getByText("매니저")).toBeInTheDocument();
    });

    it("handles 2nd semester", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2025-09-01"));

      const { getByText } = await render();

      expect(getByText("매니저")).toBeInTheDocument();
    });

    it("handles fetch error", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValue({ message: "Error" }),
      });

      expect(render()).rejects.toThrow(
        "데이터를 불러오는 중에 오류가 발생했습니다: Error"
      );
    });
  });

  describe("metadata", () => {
    it("returns correct metadata", async () => {
      expect(metadata.title).toBe("선수 • 매니저 | 서울대 야구부");
    });
  });
});
