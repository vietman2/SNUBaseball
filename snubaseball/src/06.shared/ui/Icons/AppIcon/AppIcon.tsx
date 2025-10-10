"use client";

import ChevronLeft from "./files/chevron-left.svg";
import ChevronRight from "./files/chevron-right.svg";
import Close from "./files/close.svg";
import Menu from "./files/menu.svg";
import Play from "./files/play.svg";

interface Props {
  icon: string;
  size?: number;
  color?: string;
}

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  close: Close,
  menu: Menu,
  play: Play,
};

export function AppIcon({
  icon,
  size = 24,
  color = "#E2E2E2",
}: Readonly<Props>) {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    console.warn(`AppIcon: No icon found for name "${icon}"`);

    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
}
