import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { EquipmentCategoryType } from "@models/management";

export function EquipmentTableHeader() {
  return (
    <Header>
      <div>
        <AppIcon icon="category" size={18} color="#212529" />
        <span>분류</span>
      </div>
      <div>
        <AppIcon icon="person" size={18} color="#212529" />
        <span>담당자</span>
      </div>
      <div>
        <AppIcon icon="location" size={18} color="#212529" />
        <span>장소</span>
      </div>
      <div>
        <AppIcon icon="text" size={18} color="#212529" />
        <span>품명</span>
      </div>
      <div>
        <AppIcon icon="number" size={18} color="#212529" />
        <span>수량</span>
      </div>
      <div>
        <AppIcon icon="calendar" size={18} color="#212529" />
        <span>업데이트</span>
      </div>
    </Header>
  );
}

interface RowProps {
  category: EquipmentCategoryType;
}

export function EquipmentTableRow({ category }: Readonly<RowProps>) {
  return (
    <CategoryRow>
      <div>
        <span>{category.name}</span>
      </div>
      <div>
        {category.person_in_charge.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
      <div>
        {category.location.length > 0 ? (
          <>
            {category.location.map((location, index) => (
              <LocationRow key={location.name} $first={index === 0}>
                <div>{location.name}</div>
                <div>
                  {location.equipment.map((equipment) => (
                    <EquipmentRow key={equipment.id}>
                      <div>{equipment.name}</div>
                      <div>{equipment.quantity}</div>
                    </EquipmentRow>
                  ))}
                </div>
              </LocationRow>
            ))}
          </>
        ) : (
          <LocationRow $first>
            <div></div>
            <div>
              <EquipmentRow>
                <div></div>
                <div></div>
              </EquipmentRow>
            </div>
          </LocationRow>
        )}
      </div>
      <div>{category.updated_at}</div>
    </CategoryRow>
  );
}

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`;

const Header = styled(Horizontal)`
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 80px;
    padding: 4px 0;
    gap: 4px;

    white-space: nowrap;

    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  }

  > div:nth-child(3) {
    border-right: none;
  }

  > div:nth-child(4) {
    min-width: 140px;
    border-left: 1px solid ${({ theme }) => theme.colors.borderLight};
  }

  > div:last-child {
    min-width: 100px;
  }
`;

const CategoryRow = styled(Horizontal)`
  min-width: 560px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    white-space: nowrap;
  }

  > div {
    flex-direction: column;
  }

  > div:first-child {
    min-width: 80px;

    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  }

  >div: nth-child(2) {
    min-width: 80px;

    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  }

  > div:last-child {
    min-width: 100px;

    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
`;

const LocationRow = styled(Horizontal)<{ $first?: boolean }>`
  border-top: ${({ $first, theme }) =>
    $first ? "none" : `1px solid ${theme.colors.borderLight}`};

  > div:first-child {
    min-width: 80px;
  }

  > div:last-child {
    flex-direction: column;
  }
`;

const EquipmentRow = styled(Horizontal)`
  display: flex;
  flex-direction: row;

  > div {
    min-width: 80px;
    height: 40px;
    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  }

  > div:first-child {
    min-width: 140px;
    border-left: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
`;
