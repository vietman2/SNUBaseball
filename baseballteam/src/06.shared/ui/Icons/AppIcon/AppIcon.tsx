import ChevronDown from "./files/chevron-down.svg?react";
import ChevronLeft from "./files/chevron-left.svg?react";
import ChevronRight from "./files/chevron-right.svg?react";
import ChevronUp from "./files/chevron-up.svg?react";
import Diary from "./files/diary.svg?react";
import Equipment from "./files/equipment.svg?react";
import Feedback from "./files/feedback.svg?react";
import Forum from "./files/forum.svg?react";
import Gallery from "./files/gallery.svg?react";
import Grid from "./files/grid.svg?react";
import Home from "./files/home.svg?react";
import Image from "./files/image.svg?react";
import InfoCircle from "./files/info-circle.svg?react";
import List from "./files/list.svg?react";
import Lock from "./files/lock.svg?react";
import Logout from "./files/logout.svg?react";
import Management from "./files/management.svg?react";
import Money from "./files/money.svg?react";
import Moon from "./files/moon.svg?react";
import Pencil from "./files/pencil.svg?react";
import People from "./files/people.svg?react";
import Person from "./files/person.svg?react";
import Player from "./files/player.svg?react";
import Plus from "./files/plus.svg?react";
import Record from "./files/record.svg?react";
import SidebarClose from "./files/sidebar-close.svg?react";
import SidebarOpen from "./files/sidebar-open.svg?react";
import Sun from "./files/sun.svg?react";
import Video from "./files/video.svg?react";

interface Props {
  icon: string;
  size?: number;
  color?: string;
}

const iconMap: Record<
  string,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  diary: Diary,
  equipment: Equipment,
  feedback: Feedback,
  forum: Forum,
  gallery: Gallery,
  grid: Grid,
  home: Home,
  image: Image,
  "info-circle": InfoCircle,
  list: List,
  lock: Lock,
  logout: Logout,
  management: Management,
  money: Money,
  moon: Moon,
  pencil: Pencil,
  people: People,
  person: Person,
  player: Player,
  plus: Plus,
  record: Record,
  "sidebar-close": SidebarClose,
  "sidebar-open": SidebarOpen,
  sun: Sun,
  video: Video,
};

export function AppIcon({ icon, size = 24, color = "black" }: Readonly<Props>) {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    console.error(`Icon "${icon}" not found.`);
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
}
