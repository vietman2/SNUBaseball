import { ReactComponent as AddIcon } from "./add.svg";
import { ReactComponent as AdminIcon } from "./admin.svg";
import { ReactComponent as ArchiveIcon } from "./archive.svg";
import { ReactComponent as BaseballIcon } from "./baseball.svg";
import { ReactComponent as CalendarIcon } from "./calendar.svg";
import { ReactComponent as CheckIcon } from "./check.svg";
import { ReactComponent as ChevronDownIcon } from "./chevron-down.svg";
import { ReactComponent as ChevronLeftIcon } from "./chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "./chevron-right.svg";
import { ReactComponent as ChevronUpIcon } from "./chevron-up.svg";
import { ReactComponent as CloseIcon } from "./close.svg";
import { ReactComponent as DiaryIcon } from "./diary.svg";
import { ReactComponent as DownIcon } from "./down.svg";
import { ReactComponent as FeedbackIcon } from "./feedback.svg";
import { ReactComponent as FieldIcon } from "./field.svg";
import { ReactComponent as ForumIcon } from "./forum.svg";
import { ReactComponent as GalleryIcon } from "./gallery.svg";
import { ReactComponent as GuideIcon } from "./guide.svg";
import { ReactComponent as HomeIcon } from "./home.svg";
import { ReactComponent as LightBulbIcon } from "./lightbulb.svg";
import { ReactComponent as MenuIcon } from "./menu.svg";
import { ReactComponent as PeopleIcon } from "./people.svg";
import { ReactComponent as PersonIcon } from "./person.svg";
import { ReactComponent as RecordIcon } from "./record.svg";
import { ReactComponent as StorageIcon } from "./storage.svg";

interface Props {
  icon: string;
  size: number;
  color: string;
}

export const AppIcon = ({ icon, size, color }: Props) => {
  switch (icon) {
    case "add":
      return <AddIcon width={size} height={size} color={color} />;
    case "admin":
      return <AdminIcon width={size} height={size} color={color} />;
    case "archive":
      return <ArchiveIcon width={size} height={size} color={color} />;
    case "baseball":
      return <BaseballIcon width={size} height={size} color={color} />;
    case "calendar":
      return <CalendarIcon width={size} height={size} color={color} />;
    case "check":
      return <CheckIcon width={size} height={size} color={color} />;
    case "chevron-down":
      return <ChevronDownIcon width={size} height={size} color={color} />;
    case "chevron-left":
      return <ChevronLeftIcon width={size} height={size} color={color} />;
    case "chevron-right":
      return <ChevronRightIcon width={size} height={size} color={color} />;
    case "chevron-up":
      return <ChevronUpIcon width={size} height={size} color={color} />;
    case "close":
      return <CloseIcon width={size} height={size} color={color} />;
    case "diary":
      return <DiaryIcon width={size} height={size} color={color} />;
    case "down":
      return <DownIcon width={size} height={size} color={color} />;
    case "feedback":
      return <FeedbackIcon width={size} height={size} color={color} />;
    case "field":
      return <FieldIcon width={size} height={size} color={color} />;
    case "forum":
      return <ForumIcon width={size} height={size} color={color} />;
    case "gallery":
      return <GalleryIcon width={size} height={size} color={color} />;
    case "guide":
      return <GuideIcon width={size} height={size} color={color} />;
    case "home":
      return <HomeIcon width={size} height={size} color={color} />;
    case "lightbulb":
      return <LightBulbIcon width={size} height={size} color={color} />;
    case "menu":
      return <MenuIcon width={size} height={size} color={color} />;
    case "people":
      return <PeopleIcon width={size} height={size} color={color} />;
    case "person":
      return <PersonIcon width={size} height={size} color={color} />;
    case "record":
      return <RecordIcon width={size} height={size} color={color} />;
    case "storage":
      return <StorageIcon width={size} height={size} color={color} />;
    default:
      return null;
  }
};
