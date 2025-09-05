import Archive from "./files/archive.svg?react";
import Checklist from "./files/checklist.svg?react";
import ChevronDown from "./files/chevron-down.svg?react";
import ChevronLeft from "./files/chevron-left.svg?react";
import ChevronRight from "./files/chevron-right.svg?react";
import ChevronUp from "./files/chevron-up.svg?react";
import Close from "./files/close.svg?react";
import Diary from "./files/diary.svg?react";
import Forum from "./files/forum.svg?react";
import Home from "./files/home.svg?react";
import InfoCircle from "./files/info-circle.svg?react";
import Logout from "./files/logout.svg?react";
import Management from "./files/management.svg?react";
import Menu from "./files/menu.svg?react";
import Money from "./files/money.svg?react";
import Moon from "./files/moon.svg?react";
import Pencil from "./files/pencil.svg?react";
import Person from "./files/person.svg?react";
import Player from "./files/player.svg?react";
import Record from "./files/record.svg?react";
import Sun from "./files/sun.svg?react";

interface Props {
  icon: string;
  size?: number;
  color?: string;
}

const iconMap: Record<
  string,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  archive: Archive,
  checklist: Checklist,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  close: Close,
  diary: Diary,
  forum: Forum,
  home: Home,
  "info-circle": InfoCircle,
  logout: Logout,
  management: Management,
  menu: Menu,
  money: Money,
  moon: Moon,
  pencil: Pencil,
  person: Person,
  player: Player,
  record: Record,
  sun: Sun,
};

export function AppIcon({ icon, size = 24, color = "black" }: Readonly<Props>) {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    console.error(`Icon "${icon}" not found.`);
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
}
