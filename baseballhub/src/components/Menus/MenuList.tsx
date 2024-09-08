import styled from "styled-components";

interface Props {
  menuitems: string[];
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  submenuitems: string[];
  selectedSubmenu: string;
  setSelectedSubmenu: (submenu: string) => void;
}

export function MenuList({ menuitems, selectedMenu, setSelectedMenu, submenuitems, selectedSubmenu, setSelectedSubmenu }: Props) {
  return (
    <Container selected={selectedMenu !== ""}>
      <Menu main>
        <MenuTitle>기술</MenuTitle>
        {menuitems.map((menu, index) => (
          <MenuItem
            key={index}
            selected={selectedMenu === menu}
            onClick={() => setSelectedMenu(menu)}
          >
            {menu}
          </MenuItem>
        ))}
      </Menu>
      {selectedMenu !== "" && (
        <Menu>
          <MenuTitle>세부</MenuTitle>
          {submenuitems.map((submenu, index) => (
            <MenuItem
              key={index}
              selected={selectedSubmenu === submenu}
              onClick={() => setSelectedSubmenu(submenu)}
            >
              {submenu}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Container>
  );
}

const Container = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  width: ${(props) => (props.selected ? "17.5vw" : "10vw")};
  height: 100%;
  background-color: white;
`;

const Menu = styled.div<{ main?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => (props.main ? "10vw" : "7.5vw")};
  height: 100%;
  font-weight: bold;
  border-right: 1px solid #e0e0e0;
`;

const MenuTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5vh;
  font-weight: bold;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
`;

const MenuItem = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3vh;
  background-color: ${(props) => (props.selected ? "#f0f0f0" : "white")};
  border-bottom: 1px solid #e0e0e0;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  cursor: pointer;
`;
