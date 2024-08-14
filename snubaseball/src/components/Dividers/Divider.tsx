import styled from "styled-components";

interface Props {
  color?: string;
}

export const Divider = styled.div<Props>`
  width: 100%;
  height: "1px";
  background-color: ${(props) => (props.color ? props.color : "#9e9e9e")};
`;
