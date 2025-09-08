"use client";

import Link from "next/link";
import styled from "styled-components";

interface Props {
  message?: string;
  reloadText?: string;
  href?: string;
}

export function NotFoundPageWidget({
  message = "죄송합니다. 찾고 있는 페이지가 존재하지 않습니다.",
  reloadText = "홈으로 돌아가기",
  href = "/",
}: Readonly<Props>) {
  return (
    <Container>
      <Text404>404</Text404>
      <div className="right">
        <Message>{message}</Message>
        <RedirectLink href={href} passHref>
          {reloadText}
        </RedirectLink>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 75vh;
  text-align: center;

  background-color: ${({ theme }) => theme.colors.background};

  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 24px;
    border-left: 1px solid ${({ theme }) => theme.colors.gray300};
  }
`;

const Text404 = styled.h1`
  padding-right: 24px;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
`;

const RedirectLink = styled(Link)`
  display: inline-block;
  padding: 8px 16px;

  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;

  background-color: ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;

  &:hover {
    text-decoration: underline;
  }
`;
