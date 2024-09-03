import { ReactComponent as AddIcon } from "./add.svg";
import { ReactComponent as AdminIcon } from "./admin.svg";
import { ReactComponent as ArchiveIcon } from "./archive.svg";
import { ReactComponent as CalendarIcon } from "./calendar.svg";
import { ReactComponent as ChevronLeftIcon } from "./chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "./chevron-right.svg";
import { ReactComponent as DiaryIcon } from "./diary.svg";
import { ReactComponent as HomeIcon } from "./home.svg";
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
    case "calendar":
      return <CalendarIcon width={size} height={size} color={color} />;
    case "chevron-left":
      return <ChevronLeftIcon width={size} height={size} color={color} />;
    case "chevron-right":
      return <ChevronRightIcon width={size} height={size} color={color} />;
    case "diary":
      return <DiaryIcon width={size} height={size} color={color} />;
    case "home":
      return <HomeIcon width={size} height={size} color={color} />;
    case "record":
      return <RecordIcon width={size} height={size} color={color} />;
    case "storage":
      return <StorageIcon width={size} height={size} color={color} />;
    default:
      return null;
  }
};
