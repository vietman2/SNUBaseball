import { TagBadge } from "./TagBadge";
import type { MediaTagType } from "../models/tags";
import { AppIcon } from "@shared/ui/Icons";
import { MenuContainer, useMenu } from "@shared/ui/Menus";
import { SelectMenu } from "@shared/ui/Selects";

interface Props {
  tags: MediaTagType[];
  selectedTags: MediaTagType[];
  selectTag: (tag: MediaTagType) => void;
}

export function TagsSelect({ tags, selectedTags, selectTag }: Readonly<Props>) {
  const { ref, isOpen, open } = useMenu();

  const onSelect = (tag: MediaTagType) => {
    selectTag(tag);
  };

  return (
    <SelectMenu.Container ref={ref}>
      <SelectMenu.ItemsContainer
        onClick={open}
        as="button"
        type="button"
        data-testid="open-tags-dropdown"
      >
        {selectedTags.length === 0 ? (
          <SelectMenu.Placeholder onClick={open} data-testid="open-tag-select">
            선택하기
          </SelectMenu.Placeholder>
        ) : (
          <>
            {selectedTags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} isActive />
            ))}
          </>
        )}
      </SelectMenu.ItemsContainer>
      <MenuContainer $isOpen={isOpen}>
        <SelectMenu.SelectedArea>
          {selectedTags.length === 0 ? (
            <SelectMenu.Placeholder>선택하기</SelectMenu.Placeholder>
          ) : (
            <>
              {selectedTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => onSelect(tag)}
                  data-testid={`deselect-${tag.id}`}
                >
                  <TagBadge tag={tag} isActive />
                  <AppIcon icon="close" size={12} color={tag.color} />
                </button>
              ))}
            </>
          )}
        </SelectMenu.SelectedArea>
        <SelectMenu.Options>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onSelect(tag)}
              data-testid={`select-${tag.name}`}
            >
              <TagBadge tag={tag} isActive />
            </button>
          ))}
        </SelectMenu.Options>
      </MenuContainer>
    </SelectMenu.Container>
  );
}
