import { fireEvent, render, screen } from "@testing-library/react";

import { MenuList } from "./MenuList";

describe("<MenuList />", () => {
  it("should render unselected menu", () => {
    render(
      <MenuList
        menuitems={["코딩", "프로젝트", "포트폴리오"]}
        selectedMenu=""
        setSelectedMenu={jest.fn()}
        submenuitems={["React", "Node.js", "TypeScript"]}
        selectedSubmenu=""
        setSelectedSubmenu={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("코딩"));
  });
  
  it("should render selected menu", () => {
    render(
      <MenuList
        menuitems={["코딩", "프로젝트", "포트폴리오"]}
        selectedMenu="코딩"
        setSelectedMenu={jest.fn()}
        submenuitems={["React", "Node.js", "TypeScript"]}
        selectedSubmenu="React"
        setSelectedSubmenu={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Node.js"));
    fireEvent.click(screen.getByText("프로젝트"));
  });
});
