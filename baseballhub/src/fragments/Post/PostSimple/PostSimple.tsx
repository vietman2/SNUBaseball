import styled from "styled-components";

import { palette } from "@constants/colors";
import { PostType } from "@models/forum";

interface Props {
  post: PostType;
}

export function PostSimple({ post }: Props) {
  return (
    <Container>
      <div>
        <div>{post.id}</div>
        <Title>{post.title}</Title>
        <Tag>{post.tag}</Tag>
      </div>
      <div>
        <div>{post.author}</div>
        <div>{post.created_at}</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: 15px;
  background-color: ${palette.background};

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Title = styled.div`
  padding: 0 0.5rem 0 1.5rem;
`;

const Tag = styled.div`
  margin: 0 1.5rem 0 0;
  padding: 0.25rem 0.5rem;
  background-color: ${palette.primary};
  color: white;
  border-radius: 10px;
`;
