import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { useTheme } from "@contexts/theme";
import { CollegeType, DepartmentType, MemberType } from "@models/user";
import {
  getMajors,
  getMemberDetail,
  updateMember,
  updateProfileImage,
} from "@services/person";

export function MemberEdit() {
  const [member, setMember] = useState<MemberType>();
  const [collegeOptions, setCollegeOptions] = useState<CollegeType[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<CollegeType>();

  const [admissionYear, setAdmissionYear] = useState<number>(0);
  const [studentId, setStudentId] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<DepartmentType>();
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("선수");
  const [selectedStatus, setSelectedStatus] = useState<string>("활동중");
  const [dateJoined, setDateJoined] = useState<string>("");
  const [numSemesters, setNumSemesters] = useState<number>(0);
  const [selectedHands, setSelectedHands] = useState<string>("우투우타");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [backNumber, setBackNumber] = useState<number>(0);
  const [isElite, setIsElite] = useState<boolean>(false);

  const [refreshCount, setRefreshCount] = useState<number>(0);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const handleBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleImageUploadClick = () => {
    imageRef.current?.click();
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || !memberId) {
      return;
    }

    const response = await updateProfileImage(memberId, event.target.files![0]);

    if (response) {
      handleRefresh();
    } else {
      window.alert("이미지 업로드에 실패했습니다.");
    }
  };

  const handleSubmit = async () => {
    const response = await updateMember(memberId, {
      admissionYear,
      studentId,
      majorId: selectedMajor?.id,
      phone: phone,
      email: email,
      address: address,
      birthDate: birthDate,
      notes: notes,
      role: selectedRole,
      status: selectedStatus,
      dateJoined: dateJoined,
      numSemester: numSemesters,
      hands: selectedHands,
      position: selectedPosition,
      backNumber: backNumber,
      isElite: isElite,
    });

    if (response) {
      navigate(-1);
    } else {
      window.alert("수정에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await getMemberDetail(Number(memberId));
      const response2 = await getMajors();

      if (response1 && response2) {
        setMember(response1);
        setCollegeOptions(response2);
        setAdmissionYear(response1.admission_year);
        setBirthDate(response1.birth_date);
        setStudentId(response1.student_id);
        setPhone(response1.phone);
        setEmail(response1.email);
        setAddress(response1.address);
        setNotes(response1.notes);
        setSelectedRole(response1.role.name);
        setSelectedStatus(response1.status.name);
        setDateJoined(response1.date_joined);
        setSelectedHands(response1.hands);
        setSelectedPosition(response1.position);
        setNumSemesters(response1.num_semester);
        setIsElite(response1.is_elite === "O");
        setBackNumber(response1.back_number);
      }
    };

    fetchData();
  }, [memberId, refreshCount]);

  if (!member) {
    return <ErrorComponent label="뒤로가기" onRefresh={handleBack} />;
  }

  return (
    <Container>
      <Header>
        <button onClick={handleBack}>
          <AppIcon icon="chevron-left" size={24} color={colors.foreground500} />
        </button>
        <button onClick={handleImageUploadClick} data-testid="image-upload">
          <img src={member.profile_image} alt="profile" />
          <span>
            <AppIcon icon="pencil" size={16} color={colors.foreground500} />
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageRef}
            data-testid="image-upload-input"
          />
        </button>
        <div>{member.name}</div>
      </Header>
      <span>
        <Divider />
      </span>
      <Contents>
        <Row>
          <InputWrapper>
            <span>학번 (입학년도)</span>
            <div>
              <input
                type="number"
                value={admissionYear}
                onChange={(e) => setAdmissionYear(Number(e.target.value))}
                data-testid="admission-year"
              />
            </div>
          </InputWrapper>
          <InputWrapper>
            <span>학번</span>
            <div>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                data-testid="student-id"
              />
            </div>
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper>
            <span>대학</span>
            <div>
              <select
                value={selectedCollege?.id}
                onChange={(e) =>
                  setSelectedCollege(
                    collegeOptions.find(
                      (college) => college.id === Number(e.target.value)
                    )
                  )
                }
                data-testid="college"
              >
                <option value="">대학</option>
                {collegeOptions.map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.name}
                  </option>
                ))}
              </select>
            </div>
          </InputWrapper>
          <InputWrapper>
            <span>학과</span>
            <div>
              <select
                value={selectedMajor?.id}
                onChange={(e) =>
                  setSelectedMajor(
                    selectedCollege?.departments.find(
                      (major) => major.id === Number(e.target.value)
                    )
                  )
                }
                data-testid="major"
              >
                <option value="">학과</option>
                {selectedCollege?.departments.map((major) => (
                  <option key={major.id} value={major.id}>
                    {major.name}
                  </option>
                ))}
              </select>
            </div>
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper>
            <span>전화번호</span>
            <div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                data-testid="phone"
              />
            </div>
          </InputWrapper>
          <InputWrapper>
            <span>이메일</span>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="email"
              />
            </div>
          </InputWrapper>
        </Row>
        <InputWrapper>
          <span>주소</span>
          <Address>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: "100%" }}
              data-testid="address"
            />
          </Address>
        </InputWrapper>
        <Row>
          <InputWrapper>
            <span>생년월일</span>
            <div>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                data-testid="birth-date"
              />
            </div>
          </InputWrapper>
          <InputWrapper>
            <span>비고</span>
            <div>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                data-testid="notes"
              />
            </div>
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper>
            <span>Role</span>
            <div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                data-testid="role"
              >
                <option value="주장">주장</option>
                <option value="부주장">부주장</option>
                <option value="수석매니저">수석매니저</option>
                <option value="매니저">매니저</option>
                <option value="선수">선수</option>
                <option value="지도자">지도자</option>
                <option value="기타">기타</option>
              </select>
            </div>
          </InputWrapper>
          <InputWrapper>
            <span>활동현황</span>
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                data-testid="status"
              >
                <option value="활동중">활동중</option>
                <option value="비활동">비활동</option>
                <option value="군입대">군입대</option>
                <option value="OB">OB</option>
                <option value="기타">기타</option>
              </select>
            </div>
          </InputWrapper>
        </Row>
        <span>
          <Divider />
        </span>
        <Row>
          <InputWrapper>
            <span>입부일</span>
            <div>
              <input
                type="date"
                value={dateJoined}
                onChange={(e) => setDateJoined(e.target.value)}
                data-testid="date-joined"
              />
            </div>
          </InputWrapper>
          <InputWrapper>
            <span>활동 학기 수</span>
            <div>
              <input
                type="number"
                value={numSemesters}
                onChange={(e) => setNumSemesters(Number(e.target.value))}
                data-testid="num-semesters"
              />
            </div>
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper>
            <span>투타</span>
            <div>
              <select
                value={selectedHands}
                onChange={(e) => setSelectedHands(e.target.value)}
                data-testid="hands"
              >
                <option value="-">-</option>
                <option value="우투우타">우투우타</option>
                <option value="우투좌타">우투좌타</option>
                <option value="좌투우타">좌투우타</option>
                <option value="좌투좌타">좌투좌타</option>
                <option value="양투우타">양투우타</option>
                <option value="양투좌타">양투좌타</option>
                <option value="우투양타">우투양타</option>
                <option value="좌투양타">좌투양타</option>
                <option value="양투양타">양투양타</option>
              </select>
            </div>
          </InputWrapper>
          <InputWrapper>
            <span>포지션</span>
            <div>
              <input
                type="text"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                data-testid="position"
              />
            </div>
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper>
            <span>등번호</span>
            <div>
              <input
                type="number"
                value={backNumber}
                onChange={(e) => setBackNumber(Number(e.target.value))}
                data-testid="back-number"
              />
            </div>
          </InputWrapper>
          <InputWrapper>
            <span>선출</span>
            <div>
              <select
                value={isElite ? "O" : "X"}
                onChange={(e) => setIsElite(e.target.value === "O")}
                data-testid="is-elite"
              >
                <option value="O">O</option>
                <option value="X">X</option>
              </select>
            </div>
          </InputWrapper>
        </Row>
      </Contents>
      <Button onClick={handleSubmit}>저장</Button>
    </Container>
  );
}

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Vertical)`
  flex: 1;
  padding: 24px;
  gap: 12px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  > button {
    position: relative;

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      image-rendering: -webkit-optimize-contrast;
      transform: translateZ(0);
      backface-visibility: hidden;
    }

    span {
      position: absolute;
      top: 0;
      right: 0;
    }

    input {
      display: none;
    }
  }

  > button:first-child {
    @media (min-width: 768px) {
      display: none;
    }
  }

  > div:nth-child(3) {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const Address = styled.div`
  display: flex;
  width: 516px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Contents = styled(Vertical)`
  flex: 1;
  gap: 12px;

  > span {
    display: flex;
    padding: 12px 0;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 36px;
`;

const InputWrapper = styled(Vertical)`
  gap: 4px;

  input {
    width: 240px;
    padding: 4px 8px;
    border: ${({ theme }) => `1px solid ${theme.colors.borderDark}`};
    border-radius: 4px;
    font-size: 0.9rem;

    @media (max-width: 768px) {
      width: 40vw;
      background-color: ${({ theme }) => theme.colors.background300};
    }
  }

  select {
    flex: 1;
    align-items: center;
    height: 26px;
    width: 240px;
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
    color: ${({ theme }) => theme.colors.foreground900};
    background: url("/assets/icons/chevron-down.svg") no-repeat 96% 48%;
    background-color: white;

    @media (max-width: 768px) {
      width: 40vw;
      background-color: ${({ theme }) => theme.colors.background300};
    }
  }

  > span:first-child {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background100};
  font-size: 1.125rem;
  font-weight: 600;
`;
