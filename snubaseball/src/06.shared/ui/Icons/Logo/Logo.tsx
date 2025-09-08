import Image from "next/image";

interface Props {
  size?: number;
}

export function Logo({ size = 100 }: Readonly<Props>) {
  return (
    <Image
      src="https://cdn.snubaseball.co.kr/images/logo.png"
      alt="Logo"
      width={size}
      height={size}
    />
  );
}
