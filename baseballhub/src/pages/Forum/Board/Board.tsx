import { useEffect, useState } from "react";
import styled from "styled-components";

import { Callout } from "@components/Texts";
import { samplePosts } from "@data/forum";
import { PostSimple } from "@fragments/Post";
import { PostType } from "@models/forum";

export function Board() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    // TODO: Fetch posts from the server
    setPosts(samplePosts);
  }, []);

  return (
    <Container>
      <Title>자유게시판</Title>
      <Callout text="이정호가 원해서 만든 자유게시판!" />
      <Content>
        {posts.map((post) => (
          <PostSimple key={post.id} post={post} />
        ))}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 1rem 0;
  font-weight: bold;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  padding: 1rem 20px;
  border-radius: 5px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
