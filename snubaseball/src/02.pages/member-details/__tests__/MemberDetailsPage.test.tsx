import { MemberDetailsPage, generateMetadata } from "@pages/member-details";
import { sampleManagerDetails, samplePlayerDetails } from "@entities/rosters";
import {
  getElementFromAsyncServerComponent,
  renderWithProviders,
} from "@test-utils/renderer";

describe("MemberDetailsPage", () => {
  const render = async () => {
    const elements = await getElementFromAsyncServerComponent(
      MemberDetailsPage,
      {
        params: Promise.resolve({ memberId: "1" }),
      }
    );

    return renderWithProviders(elements);
  };

  beforeAll(() => {
    global.fetch = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(samplePlayerDetails),
    });
  });

  describe("metadata", () => {
    it("returns correct metadata", async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ memberId: "1" }),
      });

      expect(metadata.title).toBe("홍길동 | SNU Baseball");
      expect(metadata.description).toBe("홍길동 선수의 프로필 페이지입니다.");
    });
  });

  describe("UI", () => {
    it("renders player correctly", async () => {
      const { getByText } = await render();

      expect(getByText("투수")).toBeInTheDocument();
    });

    it("renders player with missing info correctly", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          ...samplePlayerDetails,
          member: {
            ...samplePlayerDetails.member,
            profile_image: null,
            major: null,
            birth_date: null,
          },
          back_number: 0,
          position: "",
          hands: "",
          height: 0,
          weight: 0,
          goal: "",
        }),
      });

      const { getByText } = await render();

      expect(getByText("등번호")).toBeInTheDocument();
    });

    it("renders manager correctly", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(sampleManagerDetails),
      });

      await render();
    });

    it("handles fetch error correctly", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({ message: "Not Found" }),
      });

      expect(render()).rejects.toThrow(
        "데이터를 불러오는 중에 오류가 발생했습니다: Not Found"
      );
    });
  });
});
