import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { TextInput } from "@components/Inputs";
import {
  createDiscussion,
  updateDiscussion,
  getDiscussionDetails,
} from "@services/board";

export function DiscussionWrite() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { discussionId } = useParams();

  const editMode = location.pathname.includes("edit");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      setAttachments([...attachments, ...Array.from(files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleBack = () => {
    navigate("/forum/discussions");
  };

  const handleUploadFileClick = async () => {
    ref.current?.click();
  };

  const handleCreate = async () => {
    const response = await createDiscussion(title, content, attachments);

    if (response) {
      window.alert("게시글이 성공적으로 등록되었습니다.");
      handleBack();
    } else {
      window.alert("게시글 등록에 실패했습니다.");
    }
  };

  const handleEdit = async (discussionId: string) => {
    const response = await updateDiscussion(
      parseInt(discussionId),
      title,
      content,
      attachments
    );

    if (response) {
      window.alert("게시글이 성공적으로 수정되었습니다.");
      handleBack();
    } else {
      window.alert("게시글 수정에 실패했습니다.");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (editMode && discussionId) {
      handleEdit(discussionId);
    } else {
      handleCreate();
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchDiscussionDetails = async () => {
      if (!editMode) {
        setLoading(false);
        return;
      }
      if (!discussionId) {
        setError(true);
        setLoading(false);
        return;
      }

      setLoading(true);

      const response = await getDiscussionDetails(parseInt(discussionId));

      if (response) {
        setTitle(response.title);
        setContent(response.content);
        setAttachments(response.attachments);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchDiscussionDetails();
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
        <ErrorComponent label="뒤로가기" onRefresh={handleBack} />
      </Container>
    );
  }

  return (
    <Container>
      <Contents>
        <div>
          <BackButton onClick={handleBack}>
            <AppIcon icon="chevron-left" size={24} color="gray" />
          </BackButton>
          <Title>{editMode ? "게시글 수정" : "새 게시글"}</Title>
        </div>
        <InputWrapper>
          <Subtitle>제목</Subtitle>
          <TextInput
            wide
            placeholder="제목을 입력하세요"
            value={title}
            onChange={setTitle}
          />
        </InputWrapper>
        <ContentWrapper>
          <Horizontal>
            <Subtitle>내용</Subtitle>
            <Files>
              <button onClick={handleUploadFileClick}>
                <AppIcon icon="attachment" size={16} color="gray" />
                파일 첨부 {attachments.length > 0 && `(${attachments.length})`}
                <input
                  type="file"
                  accept="image/*, video/*, application/pdf, .zip, .hwp, .hwpx, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                  multiple
                  style={{ display: "none" }}
                  ref={ref}
                  onChange={handleUploadFile}
                  data-testid="file-upload"
                />
              </button>
              {attachments.map((file, index) => (
                <FilePreview
                  key={index}
                  onClick={() => handleRemoveFile(index)}
                  data-testid="remove-attachment"
                >
                  {file.name}
                  <AppIcon icon="close" size={16} color="gray" />
                </FilePreview>
              ))}
            </Files>
          </Horizontal>
          <ContentInput
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            data-testid="content-input"
          />
        </ContentWrapper>
      </Contents>
      <ButtonWrapper>
        <button onClick={handleSubmit}>등록</button>
      </ButtonWrapper>
    </Container>
  );
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Column)`
  flex: 1;
  padding: 16px 24px;
`;

const Contents = styled(Column)`
  flex: 1;
  gap: 16px;

  > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  } 
`;

const Title = styled.div`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Subtitle = styled.div`
  margin-right: 16px;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const InputWrapper = styled(Column)`
  gap: 8px;
`;

const ContentWrapper = styled(InputWrapper)`
  flex: 1;
`;

const ContentInput = styled.textarea`
  display: flex;
  flex: 1;
  padding: 8px;
  min-height: 200px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.foreground300};

  color: ${({ theme }) => theme.colors.foreground700};
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

const Files = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  > button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;

    color: ${({ theme }) => theme.colors.foreground500};
  }
`;

const BackButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
  }
`;

const FilePreview = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 0;
  gap: 8px;

  > button {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 8px 0;

    color: ${({ theme }) => theme.colors.background100};
    font-weight: 500;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
