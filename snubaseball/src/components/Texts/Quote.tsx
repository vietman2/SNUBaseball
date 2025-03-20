import styled, { useTheme } from "styled-components";

import { AppIcon } from "@components/Icons";

export function Quote({ quote }: { quote: string }) {
  const { colors } = useTheme();

  return (
    <Container>
      <div>
        <AppIcon icon="quote-start" size={20} color={colors.highEmphasis} />
      </div>
      <Text>{quote}</Text>
      <div>
        <AppIcon icon="quote-end" size={20} color={colors.highEmphasis} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 16px 8px;
  position: relative;

  background-color: ${({ theme }) => theme.colors.background200};
  border-radius: 24px;

  > div:first-child {
    position: absolute;
    top: 8px;
    left: 8px;
  }

  > div:last-child {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Text = styled.span`
  display: flex;
  padding: 4px 24px 4px 36px;
  line-height: 1.5;
  font-size: 1.125rem;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.highEmphasis};

  @media (max-width: 768px) {
    font-size: 0.925rem;
    padding: 12px 12px 4px 12px;
  }
`;
