import styled from "styled-components";

interface Props {
  color?: string;
  bold?: boolean;
}

export const Divider = styled.div<Props>`
  width: 100%;
  height: ${(props) => (props.bold ? "2px" : "1px")};
  background-color: ${(props) => (props.color ? props.color : "#9e9e9e")};
`;
