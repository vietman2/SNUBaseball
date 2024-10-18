import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { ContentInput, TextInput } from "@components/Inputs";
import { Subtitle } from "@components/Texts";
import { uploadImage } from "@services/media";
import {
  createInformation,
  updateInformation,
  getInformationDetails,
} from "@services/board";

interface Props {
  informationId: number | null;
  editMode: boolean;
  goBack: () => void;
}

export function InformationWrite({
  informationId,
  editMode,
  goBack,
}: Readonly<Props>) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [pin, setPin] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const togglePin = () => {
    setPin(!pin);
  };

  const handleUploadImage = async (file: File) => {
    const response = await uploadImage(file);

    if (response) {
      return response;
    }

    return null;
  };

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      setAttachments([...attachments, ...Array.from(files)]);
    }
  };

  const handleUploadFileClick = () => {
    ref.current?.click();
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (editMode && informationId) {
      const response = await updateInformation(
        informationId,
        title,
        content,
        pin,
        attachments
      );

      if (response) {
        window.alert("글이 성공적으로 수정되었습니다.");
        goBack();
      } else {
        window.alert("글 수정에 실패했습니다.");
      }
    } else {
      const response = await createInformation(
        title,
        content,
        pin,
        attachments
      );

      if (response) {
        window.alert("글이 성공적으로 등록되었습니다.");
        goBack();
      } else {
        window.alert("글 등록에 실패했습니다.");
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (editMode) {
      if (informationId === null) {
        setError(true);
        setLoading(false);
        return;
      }

      const fetchInformationDetails = async () => {
        setLoading(true);

        const response = await getInformationDetails(informationId);

        if (response) {
          setTitle(response.data.title);
          setContent(response.data.content);
          setPin(response.data.pin);
          setAttachments(response.data.attachments);
          setError(false);
        } else {
          setError(true);
        }

        setLoading(false);
      };

      fetchInformationDetails();
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
      <Header>
        <Subtitle size="large">{editMode ? "글 수정" : "새 글"}</Subtitle>
        <div>
          <Subtitle>제목</Subtitle>
          <TextInput
            wide
            placeholder="제목을 입력하세요"
            value={title}
            onChange={setTitle}
          />
        </div>
        <div>
          <Subtitle>상단 고정</Subtitle>
          <input type="checkbox" checked={pin} onChange={togglePin} data-testid="toggle" />
        </div>
      </Header>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Content>
        <Horizontal>
          <Subtitle>내용</Subtitle>
          <button onClick={handleUploadFileClick}>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.hwp,.zip,.alz"
              multiple
              style={{ display: "none" }}
              ref={ref}
              onChange={handleUploadFile}
              data-testid="file-upload"
            />
            <AppIcon icon="attachment" size={16} color="gray" />
            파일 첨부 {attachments.length > 0 && `(${attachments.length})`}
          </button>
        </Horizontal>
        <ContentInput
          content={content}
          setContent={setContent}
          uploadImage={handleUploadImage}
        />
      </Content>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Footer>
        <button onClick={handleSubmit}>등록</button>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0 24px 0;
  gap: 12px;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  > div:last-child {
    display: flex;
    flex-direction: row;
    align-items: center;

    input {
      width: 16px;
      height: 16px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 0;
  gap: 16px;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 0 0;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground700};

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
`;

const DividerWrapper = styled.div`
  display: flex;
`;

const Footer = styled.div`
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
