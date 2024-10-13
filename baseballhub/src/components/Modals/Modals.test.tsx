import { MobileModal } from "./MobileModal";
import { SimpleModal } from "./SimpleModal";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Modals");

describe("<MobileModal />", () => {
  it("renders children when isOpen is true", () => {
    renderWithProviders(
      <MobileModal isOpen onClose={jest.fn()}>
        <div>Test</div>
      </MobileModal>
    );
  });

  it("does not render children when isOpen is false", () => {
    renderWithProviders(
      <MobileModal isOpen={false} onClose={jest.fn()}>
        <div>Test</div>
      </MobileModal>
    );
  });
});

describe("<SimpleModal />", () => {
  it("renders children when isOpen is true", () => {
    renderWithProviders(
      <SimpleModal isOpen onClose={jest.fn()}>
        <div>Test</div>
      </SimpleModal>
    );
  });

  it("does not render children when isOpen is false", () => {
    renderWithProviders(
      <SimpleModal isOpen={false} onClose={jest.fn()}>
        <div>Test</div>
      </SimpleModal>
    );
  });
});
