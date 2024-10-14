import { useEffect, useState } from "react";
import styled from "styled-components";

import { MobileModal, SimpleModal } from "@components/Modals";
import { ChipTabs } from "@components/Tabs";
import { sampleEquipmentResponse } from "@data/management";
import {
  EquipmentDetail,
  EquipmentSimple,
  EquipmentSimpleHeader,
} from "@fragments/Equipment";
import { useWindowSize } from "@hooks/useWindowSize";
import { EquipmentSimpleType, EquipmentResponseType } from "@models/management";

const tabs = ["전체", "창고", "부실", "아카데미"];

export function Equipment() {
  const [selectedTab, setSelectedTab] = useState<string>("전체");
  const [equipments, setEquipments] = useState<EquipmentResponseType>();
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { width } = useWindowSize();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEquipmentClick = (equipment: EquipmentSimpleType) => {
    setSelectedEquipmentId(equipment.id);
    openModal();
  };

  useEffect(() => {
    setEquipments(sampleEquipmentResponse);
  }, []);

  if (equipments === undefined) return null;

  return (
    <Container>
      <FilterWrapper>
        <ChipTabs
          options={tabs}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />
      </FilterWrapper>
      <Table>
        <EquipmentSimpleHeader wide={width > 768} />
        {Object.entries(equipments).map(([location, categoryList]) => (
          <Location key={location}>
            <div>{location}</div>
            <CategoryList $wide={width > 768}>
              {Object.entries(categoryList).map(([category, equipmentList]) => (
                <Category key={category}>
                  <div>{category}</div>
                  <div>{equipmentList.manager}</div>
                  <List $wide={width > 768}>
                    {equipmentList.equipment.map((equipment) => (
                      <button
                        key={equipment.id}
                        onClick={() => handleEquipmentClick(equipment)}
                        data-testid={`equipment-${equipment.id}`}
                      >
                        <EquipmentSimple
                          key={equipment.id}
                          equipment={equipment}
                          wide={width > 768}
                        />
                      </button>
                    ))}
                  </List>
                </Category>
              ))}
            </CategoryList>
          </Location>
        ))}
      </Table>
      {width > 768 ? (
        <SimpleModal isOpen={modalOpen} onClose={closeModal}>
          <EquipmentDetail
            equipmentId={selectedEquipmentId}
            goBack={closeModal}
          />
        </SimpleModal>
      ) : (
        <MobileModal isOpen={modalOpen} onClose={closeModal}>
          <EquipmentDetail
            equipmentId={selectedEquipmentId}
            goBack={closeModal}
          />
        </MobileModal>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;

const Location = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 500;

  > div:first-child {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
`;

const CategoryList = styled.div<{ $wide: boolean }>`
  display: flex;
  flex: ${({ $wide }) => ($wide ? 7 : 4)};
  flex-direction: column;
`;

const Category = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;

  > div:first-child {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  > div:nth-child(2) {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
`;

const List = styled.div<{ $wide: boolean }>`
  display: flex;
  flex: ${({ $wide }) => ($wide ? 5 : 2)};
  flex-direction: column;
`;
