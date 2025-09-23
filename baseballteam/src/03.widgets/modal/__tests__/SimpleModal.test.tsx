import { describe, expect, it } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { SimpleModal, useSimpleModal } from "@widgets/modal";
import { renderWithProviders } from "@test-utils/renderer";

const ModalTestComponent = () => {
  const { isOpen, open, close, toggle } = useSimpleModal();

  return (
    <>
      <button type="button" onClick={open} data-testid="open-button">
        Open Modal
      </button>
      <button type="button" onClick={toggle} data-testid="toggle-button">
        Toggle Modal
      </button>
      <SimpleModal isOpen={isOpen} onClose={close}>
        <h2>Modal Title</h2>
        <p>This is a simple modal content.</p>
        <button type="button" onClick={close} data-testid="close-button">
          Close Modal
        </button>
      </SimpleModal>
    </>
  );
};

describe("SimpleModal", () => {
  it("모달이 열리고 닫히는지 확인", async () => {
    const { getByTestId, queryByTestId } = renderWithProviders(
      <ModalTestComponent />
    );

    // 모달이 처음에는 닫혀있는지 확인
    await waitFor(() => {
      expect(queryByTestId("modal-overlay")).toBeNull();
      expect(queryByTestId("modal-dialog")).toBeNull();
    });

    // 모달 열기 버튼 클릭
    fireEvent.click(getByTestId("open-button"));

    // 모달이 열렸는지 확인
    await waitFor(() => {
      expect(getByTestId("modal-overlay")).toBeInTheDocument();
      expect(getByTestId("modal-dialog")).toBeInTheDocument();
    });

    // 모달 닫기 버튼 클릭
    fireEvent.click(getByTestId("close-button"));

    // 모달이 닫혔는지 확인
    await waitFor(() => {
      expect(queryByTestId("modal-overlay")).toBeNull();
      expect(queryByTestId("modal-dialog")).toBeNull();
    });
  });

  it("모달 외부 클릭 시 모달이 닫히는지 확인", async () => {
    const { getByTestId, queryByTestId } = renderWithProviders(
      <ModalTestComponent />
    );

    // 모달 토글 버튼 클릭
    fireEvent.click(getByTestId("toggle-button"));

    // 모달이 열렸는지 확인
    await waitFor(() => {
      expect(getByTestId("modal-overlay")).toBeInTheDocument();
      expect(getByTestId("modal-dialog")).toBeInTheDocument();
    });

    // 모달 외부(오버레이) 클릭
    fireEvent.mouseDown(getByTestId("modal-overlay"));

    // 모달이 닫혔는지 확인
    await waitFor(() => {
      expect(queryByTestId("modal-overlay")).toBeNull();
      expect(queryByTestId("modal-dialog")).toBeNull();
    });

    // 모달 토글 버튼 클릭
    fireEvent.click(getByTestId("toggle-button"));

    // 모달이 열렸는지 확인
    await waitFor(() => {
      expect(getByTestId("modal-overlay")).toBeInTheDocument();
      expect(getByTestId("modal-dialog")).toBeInTheDocument();
    });

    // 모달 내부(다이얼로그) 클릭
    fireEvent.mouseDown(getByTestId("modal-dialog"));

    // 모달이 여전히 열려있는지 확인
    await waitFor(() => {
      expect(getByTestId("modal-overlay")).toBeInTheDocument();
      expect(getByTestId("modal-dialog")).toBeInTheDocument();
    });
  });
});
