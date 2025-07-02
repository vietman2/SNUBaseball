import TeamLogoBlue from "./files/logo_blue_plain.png";
import TeamLogoWhite from "./files/logo_white_plain.png";

interface Props {
  size?: number;
  color?: "blue" | "white";
}

export function MainLogo({ size = 80, color = "blue" }: Readonly<Props>) {
  return (
    <img
      src={color === "blue" ? TeamLogoBlue : TeamLogoWhite}
      alt="서울대학교 야구부"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
