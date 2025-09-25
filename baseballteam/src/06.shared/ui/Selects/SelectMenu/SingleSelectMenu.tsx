import {
  Container,
  DropdownMenu,
  Item,
  ItemsContainer,
  Options,
  Placeholder,
  SelectedArea,
} from "./styles";
import { useMenu } from "./useMenu";
import { AppIcon } from "@shared/ui/Icons";

interface Props<T> {
  options: T[];
  value: T | null;
  onSelect: (value: T | null) => void;
  getLabel: (option: T) => string;
}

export function SingleSelectMenu<T>({
  options,
  value,
  onSelect,
  getLabel,
}: Readonly<Props<T>>) {
  const { rootRef, menuOpen, openMenu, closeMenu } = useMenu();

  const removeSelected = () => {
    onSelect(null);
  };

  const selectItem = (item: T) => {
    onSelect(item);
    closeMenu();
  };

  return (
    <Container ref={rootRef} data-testid="select-container">
      <ItemsContainer
        onClick={openMenu}
        as="button"
        type="button"
        data-testid="open-dropdown"
      >
        {value === null ? (
          <Placeholder onClick={openMenu}>선택하기</Placeholder>
        ) : (
          <Item>{getLabel(value)}</Item>
        )}
      </ItemsContainer>
      <DropdownMenu $isOpen={menuOpen} data-testid="dropdown-menu">
        <SelectedArea>
          {value === null ? (
            <Placeholder>선택하기</Placeholder>
          ) : (
            <button onClick={removeSelected} data-testid="remove-selected">
              <Item>
                {getLabel(value)}
                <AppIcon icon="close" size={16} />
              </Item>
            </button>
          )}
        </SelectedArea>
        <Options>
          {options.map((option) => (
            <button
              key={getLabel(option)}
              onClick={() => selectItem(option)}
              data-testid={`select-${getLabel(option)}`}
            >
              <Item>{getLabel(option)}</Item>
            </button>
          ))}
        </Options>
      </DropdownMenu>
    </Container>
  );
}
