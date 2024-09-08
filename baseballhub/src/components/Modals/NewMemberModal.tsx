import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { ChipSelector, CollegeSelector } from "@components/Selectors";
import { DateInput, TextInput } from "@components/Inputs";
import { CollegeType } from "@models/person";

interface Props {
  colleges: CollegeType[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
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
  ) => Promise<boolean>;
}

const RoleChoices = ["선수", "매니저"];

export function NewMemberModal({ colleges, isOpen, onClose, onSubmit }: Props) {
  const [lastname, setLastname] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("2005-01-01");
  const [startDate, setStartDate] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("선수");
  const [selectedCollegeId, setSelectedCollegeId] = useState<number | null>(
    null
  );
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | null
  >(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (typeof dataUrl !== "string") return;
      setProfileImage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    setLastname("");
    setFirstname("");
    setStudentId("");
    setPhone("");
    setEmail("");
    setBirthDate("2005-01-01");
    setStartDate("");
    setProfileImage(null);
    setSelectedRole("선수");
    setSelectedCollegeId(null);
    setSelectedDepartmentId(null);
    onClose();
  };

  const handleSubmit = async () => {
    const status = await onSubmit(
      lastname,
      firstname,
      studentId,
      phone,
      email,
      birthDate,
      startDate,
      selectedDepartmentId!,
      selectedRole,
      profileImage
    );

    if (status) {
      handleClose();
    }
  };

  useEffect(() => {
    const dateToday = new Date().toISOString().split("T")[0];
    setStartDate(dateToday);
  }, []);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <Title>신입부원 추가</Title>
        </ModalHeader>
        <ModalContent>
          <Profile>
            <PlaceholderImage>
              {profileImage ? (
                <img src={URL.createObjectURL(profileImage)} alt="프로필" />
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    data-testid="image-change"
                  />
                  <span>프로필 이미지 선택</span>
                </>
              )}
            </PlaceholderImage>
            <div>
              <TextInput
                placeholder="성"
                value={lastname}
                onChange={setLastname}
              />
              <TextInput
                placeholder="이름"
                value={firstname}
                onChange={setFirstname}
              />
            </div>
            <ChipSelector
              options={RoleChoices}
              selected={selectedRole}
              onSelect={setSelectedRole}
            />
          </Profile>
          <ProfileInfo>
            <div>
              <TextInput
                placeholder="학번"
                value={studentId}
                onChange={setStudentId}
              />
              <TextInput
                placeholder="전화번호"
                value={phone}
                onChange={setPhone}
              />
              <TextInput
                placeholder="이메일"
                value={email}
                onChange={setEmail}
              />
            </div>
            <div>
              <CollegeSelector
                colleges={colleges}
                selectedCollegeId={selectedCollegeId}
                selectedDepartmentId={selectedDepartmentId}
                onSelectCollege={setSelectedCollegeId}
                onSelectDepartment={setSelectedDepartmentId}
              />
              <DateInput
                label="생년월일"
                value={birthDate}
                onChange={setBirthDate}
              />
              <DateInput
                label="입부일"
                value={startDate}
                onChange={setStartDate}
              />
            </div>
          </ProfileInfo>
        </ModalContent>
        <ModalFooter>
          <Chip label="닫기" onClick={handleClose} bgColor="gray" />
          <Chip label="추가" bgColor="blue" onClick={handleSubmit} />
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px 20px;
  gap: 40px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

const Profile = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;

  div {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;

const PlaceholderImage = styled.div`
  width: 120px;
  height: 160px;
  background-color: #d9d9d9;
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;

  span {
    position: absolute;
    font-size: 12px;
    color: #666;
    text-align: center;
    pointer-events: none;
  }

  input[type="file"] {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  flex: 3;
  display: flex;
  flex-direction: row;
  gap: 50px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-width: 200px;
    gap: 30px;
  }
`;

const Title = styled.h2`
  margin: 0;
`;
