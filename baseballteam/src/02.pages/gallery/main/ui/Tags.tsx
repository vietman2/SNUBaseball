import { useSearchParams } from "react-router";
import styled from "styled-components";

import { TagBadge, TagBadgeSkeleton, useTags } from "@entities/gallery/tags";

export function Tags() {
  const [, setSearchParams] = useSearchParams();
  const { tags, selectedTags, isLoading } = useTags();

  const onTagClick = (tagName: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (selectedTags.some((tag) => tag.name === tagName)) {
        // 이미 선택된 태그면 해제
        next.delete("tag");
        selectedTags
          .filter((tag) => tag.name !== tagName)
          .forEach((tag) => next.append("tag", tag.name));
      } else {
        // 선택되지 않은 태그면 추가
        next.append("tag", tagName);
      }
      next.delete("page"); // 태그 바뀌면 페이지 초기화

      return next;
    });
  };

  if (isLoading) {
    return (
      <Container>
        <TagBadgeSkeleton />
        <TagBadgeSkeleton />
        <TagBadgeSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagClick(tag.name)}
          data-testid={`tag-${tag.name}-badge`}
        >
          <TagBadge
            key={tag.id}
            tag={tag}
            isActive={selectedTags.some((t) => t.id === tag.id)}
          />
        </button>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  gap: 8px;
`;
