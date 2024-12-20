import { ReactComponent as ChevronDownIcon } from "./chevron-down.svg";
import { ReactComponent as ChevronLeftIcon } from "./chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "./chevron-right.svg";
import { ReactComponent as ChevronUpIcon } from "./chevron-up.svg";
import { ReactComponent as CloseIcon } from "./close.svg";
import { ReactComponent as ForumIcon } from "./forum.svg";
import { ReactComponent as HomeIcon } from "./home.svg";
import { ReactComponent as MenuIcon } from "./menu.svg";
import { ReactComponent as MoonIcon } from "./moon.svg";
import { ReactComponent as SunIcon } from "./sun.svg";

interface Props {
  icon: string;
  size: number;
  color: string;
}

const iconMap: Record<
  string,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  close: CloseIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  "chevron-up": ChevronUpIcon,
  forum: ForumIcon,
  home: HomeIcon,
  menu: MenuIcon,
  moon: MoonIcon,
  sun: SunIcon,
};

export const AppIcon = ({ icon, size, color }: Props) => {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
};
