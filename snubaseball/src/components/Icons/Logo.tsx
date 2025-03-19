import styled from "styled-components";

import { mainLogoUrl } from "@data/images";

interface Props {
  size?: number;
}

export function Logo({ size = 40 }: Readonly<Props>) {
  return <Container size={size} src={mainLogoUrl} alt="logo" />;
}

const Container = styled.img<Props>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
