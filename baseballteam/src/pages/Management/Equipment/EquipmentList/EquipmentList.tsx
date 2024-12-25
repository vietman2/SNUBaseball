import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ErrorComponent, Loading } from "@components/Fallbacks";
import { ChipTabs } from "@components/Tabs";
import { EquipmentTableHeader, EquipmentTableRow } from "@fragments/Equipment";
import { EquipmentCategoryType } from "@models/management";
import { getEquipment } from "@services/management";

const tabs = ["전체", "창고", "부실", "아카데미", "기타"];

export function EquipmentList() {
  const [selectedTab, setSelectedTab] = useState<string>("전체");
  const [equipment, setEquipment] = useState<EquipmentCategoryType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleDetailClick = (id: number) => {
    navigate(`/management/equipment/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEquipment(selectedTab);

      if (response) {
        setEquipment(response);
      } else {
        setEquipment([]);
      }

      setLoading(false);
    };

    fetchData();
  }, [selectedTab, refreshCount, location.pathname]);

  return (
    <Container>
      <FilterWrapper>
        <div>장소</div>
        <ChipTabs
          options={tabs}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />
      </FilterWrapper>
      <Table>
        <EquipmentTableHeader />
        {loading ? (
          <Loading />
        ) : (
          <>
            {equipment.length > 0 ? (
              <>
                {equipment.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleDetailClick(category.id)}
                    data-testid={`equipment-${category.id}`}
                  >
                    <EquipmentTableRow category={category} />
                  </button>
                ))}
              </>
            ) : (
              <ErrorWrapper>
                <ErrorComponent onRefresh={handleRefresh} label="새로고침" />
              </ErrorWrapper>
            )}
          </>
        )}
      </Table>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: calc(100vw - 32px);
  padding: 12px 16px;
  gap: 16px;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;

    color: ${({ theme }) => theme.colors.foreground500};
    font-weight: 600;
  }
`;

const Table = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 0;

  overflow-x: auto;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
