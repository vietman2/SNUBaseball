import styled from "styled-components";

export const InlineTextInput = styled.input`
  flex: 0 0 auto;
  min-width: 1ch;
  field-sizing: content;
  padding: 0;
  margin: 0;

  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1rem;
  border: none;
  background: transparent;

  &:focus {
    outline: none;
  }
`;
