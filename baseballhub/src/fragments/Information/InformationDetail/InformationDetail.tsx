import { useEffect, useState } from "react";
import styled from "styled-components";
import DOMPurify from "isomorphic-dompurify";

import { Chip } from "@components/Chips";
import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { Subtitle } from "@components/Texts";
import { useAuth } from "@contexts/auth";
import { InformationDetailType } from "@models/forum";
import { getInformationDetails, deleteInformation } from "@services/board";

interface Props {
  informationId: number | null;
  goBack: () => void;
  handleEdit: () => void;
}

export function InformationDetail({
  informationId,
  goBack,
  handleEdit,
}: Readonly<Props>) {
  const [information, setInformation] = useState<InformationDetailType>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { user } = useAuth();

  const canDelete = user?.is_admin || user?.uuid === information?.author.uuid;

  const handleDownload = (attachment: string) => {
    window.open(attachment);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const response = await deleteInformation(information?.id);

      if (response) {
        goBack();
      }
    }
  };

  useEffect(() => {
    const fetchInformationDetails = async () => {
      if (informationId === null) return;

      setLoading(true);
      const response = await getInformationDetails(informationId);

      if (response) {
        setInformation(response.data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchInformationDetails();
  }, [informationId]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (informationId === null || information === undefined || error)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <Wrapper>
          <Subtitle size="large">{information.title}</Subtitle>
          <div>
            {user?.uuid === information.author.uuid && (
              <button onClick={handleEdit}>
                <Chip label="수정" color="#FFFFFF" bgColor="#0F0F70" />
              </button>
            )}
            {canDelete && (
              <button onClick={handleDelete} data-testid={"delete-information"}>
                <Chip label="삭제" color="#FFFFFF" bgColor="#F44336" />
              </button>
            )}
          </div>
        </Wrapper>
        <Metadata>
          <div>{information.author.name}</div>
          <div>{information.created_at}</div>
        </Metadata>
      </Header>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <AttachmentsWrapper>
        <Subtitle>첨부파일 ({information.attachments.length})</Subtitle>
        {information.attachments.map((attachment) => (
          <button
            onClick={() => handleDownload(attachment.file)}
            key={attachment.created_at}
            data-testid={`${attachment.name}`}
          >
            <Attachment>
              <div>{attachment.name}</div>
              <AppIcon icon="download" size={24} color="gray" />
            </Attachment>
          </button>
        ))}
      </AttachmentsWrapper>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Content>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(information.content),
          }}
        />
      </Content>
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
  padding: 16px 0 8px 0;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding: 8px 16px;
  gap: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 12px 8px 0;

  > div {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;

const AttachmentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 16px;
`;

const Attachment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.foreground700};

  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 8px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const DividerWrapper = styled.div`
  display: flex;
`;
