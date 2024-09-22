import styled from "styled-components";

import TeamLogo from "@assets/images/logo.png";

interface Props {
  size?: number;
}

export function MainLogo({ size = 80 }: Readonly<Props>) {
  return <Logo src={TeamLogo} size={size} alt="Main Logo" />;
}

const Logo = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
