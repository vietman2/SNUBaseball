import styled from "styled-components";
import { Link } from "react-router";

import { useColors } from "@shared/lib/styles";
import type { BreadcrumbItemType } from "@shared/lib/views";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  items: BreadcrumbItemType[];
}

export function Breadcrumb({ items }: Readonly<Props>) {
  return (
    <BreadcrumbContainer>
      {items.map((item, index) => (
        <BreadcrumbItem
          key={item.href}
          item={item}
          isLastItem={index === items.length - 1}
        />
      ))}
    </BreadcrumbContainer>
  );
}

interface ItemProps {
  item: BreadcrumbItemType;
  isLastItem?: boolean;
}

export function BreadcrumbItem({ item, isLastItem }: Readonly<ItemProps>) {
  const { colors } = useColors();

  if (isLastItem) {
    return (
      <BreadcrumbItemContainer $isLastItem>
        {item.label}
      </BreadcrumbItemContainer>
    );
  }

  return (
    <BreadcrumbItemContainer>
      <Link to={item.href}>{item.label}</Link>
      <AppIcon icon="chevron-right" size={16} color={colors.primary} />
    </BreadcrumbItemContainer>
  );
}

const BreadcrumbContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BreadcrumbItemContainer = styled.div<{ $isLastItem?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 4px;
  gap: 8px;

  font-size: 1rem;
  font-weight: ${({ $isLastItem }) => ($isLastItem ? 600 : 500)};
  color: ${({ $isLastItem, theme }) =>
    $isLastItem ? theme.colors.primary : theme.colors.gray900};

  > a {
    cursor: ${({ $isLastItem }) => ($isLastItem ? "default" : "pointer")};
  }
`;
