import { ReactComponent as CalendarIcon } from "./calendar.svg";
import { ReactComponent as CategoryIcon } from "./category.svg";
import { ReactComponent as ChatIcon } from "./chat.svg";
import { ReactComponent as ChevronDownIcon } from "./chevron-down.svg";
import { ReactComponent as ChevronLeftIcon } from "./chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "./chevron-right.svg";
import { ReactComponent as ChevronUpIcon } from "./chevron-up.svg";
import { ReactComponent as CloseIcon } from "./close.svg";
import { ReactComponent as EyeIcon } from "./eye.svg";
import { ReactComponent as ForumIcon } from "./forum.svg";
import { ReactComponent as GridIcon } from "./grid.svg";
import { ReactComponent as HeartOutlineIcon } from "./heart-outline.svg";
import { ReactComponent as HomeIcon } from "./home.svg";
import { ReactComponent as MenuIcon } from "./menu.svg";
import { ReactComponent as MoonIcon } from "./moon.svg";
import { ReactComponent as PeopleIcon } from "./people.svg";
import { ReactComponent as SunIcon } from "./sun.svg";
import { ReactComponent as TableIcon } from "./table.svg";
import { ReactComponent as TextIcon } from "./text.svg";

interface Props {
  icon: string;
  size: number;
  color: string;
}

const iconMap: Record<
  string,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  calendar: CalendarIcon,
  category: CategoryIcon,
  chat: ChatIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  "chevron-up": ChevronUpIcon,
  close: CloseIcon,
  eye: EyeIcon,
  forum: ForumIcon,
  grid: GridIcon,
  "heart-outline": HeartOutlineIcon,
  home: HomeIcon,
  menu: MenuIcon,
  moon: MoonIcon,
  people: PeopleIcon,
  sun: SunIcon,
  table: TableIcon,
  text: TextIcon,
};

export const AppIcon = ({ icon, size, color }: Props) => {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
};
