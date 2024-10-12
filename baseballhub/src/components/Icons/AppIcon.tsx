import { ReactComponent as AddIcon } from "./add.svg";
import { ReactComponent as AdminIcon } from "./admin.svg";
import { ReactComponent as ArchiveIcon } from "./archive.svg";
import { ReactComponent as BaseballIcon } from "./baseball.svg";
import { ReactComponent as BaseballIcon2 } from "./baseball2.svg";
import { ReactComponent as CalendarIcon } from "./calendar.svg";
import { ReactComponent as ChatIcon } from "./chat.svg";
import { ReactComponent as CheckIcon } from "./check.svg";
import { ReactComponent as ChecklistIcon } from "./checklist.svg";
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
import { ReactComponent as HeartIcon } from "./heart.svg";
import { ReactComponent as HomeIcon } from "./home.svg";
import { ReactComponent as LightBulbIcon } from "./lightbulb.svg";
import { ReactComponent as LikeIcon } from "./like.svg";
import { ReactComponent as LockIcon } from "./lock.svg";
import { ReactComponent as MenuIcon } from "./menu.svg";
import { ReactComponent as MoonIcon } from "./moon.svg";
import { ReactComponent as PeopleIcon } from "./people.svg";
import { ReactComponent as PersonIcon } from "./person.svg";
import { ReactComponent as PlusIcon } from "./plus.svg";
import { ReactComponent as RecordIcon } from "./record.svg";
import { ReactComponent as StorageIcon } from "./storage.svg";
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
  add: AddIcon,
  admin: AdminIcon,
  archive: ArchiveIcon,
  baseball: BaseballIcon,
  baseball2: BaseballIcon2,
  calendar: CalendarIcon,
  chat: ChatIcon,
  check: CheckIcon,
  checklist: ChecklistIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  "chevron-up": ChevronUpIcon,
  close: CloseIcon,
  diary: DiaryIcon,
  down: DownIcon,
  feedback: FeedbackIcon,
  field: FieldIcon,
  forum: ForumIcon,
  gallery: GalleryIcon,
  guide: GuideIcon,
  heart: HeartIcon,
  home: HomeIcon,
  lightbulb: LightBulbIcon,
  like: LikeIcon,
  lock: LockIcon,
  menu: MenuIcon,
  moon: MoonIcon,
  people: PeopleIcon,
  person: PersonIcon,
  plus: PlusIcon,
  record: RecordIcon,
  storage: StorageIcon,
  sun: SunIcon,
};

export const AppIcon = ({ icon, size, color }: Props) => {
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent width={size} height={size} color={color} />;
};