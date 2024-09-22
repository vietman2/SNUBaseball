import { Results } from "./Results";
import * as Hook from "@hooks/useWindowSize";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Game", () => ({
  GameSummary: () => <div>GameSummary</div>,
}));

describe("<Results />", () => {
  it("renders 4 columns", () => {
    jest
      .spyOn(Hook, "useWindowSize")
      .mockReturnValue({ width: 1920, height: 1000 });
    renderWithProviders(<Results onSelectGame={jest.fn()} />);
  });
  
  it("renders 3 columns", () => {
    jest
      .spyOn(Hook, "useWindowSize")
      .mockReturnValue({ width: 1440, height: 1000 });
    renderWithProviders(<Results onSelectGame={jest.fn()} />);
  });
  
  it("renders 2 columns", () => {
    jest
      .spyOn(Hook, "useWindowSize")
      .mockReturnValue({ width: 1024, height: 1000 });
    renderWithProviders(<Results onSelectGame={jest.fn()} />);
  });
  
  it("renders 1 column", () => {
    jest
      .spyOn(Hook, "useWindowSize")
      .mockReturnValue({ width: 768, height: 1000 });
    renderWithProviders(<Results onSelectGame={jest.fn()} />);
  });
});
