import { ReactComponent as MenuIcon } from "./menu.svg";

interface Props {
  icon: string;
  size?: number;
  color?: string;
}

const iconMap: Record<
  string,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  menu: MenuIcon,
};

export const AppIcon = ({ icon, size = 24, color = "black" }: Props) => {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
};
