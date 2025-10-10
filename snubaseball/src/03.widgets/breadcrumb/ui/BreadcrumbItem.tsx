"use client";

import Link from "next/link";
import styled from "styled-components";

import { BreadcrumbItemType } from "../models/breadcrumb";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  item: BreadcrumbItemType;
}

export function BreadcrumbItem({ item }: Readonly<Props>) {
  const { colors } = useColors();

  if (item.isLastItem) {
    return (
      <BreadcrumbItemContainer $isLastItem>
        {item.label}
      </BreadcrumbItemContainer>
    );
  }

  return (
    <BreadcrumbItemContainer>
      <Link href={item.href}>{item.label}</Link>
      <AppIcon icon="chevron-right" size={16} color={colors.primary} />
    </BreadcrumbItemContainer>
  );
}

const BreadcrumbItemContainer = styled.div<{ $isLastItem?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  font-size: 1.25rem;
  font-weight: ${({ $isLastItem }) => ($isLastItem ? 600 : 500)};
  color: ${({ $isLastItem, theme }) =>
    $isLastItem ? theme.colors.primary : theme.colors.gray900};
  white-space: nowrap;

  > a {
    cursor: ${({ $isLastItem }) => ($isLastItem ? "default" : "pointer")};
  }

  > svg {
    margin-top: 2px;
  }
`;
