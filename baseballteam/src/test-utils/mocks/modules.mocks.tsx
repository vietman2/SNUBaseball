/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";

const __bcListeners = new Set<(e: MessageEvent) => void>();
vi.stubGlobal(
  "BroadcastChannel",
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    addEventListener(type: string, cb: (e: MessageEvent) => void) {
      if (type === "message") __bcListeners.add(cb);
    }
    removeEventListener(type: string, cb: (e: MessageEvent) => void) {
      if (type === "message") __bcListeners.delete(cb);
    }
    postMessage(data: any) {
      const evt = { data } as MessageEvent;
      __bcListeners.forEach((cb) => cb(evt));
    }
    close() {
      /* no-op for test purposes */
    }
  } as any
);
vi.mock("axios", async () => {
  const actual = await vi.importActual("axios");
  return {
    ...actual,
    isAxiosError: vi.fn().mockReturnValue(true),
  };
});
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");

  return {
    ...actual,
    Outlet: () => <div>Mocked Outlet</div>,
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
    useLocation: vi.fn().mockReturnValue({ pathname: "/home" }),
  };
});
