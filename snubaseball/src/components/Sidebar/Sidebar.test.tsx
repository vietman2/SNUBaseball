import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Sidebar from "./Sidebar";

jest.unmock("@components/Sidebar");

describe("<Sidebar />", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <Sidebar open={true} toggleSidebar={() => {}} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("로고"));
    fireEvent.click(screen.getByText("로그인"));
    fireEvent.click(screen.getByText("회원가입"));
    fireEvent.click(screen.getByText("소개"));
    fireEvent.click(screen.getByText("일정"));
    fireEvent.click(screen.getByText("아카이브"));
    fireEvent.click(screen.getByText("사이트맵"));
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
