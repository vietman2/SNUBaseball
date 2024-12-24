import { useState } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { EquipmentDetailType, EquipmentSimpleType } from "@models/management";
import { MemberType } from "@models/user";
import {
  updateEquipmentQuantity,
  updateEquipmentManager,
  addNewEquipment,
} from "@services/management";

const updateTypeChoices = ["수량 업데이트", "담당자 변경", "신규 물품 추가"];

interface Props {
  equipment: EquipmentDetailType;
  activeMembers: MemberType[];
  modalOpen: boolean;
  closeModal: () => void;
}

export function EquipmentUpdateModal({
  equipment,
  activeMembers,
  modalOpen,
  closeModal,
}: Readonly<Props>) {
  const [selectedUpdateType, setSelectedUpdateType] = useState<string>("");

  return (
    <Overlay $open={modalOpen} onClick={closeModal} data-testid="close-modal">
      <Modal $open={modalOpen} onClick={(e) => e.stopPropagation()}>
        <Subtitle>장비 현황 업데이트</Subtitle>
        <Horizontal>
          <div>업데이트 유형</div>
          <select
            value={selectedUpdateType}
            onChange={(e) => setSelectedUpdateType(e.target.value)}
            data-testid="type-select"
          >
            <option value="">선택</option>
            {updateTypeChoices.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </Horizontal>
        {selectedUpdateType === "수량 업데이트" && (
          <UpdateQuantity equipment={equipment} closeModal={closeModal} />
        )}
        {selectedUpdateType === "담당자 변경" && (
          <ChangePersonInCharge
            equipment={equipment}
            options={activeMembers}
            closeModal={closeModal}
          />
        )}
        {selectedUpdateType === "신규 물품 추가" && (
          <NewEquipment equipment={equipment} closeModal={closeModal} />
        )}
      </Modal>
    </Overlay>
  );
}

function NewEquipment({
  equipment,
  closeModal,
}: Readonly<{ equipment: EquipmentDetailType; closeModal: () => void }>) {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("창고");
  const [notes, setNotes] = useState<string>("");

  const locations = ["창고", "부실", "아카데미", "기타"];

  const handleSubmit = async () => {
    const response = await addNewEquipment(
      equipment.id,
      name,
      quantity,
      unit,
      selectedLocation,
      notes
    );

    if (response) {
      alert("신규 물품이 추가되었습니다.");
      closeModal();
    } else {
      alert("신규 물품 추가에 실패했습니다.");
    }
  };

  return (
    <Column>
      <Horizontal>
        <span>보관장소</span>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          data-testid="location-select"
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </Horizontal>
      <Horizontal>
        <span>물품 이름</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-testid="name"
        />
      </Horizontal>
      <Horizontal>
        <span>물품 수량</span>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          min={0}
          data-testid="quantity"
        />
      </Horizontal>
      <Horizontal>
        <span>단위</span>
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          data-testid="unit"
        />
      </Horizontal>
      <Horizontal>
        <span>비고</span>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          data-testid="notes"
        />
      </Horizontal>
      <Button onClick={handleSubmit}>저장</Button>
    </Column>
  );
}

function ChangePersonInCharge({
  equipment,
  options,
  closeModal,
}: Readonly<{
  equipment: EquipmentDetailType;
  options: MemberType[];
  closeModal: () => void;
}>) {
  const [memberOptions, setMemberOptions] = useState<MemberType[]>(options);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (parseInt(e.target.value, 10) === -1) {
      return;
    }
    setSelectedMembers((prev) => [...prev, parseInt(e.target.value, 10)]);
    setMemberOptions((prev) =>
      prev.filter((option) => option.id !== parseInt(e.target.value, 10))
    );
  };

  const handleRemove = (id: number) => {
    setSelectedMembers((prev) => prev.filter((memberId) => memberId !== id));
    const member = options.find((option) => option.id === id);
    if (member) {
      setMemberOptions((prev) => [...prev, member]);
    }
  };

  const handleSubmit = async () => {
    const response = await updateEquipmentManager(
      equipment.id,
      selectedMembers
    );

    if (response) {
      alert("담당자가 변경되었습니다.");
      closeModal();
    } else {
      alert("담당자 변경에 실패했습니다.");
    }
  };

  return (
    <Column>
      <Horizontal>
        <span>기존 담당자</span>
        <span>{equipment.person_in_charge.join(", ")}</span>
      </Horizontal>
      <Horizontal style={{ flexWrap: "wrap" }}>
        <span>새 담당자</span>
        <SelectedMembers>
          {selectedMembers.map((memberId) => (
            <SelectedMember key={memberId}>
              {options.find((option) => option.id === memberId)?.name}
              <button onClick={() => handleRemove(memberId)} data-testid="remove-member">
                <AppIcon icon="minus" size={14} color="red" />
              </button>
            </SelectedMember>
          ))}
        </SelectedMembers>
      </Horizontal>
      <Horizontal>
        <span>새 담당자 추가</span>
        <select onChange={handleSelect} data-testid="member-select">
          <option value={-1}>선택</option>
          {memberOptions.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </Horizontal>
      <Button onClick={handleSubmit}>저장</Button>
    </Column>
  );
}

function UpdateQuantity({
  equipment,
  closeModal,
}: Readonly<{ equipment: EquipmentDetailType; closeModal: () => void }>) {
  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentSimpleType>();
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number>();
  const [notes, setNotes] = useState<string>("");
  const [newQuantity, setNewQuantity] = useState<number>(0);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEquipmentId(parseInt(e.target.value, 10));
    setSelectedEquipment(
      equipment.location
        .flatMap((location) => location.equipment)
        .find((equipment) => equipment.id === parseInt(e.target.value, 10))
    );
  };

  const handleSubmit = async () => {
    const response = await updateEquipmentQuantity(
      equipment.id,
      selectedEquipment?.id,
      newQuantity,
      notes
    );

    if (response) {
      alert("수량이 업데이트 되었습니다.");
      closeModal();
    } else {
      alert("수량 업데이트에 실패했습니다.");
    }
  };

  return (
    <Column>
      <Horizontal>
        <span>물품 선택</span>
        <select value={selectedEquipmentId} onChange={handleSelect} data-testid="equipment-select">
          <option value={0}>선택</option>
          {equipment.location.map((location) =>
            location.equipment.map((equipment) => (
              <option key={equipment.id} value={equipment.id}>
                [{location.name}] {equipment.name}
              </option>
            ))
          )}
        </select>
      </Horizontal>
      <Horizontal>
        <span>기존 수량</span>
        <span>{selectedEquipment ? selectedEquipment.quantity : "-"}</span>
      </Horizontal>
      <Horizontal>
        <span>새 수량</span>
        <input
          type="number"
          value={newQuantity}
          onChange={(e) => setNewQuantity(parseInt(e.target.value, 10))}
          min={0}
          data-testid="new-quantity"
        />
      </Horizontal>
      <Horizontal>
        <span>비고</span>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          data-testid="notes"
        />
      </Horizontal>
      <Button onClick={handleSubmit}>저장</Button>
    </Column>
  );
}

const Overlay = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px 0 0 16px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 30%;
  left: 15%;
  width: 70%;
  padding: 24px;
  gap: 16px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background500};

  transition: background-color 0.3s;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
`;

const Subtitle = styled.div`
  align-self: center;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 500;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  > div {
    flex: 1;
  }

  > span {
    flex: 1;
  }

  > select {
    flex: 1;
  }

  > input {
    flex: 1;
  }
`;

const Button = styled.button`
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background900};
  color: ${({ theme }) => theme.colors.foreground900};
  cursor: pointer;
`;

const SelectedMembers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SelectedMember = styled.div`
  display: flex;
  align-items: center;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
