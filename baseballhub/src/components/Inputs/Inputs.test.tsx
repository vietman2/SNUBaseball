import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContentInput } from "./ContentInput";
import { DateInput } from "./DateInput";
import { TextInput } from "./TextInput";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("react-quill", () => {
  const { forwardRef } = jest.requireActual("react");

  const Component = forwardRef(
    (
      {
        modules,
      }: {
        modules: {
          toolbar: { handlers: { image: () => void } };
        };
      },
      ref: React.RefObject<HTMLDivElement>
    ) => {
      return (
        <div ref={ref} data-testid="quill">
          <button onClick={() => modules.toolbar.handlers.image()}>
            Insert Image
          </button>
        </div>
      );
    }
  );

  return {
    __esModule: true,
    default: Component,
  };
});
jest.mock("react-quill/dist/quill.snow.css", () => {
  return {};
});
jest.unmock("@components/Inputs");

describe("<ContentInput />", () => {
  it("should render without crashing and handles image upload", async () => {
    const mockUploadImage = jest.fn();
    mockUploadImage.mockResolvedValue({ status: 201, data: { image: "" } });

    jest.spyOn(React, "useRef").mockImplementation(() => ({
      current: {
        getEditor: jest.fn().mockReturnValue({
          getSelection: jest.fn().mockReturnValue({ index: 0 }),
          insertEmbed: jest.fn(),
        }),
      },
    }));
    renderWithProviders(<ContentInput setContent={jest.fn()} uploadImage={mockUploadImage} />);

    const originalCreateElement = document.createElement;
    const mockInput = document.createElement("input");
    mockInput.setAttribute("type", "file");
    mockInput.setAttribute("accept", "image/*");

    jest.spyOn(document, "createElement").mockImplementation((tagName) => {
      if (tagName === "input") {
        return mockInput;
      }
      return originalCreateElement(tagName);
    });

    await waitFor(() => fireEvent.click(screen.getByText("Insert Image")));

    // Mock the file input and simulate a file being selected
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    await waitFor(() =>
      fireEvent.change(mockInput, { target: { files: [file] } })
    );

    // Restore the original document.createElement
    document.createElement = originalCreateElement;
  });
  
  it("should handles image fail", async () => {
    const mockUploadImage = jest.fn();
    mockUploadImage.mockResolvedValue(null);

    jest.spyOn(React, "useRef").mockReturnValue({
      current: {},
    });
    renderWithProviders(
      <ContentInput setContent={jest.fn()} uploadImage={mockUploadImage} />
    );

    const originalCreateElement = document.createElement;
    const mockInput = document.createElement("input");
    mockInput.setAttribute("type", "file");
    mockInput.setAttribute("accept", "image/*");

    jest.spyOn(document, "createElement").mockImplementation((tagName) => {
      if (tagName === "input") {
        return mockInput;
      }
      return originalCreateElement(tagName);
    });

    await waitFor(() => fireEvent.click(screen.getByText("Insert Image")));

    // Mock the file input and simulate a file being selected
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    await waitFor(() =>
      fireEvent.change(mockInput, { target: { files: [file] } })
    );

    // Restore the original document.createElement
    document.createElement = originalCreateElement;
  });
});

describe("<DateInput />", () => {
  it("should render", () => {
    renderWithProviders(
      <DateInput label="Test" value="2021-01-01" onChange={jest.fn()} />
    );

    fireEvent.change(screen.getByTestId("date-input"), {
      target: { value: "2021-01-02" },
    });
  });
});

describe("<TextInput />", () => {
  it("should render", () => {
    renderWithProviders(
      <TextInput placeholder="Test" value="test" onChange={jest.fn()} />
    );

    fireEvent.change(screen.getByTestId("text-input"), {
      target: { value: "test2" },
    });
  });

  it("should render password", () => {
    renderWithProviders(
      <TextInput
        placeholder="Test"
        value="test"
        password
        onChange={jest.fn()}
      />
    );
  });

  it("should render wide", () => {
    renderWithProviders(
      <TextInput placeholder="Test" value="test" wide onChange={jest.fn()} />
    );

    fireEvent.change(screen.getByTestId("text-input"), {
      target: { value: "test2" },
    });
  });

  it("should render disabled", () => {
    renderWithProviders(
      <TextInput
        placeholder="Test"
        value="test"
        wide
        password
        onChange={jest.fn()}
      />
    );
  });
});
