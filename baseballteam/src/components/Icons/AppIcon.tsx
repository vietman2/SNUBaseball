import { ReactComponent as ArchiveIcon } from "./archive.svg";
import { ReactComponent as ArrowDownIcon } from "./arrow-down.svg";
import { ReactComponent as ArrowUpIcon } from "./arrow-up.svg";
import { ReactComponent as AttachmentIcon } from "./attachment.svg";
import { ReactComponent as BaseballIcon } from "./baseball.svg";
import { ReactComponent as CalendarIcon } from "./calendar.svg";
import { ReactComponent as CategoryIcon } from "./category.svg";
import { ReactComponent as ChatIcon } from "./chat.svg";
import { ReactComponent as CheckIcon } from "./check.svg";
import { ReactComponent as ChecklistIcon } from "./checklist.svg";
import { ReactComponent as ChevronDownIcon } from "./chevron-down.svg";
import { ReactComponent as ChevronLeftIcon } from "./chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "./chevron-right.svg";
import { ReactComponent as ChevronUpIcon } from "./chevron-up.svg";
import { ReactComponent as CloseIcon } from "./close.svg";
import { ReactComponent as DiaryIcon } from "./diary.svg";
import { ReactComponent as DotsIcon } from "./dots.svg";
import { ReactComponent as DownloadIcon } from "./download.svg";
import { ReactComponent as EyeIcon } from "./eye.svg";
import { ReactComponent as FilterIcon } from "./filter.svg";
import { ReactComponent as ForumIcon } from "./forum.svg";
import { ReactComponent as GraduateIcon } from "./graduate.svg";
import { ReactComponent as GridIcon } from "./grid.svg";
import { ReactComponent as HeartIcon } from "./heart.svg";
import { ReactComponent as HeartOutlineIcon } from "./heart-outline.svg";
import { ReactComponent as HomeIcon } from "./home.svg";
import { ReactComponent as LightbulbIcon } from "./lightbulb.svg";
import { ReactComponent as ListIcon } from "./list.svg";
import { ReactComponent as ManagementIcon } from "./management.svg";
import { ReactComponent as MenuIcon } from "./menu.svg";
import { ReactComponent as MoneyIcon } from "./money.svg";
import { ReactComponent as MoonIcon } from "./moon.svg";
import { ReactComponent as PencilIcon } from "./pencil.svg";
import { ReactComponent as PeopleIcon } from "./people.svg";
import { ReactComponent as PlusIcon } from "./plus.svg";
import { ReactComponent as RecordIcon } from "./record.svg";
import { ReactComponent as SearchIcon } from "./search.svg";
import { ReactComponent as SendIcon } from "./send.svg";
import { ReactComponent as StatusIcon } from "./status.svg";
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
  archive: ArchiveIcon,
  "arrow-down": ArrowDownIcon,
  "arrow-up": ArrowUpIcon,
  attachment: AttachmentIcon,
  baseball: BaseballIcon,
  calendar: CalendarIcon,
  category: CategoryIcon,
  chat: ChatIcon,
  check: CheckIcon,
  checklist: ChecklistIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  "chevron-up": ChevronUpIcon,
  close: CloseIcon,
  diary: DiaryIcon,
  dots: DotsIcon,
  download: DownloadIcon,
  eye: EyeIcon,
  filter: FilterIcon,
  forum: ForumIcon,
  graduate: GraduateIcon,
  grid: GridIcon,
  heart: HeartIcon,
  "heart-outline": HeartOutlineIcon,
  home: HomeIcon,
  lightbulb: LightbulbIcon,
  list: ListIcon,
  management: ManagementIcon,
  menu: MenuIcon,
  money: MoneyIcon,
  moon: MoonIcon,
  pencil: PencilIcon,
  people: PeopleIcon,
  plus: PlusIcon,
  record: RecordIcon,
  search: SearchIcon,
  send: SendIcon,
  status: StatusIcon,
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
