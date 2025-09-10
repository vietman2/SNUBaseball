import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { useUpdateAccountMutation } from "../api/updateAccount";
import { useAllMajors, type MajorType } from "@entities/majors";
import { useColors } from "@shared/lib/styles";
import { ElevatedTextButton } from "@shared/ui/Buttons";
import { Spinner } from "@shared/ui/Loading";
import { SimpleSelect } from "@shared/ui/Selects";

interface Props {
  memberId: number;
  originalMajor: MajorType;
  closeModal: () => void;
}

export function UpdateMajorModal({
  memberId,
  originalMajor,
  closeModal,
}: Readonly<Props>) {
  const [selectedCollegeId, setSelectedCollegeId] = useState<number>(-1);
  const [selectedMajorId, setSelectedMajorId] = useState<number>(-1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { data: colleges, isError, isLoading } = useAllMajors();
  const { mutate: updateMajor } = useUpdateAccountMutation(memberId);
  const { colors } = useColors();

  const selectDepartment = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMajorId(Number(event.target.value));
  };

  const selectCollege = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollegeId(Number(event.target.value));

    const selectedCollege = colleges?.find(
      (college) => college.id === Number(event.target.value)
    );

    if (selectedCollege && selectedCollege.departments.length > 0) {
      setSelectedMajorId(selectedCollege.departments[0].id);
    } else {
      setSelectedMajorId(-1);
    }
  };

  const isButtonDisabled = useMemo(() => {
    return (
      submitting ||
      selectedCollegeId === -1 ||
      selectedMajorId === -1 ||
      selectedMajorId === originalMajor.id
    );
  }, [submitting, selectedCollegeId, selectedMajorId, originalMajor.id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    updateMajor(
      { major_id: selectedMajorId },
      {
        onSuccess: (result) => {
          if (result.status !== "SUCCESS") {
            setError(result.message);
            setSubmitting(false);
          } else {
            closeModal();
          }
        },
      }
    );
  };

  useEffect(() => {
    if (colleges) {
      const defaultCollege = colleges.find(
        (college) => college.id === originalMajor.college_id
      );
      if (defaultCollege) {
        setSelectedCollegeId(defaultCollege.id);
        const defaultMajor = defaultCollege.departments.find(
          (major) => major.id === originalMajor.id
        );
        if (defaultMajor) {
          setSelectedMajorId(defaultMajor.id);
        } else {
          setSelectedMajorId(-1);
        }
      }
    }
  }, [colleges, originalMajor]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  if (isError || !colleges) {
    window.alert(
      "전공 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
    );
    closeModal();
    return null;
  }

  return (
    <Container>
      <h2>전공 변경</h2>
      <InputsWrapper>
        <Select
          value={selectedCollegeId}
          onChange={selectCollege}
          data-testid="college-select"
        >
          <option value={-1} disabled>
            단과대학 선택
          </option>
          {colleges.map((college) => (
            <option key={college.id} value={college.id}>
              {college.name}
            </option>
          ))}
        </Select>
        <Select
          value={selectedMajorId}
          onChange={selectDepartment}
          disabled={selectedCollegeId === -1}
          data-testid="major-select"
        >
          <option value={-1} disabled>
            전공 선택
          </option>
          {selectedCollegeId !== -1 &&
            colleges
              .find((college) => college.id === selectedCollegeId)
              ?.departments.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
        </Select>
      </InputsWrapper>
      {error && <p className="update-modal-error-text">{error}</p>}
      <Button
        onClick={handleSubmit}
        disabled={isButtonDisabled}
        $backgroundColor={colors.primary}
        $color={colors.onPrimary}
        data-testid="submit-major-update-button"
      >
        {submitting ? <Spinner /> : "변경하기"}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 8px;
  width: 400px;
  max-width: 90vw;

  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  border-radius: 16px;

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .update-modal-error-text {
    margin: 0;
    font-size: 0.875rem;
    text-align: right;
    color: ${({ theme }) => theme.colors.error};
  }
`;

const LoadingContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const Select = styled(SimpleSelect)`
  padding: 8px 12px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray900};

  &:focus-within {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled(ElevatedTextButton)`
  margin-top: 12px;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
