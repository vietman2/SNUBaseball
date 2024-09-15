import { fireEvent, render, screen } from "@testing-library/react";

import { Tabs } from "./Tabs";

jest.unmock("@components/Tabs");

describe("<Tabs />", () => {
  it("should render", () => {
    render(
      <Tabs tabs={["Tab1", "Tab2"]} activeTab="Tab1" setActiveTab={jest.fn()} />
    );

    fireEvent.click(screen.getByTestId("Tab2"));
  });
});
