import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { ContentInput, TextInput } from "@components/Inputs";
import { Subtitle } from "@components/Texts";
import { NoticeCategoryType } from "@models/forum";
import { createNotice, getNoticeCategories } from "@services/board";
import { uploadImage } from "@services/media";

interface Props {
  goBack: () => void;
}

export function NoticeCreate({ goBack }: Readonly<Props>) {
  const [categoryOptions, setCategoryOptions] = useState<NoticeCategoryType[]>(
    []
  );
  const [category, setCategory] = useState<NoticeCategoryType>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleCategorySelect = (category: NoticeCategoryType) => {
    setCategory(category);
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

  const handleUploadFileClick = async () => {
    ref.current?.click();
  };

  const handleCreateNotice = async () => {
    setLoading(true);

    const response = await createNotice(
      title,
      content,
      category?.label,
      attachments
    );

    if (response) {
      window.alert("공지가 성공적으로 등록되었습니다.");
      goBack();
    } else {
      window.alert("공지 등록에 실패했습니다.");
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      const response = await getNoticeCategories();

      if (response) {
        setCategoryOptions(response.data);
        setCategory(response.data[0]);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchCategories();
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
        <ErrorComponent label="뒤로가기" onRefresh={goBack} />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Subtitle size="large">새 공지</Subtitle>
        <Horizontal>
          <div>
            <Subtitle>분류</Subtitle>
            <Tabs>
              {categoryOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleCategorySelect(option)}
                >
                  <Chip
                    label={option.label}
                    color={option === category ? option.color : "#BDBDBD"}
                    bgColor={
                      option === category ? option.background_color : "#F1F1F1"
                    }
                  />
                </button>
              ))}
            </Tabs>
          </div>
        </Horizontal>
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
        <ContentInput setContent={setContent} uploadImage={handleUploadImage} />
      </Content>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Footer>
        <button onClick={handleCreateNotice}>등록</button>
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

  > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
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
