import Image from "next/image";

import { useColors } from "@shared/lib/styled-components";

interface Props {
  size?: number;
}

export function Logo({ size = 100 }: Readonly<Props>) {
  const { isDarkMode } = useColors();

  if (isDarkMode) {
    return (
      <Image
        src="https://cdn.snubaseball.co.kr/images/logo_silver.png"
        alt="Silver Logo"
        width={size}
        height={size}
      />
    );
  }

  return (
    <Image
      src="https://cdn.snubaseball.co.kr/images/logo_blue.png"
      alt="Logo"
      width={size}
      height={size}
    />
  );
}
