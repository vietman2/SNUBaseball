"use client";

import styled from "styled-components";

interface Props {
  label: string;
  color: string;
}

export function Badge({ label, color }: Readonly<Props>) {
  return (
    <BadgeContainer style={{ backgroundColor: `${color}25`, color: color }}>
      {label}
    </BadgeContainer>
  );
}

const BadgeContainer = styled.span`
  display: inline-block;
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
`;
