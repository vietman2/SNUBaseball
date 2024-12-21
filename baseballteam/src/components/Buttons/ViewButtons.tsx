import styled from "styled-components";

import { AppIcon } from "@components/Icons";

type ButtonType = {
  label: string;
  icon: string;
};

interface Props {
  buttons: ButtonType[];
  selected: string;
  onClick: (button: string) => void;
}

export function ViewButtons({ buttons, selected, onClick }: Readonly<Props>) {
  return (
    <Container>
      {buttons.map((button) => (
        <Button
          key={button.icon}
          onClick={() => onClick(button.label)}
          style={{
            color: button.label === selected ? "#0B1623" : "#A1A1A1",
            borderBottom: `2px solid ${
              button.label === selected ? "#0B1623" : "transparent"
            }`,
          }}
        >
          <AppIcon
            icon={button.icon}
            size={20}
            color={button.label === selected ? "#0B1623" : "#A1A1A1"}
          />
          {button.label}
        </Button>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 4px;
`;
