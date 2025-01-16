import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { TextInput } from "@components/Inputs";
import { createMinutes, editMinutes, getMinutesDetails } from "@services/team";

export function MinutesWrite() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { minutesId } = useParams();

  const editMode = location.pathname.includes("edit");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const goBack = () => {
    navigate(-1);
  };

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      setAttachments([...attachments, ...Array.from(files)]);
    }
  };

  const handleUploadFileClick = async () => {
    ref.current?.click();
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (editMode && minutesId) {
      const response = await editMinutes(
        minutesId,
        title,
        content,
        attachments
      );

      if (response) {
        goBack();
      } else {
        window.alert("회의록 수정에 실패했습니다.");
      }
    } else {
      const response = await createMinutes(title, content, attachments);

      if (response) {
        goBack();
      } else {
        window.alert("회의록 작성에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMinutesDetails(minutesId);

      if (response) {
        setTitle(response.title);
        setContent(response.content);
        setAttachments(response.attachments);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    if (editMode && minutesId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorComponent label="뒤로가기" onRefresh={goBack} />
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <div>
            <BackButton onClick={goBack}>
              <AppIcon icon="chevron-left" size={24} color="gray" />
            </BackButton>
            <span>{editMode ? "회의록 수정" : "새 회의록"}</span>
          </div>
        </Header>
        <Wrapper>
          <span>제목</span>
          <TextInput
            wide
            placeholder="제목을 입력하세요"
            value={title}
            onChange={setTitle}
          />
        </Wrapper>
        <Wrapper>
          <span>
            <span>내용</span>
            <Attachments>
              <button onClick={handleUploadFileClick}>
                <input
                  type="file"
                  accept="image/*, video/*, application/pdf, .zip, .hwp, .hwpx, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                  multiple
                  style={{ display: "none" }}
                  ref={ref}
                  onChange={handleUploadFile}
                  data-testid="file-upload"
                />
                <AppIcon icon="attachment" size={16} color="gray" />
                파일 첨부 {attachments.length > 0 && `(${attachments.length})`}
              </button>
              {attachments.map((file, index) => (
                <Attachment
                  key={index}
                  onClick={() => handleRemoveAttachment(index)}
                  data-testid="remove-attachment"
                >
                  {file.name}
                  <AppIcon icon="close" size={16} color="gray" />
                </Attachment>
              ))}
            </Attachments>
          </span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            data-testid="content-input"
          />
        </Wrapper>
      </Content>
      <SubmitButton onClick={handleSubmit}>
        {editMode ? "수정하기" : "등록하기"}
      </SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;

  > div:last-child {
    flex: 1;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};

  > div:first-child {
    display: flex;
    align-items: center;
    gap: 8px;

    > span {
      font-size: 1.6rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.foreground900};
    }
  }
`;

const BackButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > span:first-child {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0 4px;
    font-size: 1.25rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.foreground900};
  }

  > textarea {
    display: flex;
    flex: 1;
    padding: 8px;
    min-height: 360px;

    border-radius: 8px;
    border: ${({ theme }) => `2px solid ${theme.colors.borderDark}`};

    color: ${({ theme }) => theme.colors.foreground700};
    font-size: 1rem;
    font-family: "Noto Sans KR", sans-serif;
  }
`;

const Attachments = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  font-size: 1rem;

  > button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;

    color: ${({ theme }) => theme.colors.foreground500};
  }
`;

const Attachment = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;

  color: ${({ theme }) => theme.colors.background100};
  font-weight: 500;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
