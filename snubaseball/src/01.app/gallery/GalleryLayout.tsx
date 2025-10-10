import { ReactNode } from "react";
import Image from "next/image";

import { LayoutContainer, ImageHeader } from "@widgets/layout-templates";

interface Props {
  children: ReactNode;
}

export function GalleryLayout({ children }: Readonly<Props>) {
  return (
    <LayoutContainer>
      <ImageHeader>
        <Image
          src="https://cdn.snubaseball.co.kr/images/Main4.JPG"
          alt="team"
          fill
          priority
        />
        <div className="overlay-text">서울대 야구부 갤러리</div>
      </ImageHeader>
      {children}
    </LayoutContainer>
  );
}
