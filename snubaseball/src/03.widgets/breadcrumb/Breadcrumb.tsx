import { BreadcrumbItemType } from "./models/breadcrumb";
import { BreadcrumbItem } from "./ui/BreadcrumbItem";
import { BreadcrumbContainer } from "./ui/styles";

interface Props {
  items: BreadcrumbItemType[];
}

export function Breadcrumb({ items }: Readonly<Props>) {
  return (
    <BreadcrumbContainer>
      {items.map((item) => (
        <BreadcrumbItem key={item.href} item={item} />
      ))}
    </BreadcrumbContainer>
  );
}
