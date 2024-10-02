import { ReactComponent as AboutIcon } from "./about.svg";
import { ReactComponent as ArchiveIcon } from "./archive.svg";
import { ReactComponent as BaseballIcon } from "./baseball.svg";
import { ReactComponent as BatIcon } from "./bat.svg";
import { ReactComponent as CalendarIcon } from "./calendar.svg";
import { ReactComponent as CheckboxIcon } from "./checkbox.svg";
import { ReactComponent as EventIcon } from "./event.svg";
import { ReactComponent as FieldIcon } from "./field.svg";
import { ReactComponent as GameIcon } from "./game.svg";
import { ReactComponent as GraduateIcon } from "./graduate.svg";
import { ReactComponent as HelmetIcon } from "./helmet.svg";
import { ReactComponent as HomeIcon } from "./home.svg";
import { ReactComponent as InterviewIcon } from "./interview.svg";
import { ReactComponent as ManagerIcon } from "./manager.svg";
import { ReactComponent as MenuIcon } from "./menu.svg";
import { ReactComponent as PlayerIcon } from "./player.svg";
import { ReactComponent as Question } from "./question.svg";
import { ReactComponent as RecordIcon } from "./record.svg";
import { ReactComponent as StaffIcon } from "./staff.svg";
import { ReactComponent as UserIcon } from "./user.svg";

interface Props {
  icon: string;
  size: number;
  color: string;
}

export const AppIcon = ({ icon, size, color }: Props) => {
  switch (icon) {
    case "about":
      return <AboutIcon width={size} height={size} color={color} />;
    case "archive":
      return <ArchiveIcon width={size} height={size} color={color} />;
    case "baseball":
      return <BaseballIcon width={size} height={size} color={color} />;
    case "bat":
      return <BatIcon width={size} height={size} color={color} />;
    case "calendar":
      return <CalendarIcon width={size} height={size} color={color} />;
    case "checkbox":
      return <CheckboxIcon width={size} height={size} color={color} />;
    case "event":
      return <EventIcon width={size} height={size} color={color} />;
    case "field":
      return <FieldIcon width={size} height={size} color={color} />;
    case "game":
      return <GameIcon width={size} height={size} color={color} />;
    case "graduate":
      return <GraduateIcon width={size} height={size} color={color} />;
    case "helmet":
      return <HelmetIcon width={size} height={size} color={color} />;
    case "home":
      return <HomeIcon width={size} height={size} color={color} />;
    case "interview":
      return <InterviewIcon width={size} height={size} color={color} />;
    case "manager":
      return <ManagerIcon width={size} height={size} color={color} />;
    case "menu":
      return <MenuIcon width={size} height={size} color={color} />;
    case "player":
      return <PlayerIcon width={size} height={size} color={color} />;
    case "question":
      return <Question width={size} height={size} color={color} />;
    case "record":
      return <RecordIcon width={size} height={size} color={color} />;
    case "staff":
      return <StaffIcon width={size} height={size} color={color} />;
    case "user":
      return <UserIcon width={size} height={size} color={color} />;
    default:
      return null;
  }
};
