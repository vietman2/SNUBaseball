import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { TextInput } from "@components/Inputs";
import { NoticeCategoryType } from "@models/forum";
import {
  createNotice,
  getNoticeCategories,
  getNoticeDetails,
  updateNotice,
} from "@services/board";

export function NoticeWrite() {
  const [categoryOptions, setCategoryOptions] = useState<NoticeCategoryType[]>(
    []
  );
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { noticeId } = useParams();

  const editMode = location.pathname.includes("edit");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleCategorySelect = (category: NoticeCategoryType) => {
    setCategory(category.label);
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
    setLoading(true);

    if (editMode && noticeId) {
      const response = await updateNotice(
        parseInt(noticeId),
        title,
        content,
        category,
        attachments
      );

      if (response) {
        window.alert("공지가 성공적으로 수정되었습니다.");
        handleBack();
      } else {
        window.alert("공지 수정에 실패했습니다.");
      }
    } else {
      const response = await createNotice(
        title,
        content,
        category,
        attachments
      );

      if (response) {
        window.alert("공지가 성공적으로 등록되었습니다.");
        handleBack();
      } else {
        window.alert("공지 등록에 실패했습니다.");
      }
    }

    setLoading(false);
  };

  const handleBack = () => {
    navigate("/forum/notices");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      const response = await getNoticeCategories();

      if (response) {
        setCategoryOptions(response.data);
        setCategory(response.data[0].label);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    const fetchNoticeDetails = async () => {
      if (editMode) {
        if (!noticeId) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(true);

        const response = await getNoticeDetails(parseInt(noticeId));

        if (response) {
          setTitle(response.data.title);
          setContent(response.data.content);
          setCategory(response.data.category.label);
          setAttachments(response.data.attachments);
          setError(false);
        } else {
          setError(true);
        }

        setLoading(false);
      }
    };

    fetchCategories();
    fetchNoticeDetails();
  }, []);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (!category || error) {
    return (
      <Container>
        <ErrorComponent label="뒤로가기" onRefresh={handleBack} />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{editMode ? "공지 수정" : "새 공지"}</Title>
        <Tabs>
          {categoryOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => handleCategorySelect(option)}
              data-testid={`category-${option.label}`}
            >
              <Chip
                label={option.label}
                color={option.label === category ? option.color : "#BDBDBD"}
                bgColor={
                  option.label === category
                    ? option.background_color
                    : "#F1F1F1"
                }
              />
            </button>
          ))}
        </Tabs>
        <div>
          <Subtitle>제목</Subtitle>
          <TextInput
            wide
            placeholder="제목을 입력하세요"
            value={title}
            onChange={setTitle}
          />
        </div>
      </Header>
      <Content>
        <Horizontal>
          <Subtitle>내용</Subtitle>
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
        </Horizontal>
        <ContentInput
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요."
          data-testid="content-input"
        />
      </Content>
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
  margin-bottom: 8px;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 8px;
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

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0;
  gap: 16px;
`;

const ContentInput = styled.textarea`
  display: flex;
  flex: 1;
  padding: 8px;
  min-height: 360px;

  border-radius: 8px;
  border: ${({ theme }) => `2px solid ${theme.colors.borderDark}`};

  color: ${({ theme }) => theme.colors.foreground700};
  font-size: 1rem;
  font-family: "Noto Sans KR", sans-serif;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

const Attachments = styled.div`
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

const Attachment = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
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
