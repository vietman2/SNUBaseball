import styled from "styled-components";

import TeamLogoBlue from "@assets/images/logo_blue_plain.png";
import TeamLogoWhite from "@assets/images/logo_white2_plain.png";

interface Props {
  size?: number;
  color?: "blue" | "white";
}

export function MainLogo({ size = 80, color = "blue" }: Readonly<Props>) {
  if (color === "white")
    return <Logo src={TeamLogoWhite} size={size} alt="Main Logo" />;
  else return <Logo src={TeamLogoBlue} size={size} alt="Main Logo" />;
}

const Logo = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
