import { fireEvent, render, screen } from "@testing-library/react";

import { NewMemberModal } from "@components/Modals";

jest.unmock("@components/Modals");

describe("<NewMemberModal />", () => {
  it("renders correctly and handles image change", () => {
    render(
      <NewMemberModal
        colleges={[]}
        isOpen={true}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("닫기"));
    fireEvent.change(screen.getByTestId("image-change"), {
      target: {
        files: [new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" })],
      },
    });
  });

  it("handles null image", () => {
    render(
      <NewMemberModal
        colleges={[]}
        isOpen={true}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />
    );

    fireEvent.change(screen.getByTestId("image-change"), {
      target: {
        files: null,
      },
    });
  });

  it("handles submit success", () => {
    render(
      <NewMemberModal
        colleges={[]}
        isOpen={true}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("추가"));
  });
});
