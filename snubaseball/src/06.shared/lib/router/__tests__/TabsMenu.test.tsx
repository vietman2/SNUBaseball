import { act, fireEvent } from "@testing-library/react";

import { TabsMenu } from "@shared/lib/router";
import { renderWithProviders } from "@test-utils/renderer";

describe("TabsMenu", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders and handles menu interactions", async () => {
    const { getByTestId } = renderWithProviders(<TabsMenu />);

    const hoverzone = getByTestId("tabs-menu-hoverzone");

    // A) open 예약 중(40ms) → 즉시 leave로 open 타이머 clear
    await act(async () => {
      fireEvent.mouseEnter(hoverzone);
      jest.advanceTimersByTime(40);
      fireEvent.mouseLeave(hoverzone);
    });

    // B) close 예약(120ms) 중 80ms 경과 후 다시 enter → close 타이머 clear
    await act(async () => {
      jest.advanceTimersByTime(80);
      fireEvent.mouseEnter(hoverzone);
    });

    // C) 다시 open 완료(>60ms)
    await act(async () => {
      jest.advanceTimersByTime(61);
    });

    // D) 마지막으로 close 완료(>120ms)
    await act(async () => {
      fireEvent.mouseLeave(hoverzone);
      jest.advanceTimersByTime(121);
    });
  });

  it("handles close menu (For coverage)", async () => {
    const { getByTestId } = renderWithProviders(<TabsMenu />);

    const hoverzone = getByTestId("tabs-menu-hoverzone");

    await act(async () => {
      // openT가 null일때
      fireEvent.mouseLeave(hoverzone);
    });
  });

  it("handles no mouse interactions", async () => {
    const { unmount } = renderWithProviders(<TabsMenu />);
    
    await act(async () => {
      unmount();
    });
  });
});
