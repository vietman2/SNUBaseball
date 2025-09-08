import { act, fireEvent } from "@testing-library/react";

import { HomePage } from "@pages/home";
import {
  getElementFromAsyncServerComponent,
  renderWithProviders,
} from "@test-utils/renderer";

describe("HomePage", () => {
  const render = async () => {
    const elements = await getElementFromAsyncServerComponent(HomePage, {});

    return renderWithProviders(elements);
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("handles timeout", async () => {
    const { getByTestId, getByText } = await render();

    expect(
      getByText("서울대학교 야구부에 오신 것을 환영합니다")
    ).toBeInTheDocument();

    // 클릭 테스트
    act(() => {
      fireEvent.click(getByTestId("right"));
      fireEvent.click(getByTestId("left"));
      fireEvent.click(getByTestId("left"));
      fireEvent.click(getByTestId("right"));
    });

    // 타임아웃 테스트
    await act(async () => {
      jest.advanceTimersByTime(5000 * 4 + 1);
    });
  });

  it("handles null ref", async () => {
    jest
      .spyOn(window, "setInterval")
      .mockReturnValue(null as unknown as ReturnType<typeof setInterval>)

    const clearSpy = jest.spyOn(window, "clearInterval");

    const { getByTestId, unmount } = await render();

    act(() => {
      fireEvent.click(getByTestId("right")); // goToNext -> resetInterval (if(false))
    });
    expect(clearSpy).not.toHaveBeenCalled();

    unmount();
  });
});
