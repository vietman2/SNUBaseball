import { render } from "@testing-library/react";

import { SimpleTable, TableRow } from "./SimpleTable";

describe("<Table />", () => {
  it("should render", () => {
    render(
      <SimpleTable>
        <TableRow left="left" right="right" />
      </SimpleTable>
    );
  });
});
