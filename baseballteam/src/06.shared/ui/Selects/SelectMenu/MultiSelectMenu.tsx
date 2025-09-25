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
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props<T> {
  options: T[];
  value: T[];
  onSelect: (value: T) => void;
  getLabel: (option: T) => string;
}

export function MultiSelectMenu<T>({
  options,
  value,
  onSelect,
  getLabel,
}: Readonly<Props<T>>) {
  const { rootRef, menuOpen, openMenu } = useMenu();
  const { colors } = useColors();

  return (
    <Container ref={rootRef} data-testid="select-container">
      <ItemsContainer
        onClick={openMenu}
        as="button"
        type="button"
        data-testid="open-dropdown"
      >
        {value.length === 0 ? (
          <Placeholder onClick={openMenu}>선택하기</Placeholder>
        ) : (
          <>
            {value.map((v, idx) => (
              <Item key={getLabel(v) + idx}>{getLabel(v)}</Item>
            ))}
          </>
        )}
      </ItemsContainer>
      <DropdownMenu $isOpen={menuOpen} data-testid="dropdown-menu">
        <SelectedArea>
          {value.length === 0 ? (
            <Placeholder>선택하기</Placeholder>
          ) : (
            <>
              {value.map((v, idx) => (
                <button
                  key={getLabel(v) + idx}
                  onClick={() => onSelect(v)}
                  data-testid={`deselect-${getLabel(v)}`}
                >
                  <Item>
                    {getLabel(v)}
                    <AppIcon icon="close" size={16} color={colors.primary} />
                  </Item>
                </button>
              ))}
            </>
          )}
        </SelectedArea>
        <Options>
          {options.map((option) => (
            <button
              key={getLabel(option)}
              onClick={() => onSelect(option)}
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
