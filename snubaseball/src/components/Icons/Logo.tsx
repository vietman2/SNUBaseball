import styled from "styled-components";

import LogoImage from "@assets/images/logo.png";

interface Props {
  size?: number;
}

export function Logo({ size = 40 }: Readonly<Props>) {
  return <Container size={size} src={LogoImage} alt="logo" />;
}

const Container = styled.img<Props>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
