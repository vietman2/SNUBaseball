import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { NewMemberModal } from "@components/Modals";
import { MembersTable } from "@components/Tables";
import { Tabs } from "@components/Tabs";
import { PersonType, CollegeType } from "@models/person";
import { addMember, getMajors, getMembers } from "@services/person";

const tabs = ["YB", "OB", "지도자", "기타"];

export default function Members() {
  const [selectedTab, setSelectedTab] = useState<string>("YB");
  const [members, setMembers] = useState<PersonType[]>([]);
  const [majors, setMajors] = useState<CollegeType[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onOpen = () => {
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
  };

  const fetchMajors = async () => {
    const data = await getMajors();

    if (data) {
      setMajors(data);
    }
  };

  const fetchMembers = async () => {
    const data = await getMembers(selectedTab);

    if (data) {
      setMembers(data);
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [selectedTab]);

  const addNewMember = async (
    lastname: string,
    firstname: string,
    studentId: string,
    phone: string,
    email: string,
    birthDate: string,
    startDate: string,
    departmentId: number,
    role: string,
    profileImage: File | null
  ) => {
    const response = await addMember(
      lastname,
      firstname,
      studentId,
      phone,
      email,
      birthDate,
      startDate,
      departmentId,
      role,
      profileImage
    );

    if (response) {
      fetchMembers();

      return true;
    }

    return false;
  };

  return (
    <>
      <Container>
        <Title>부원관리</Title>
        <Tabs
          tabs={tabs}
          activeTab={selectedTab}
          setActiveTab={setSelectedTab}
        />
        <Content>
          <Horizontal>
            <Chip label="신입부원 추가" onClick={onOpen} />
          </Horizontal>
          <MembersTable members={members} />
        </Content>
      </Container>
      <NewMemberModal
        colleges={majors}
        isOpen={modalOpen}
        onClose={onClose}
        onSubmit={addNewMember}
      />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;

const Content = styled.div`
  flex: 1;
  background-color: white;
  padding: 1rem 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;
