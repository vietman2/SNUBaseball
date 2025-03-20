import { ReactComponent as BaseballIcon } from "./baseball.svg";
import { ReactComponent as ChevronLeftIcon } from "./chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "./chevron-right.svg";
import { ReactComponent as EventIcon } from "./event.svg";
import { ReactComponent as GraduationIcon } from "./graduation.svg";
import { ReactComponent as MenuIcon } from "./menu.svg";
import { ReactComponent as QuoteEndIcon } from "./quote-end.svg";
import { ReactComponent as QuoteStartIcon } from "./quote-start.svg";
import { ReactComponent as ResultsIcon } from "./results.svg";

interface Props {
  icon: string;
  size?: number;
  color?: string;
}

const iconMap: Record<
  string,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  baseball: BaseballIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  event: EventIcon,
  graduation: GraduationIcon,
  menu: MenuIcon,
  "quote-end": QuoteEndIcon,
  "quote-start": QuoteStartIcon,
  results: ResultsIcon,
};

export const AppIcon = ({ icon, size = 24, color = "black" }: Props) => {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
};
