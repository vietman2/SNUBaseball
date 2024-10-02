import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Sidebar from "./Sidebar";
import { Topbar } from "./Topbar";
import { renderWithProviders } from "@utils/test-utils";

jest.unmock("@components/Navigation");

describe("<Sidebar />", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <Sidebar open={true} toggleSidebar={() => {}} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Home"));
    fireEvent.click(screen.getByText("소개"));
    fireEvent.click(screen.getByText("팀"));
    fireEvent.click(screen.getByText("일정"));
    fireEvent.click(screen.getByText("아카이브"));
    fireEvent.click(screen.getByText("문의"));
    fireEvent.click(screen.getByText("문의"));
  });

  it("should render closed", () => {
    render(
      <MemoryRouter>
        <Sidebar open={false} toggleSidebar={() => {}} />
      </MemoryRouter>
    );
  });
});

describe("<Topbar />", () => {
  it("should render", () => {
    renderWithProviders(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Home"));
    fireEvent.click(screen.getByText("소개"));
    fireEvent.click(screen.getByText("팀"));
    fireEvent.click(screen.getByText("일정"));
    fireEvent.click(screen.getByText("아카이브"));
    fireEvent.click(screen.getByText("문의"));
    fireEvent.mouseDown(document);
    fireEvent.click(screen.getByText("문의"));
    fireEvent.click(screen.getByText("FAQ"));
  });
});
