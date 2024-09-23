import { Bases } from "./Bases";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Bases");

describe("<Bases />", () => {
  it("should render without crashing", () => {
    renderWithProviders(
      <>
        <Bases first={true} second={true} third={true} />
        <Bases first={false} second={false} third={false} />
      </>
    );
  });
});
