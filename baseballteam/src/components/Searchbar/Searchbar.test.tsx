import { fireEvent, screen } from "@testing-library/react";

import { Searchbar } from "./Searchbar";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Searchbar");

describe("<Searchbar />", () => {
  it("renders correctly and handles input change", () => {
    renderWithProviders(<Searchbar query="" setQuery={jest.fn()} />);

    fireEvent.change(screen.getByTestId("searchbar"), {
      target: { value: "test" },
    });
  });
});
