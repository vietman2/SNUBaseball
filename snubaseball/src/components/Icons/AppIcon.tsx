import { ReactComponent as MenuIcon } from "./menu.svg";
import { ReactComponent as UserIcon } from "./user.svg";

interface Props {
  icon: string;
  size: number;
  color: string;
}

export const AppIcon = ({ icon, size, color }: Props) => {
  switch (icon) {
    case "menu":
      return <MenuIcon width={size} height={size} color={color} />;
    case "user":
      return <UserIcon width={size} height={size} color={color} />;
    default:
      return null;
  }
};
