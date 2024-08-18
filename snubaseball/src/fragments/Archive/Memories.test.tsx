import { render, waitFor } from "@testing-library/react";

import { Memories } from "./Memories";
import * as ImageAPI from "@services/archive/images";

describe("<Memories />", () => {
  it("should render", async () => {
    jest.spyOn(ImageAPI, "getImages").mockResolvedValue({
      status: 200,
      data: [
        {
          id: 1,
          title: "title",
          file: "file",
        },
      ],
    });

    waitFor(() => render(<Memories />));
  });

  it("should handle fetch fail", () => {
    jest.spyOn(ImageAPI, "getImages").mockResolvedValue({
      status: 400,
      data: {},
    });

    waitFor(() => render(<Memories />));
  });
});
