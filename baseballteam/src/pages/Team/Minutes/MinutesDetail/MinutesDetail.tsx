import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { Menu } from "@components/Menus";
import { useTheme } from "@contexts/theme";
import { MenuOptionType } from "@models/app";
import { MinutesType } from "@models/team";
import { deleteMinutes, getMinutesDetails } from "@services/team";

export function MinutesDetail() {
  const [minutes, setMinutes] = useState<MinutesType>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { colors } = useTheme();
  const { minutesId } = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    navigate(`../${minutesId}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const response = await deleteMinutes(minutesId);

      if (response) {
        navigate(-1);
      } else {
        window.alert("삭제에 실패했습니다.");
      }
    }
  };

  const actions: MenuOptionType[] = [
    {
      label: "수정하기",
      onClick: handleEdit,
    },
    {
      label: "삭제하기",
      onClick: handleDelete,
    },
  ];

  const handleDownload = (attachment: string) => {
    window.open(attachment);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMinutesDetails(minutesId);

      if (response) {
        setMinutes(response);
      }
    };

    fetchData();
  }, [minutesId]);

  if (!minutes) {
    return <ErrorComponent label="뒤로가기" onRefresh={goBack} />;
  }

  return (
    <Container>
      <Header>
        <div>
          <div>
            <BackButton onClick={goBack}>
              <AppIcon
                icon="chevron-left"
                size={24}
                color={colors.borderDark}
              />
            </BackButton>
            <span>{minutes.title}</span>
          </div>
          <Menu
            options={actions}
            isOpen={isMenuOpen}
            toggleDropdown={toggleMenu}
          />
        </div>
        <div>
          <span>{minutes.author.name}</span>
          <span>{minutes.created_at}</span>
        </div>
      </Header>
      <span>
        <Divider bold color={colors.borderDark} />
      </span>
      <Content>
        <AttachmentsWrapper>
          <span>첨부파일 ({minutes.attachments.length})</span>
          {minutes.attachments.map((attachment) => (
            <button
              onClick={() => handleDownload(attachment.file)}
              key={attachment.name}
              data-testid={`${attachment.name}`}
            >
              <Attachment>
                <div>{attachment.name}</div>
                <AppIcon icon="download" size={24} color="gray" />
              </Attachment>
            </button>
          ))}
        </AttachmentsWrapper>
        <span>{minutes.content}</span>
      </Content>
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px;
  }

  > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;

      > span {
        font-size: 1.5rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.foreground900};
      }
    }
  }

  > div:last-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 24px;

    > span {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.foreground700};
    }
  }
`;

const BackButton = styled.button`
  padding-top: 4px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 8px;
  gap: 4px;

  > span {
    margin-bottom: 24px;
    font-size: 1rem;
    line-height: 1.5rem;

    white-space: pre-wrap;
  }
`;

const AttachmentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const Attachment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.foreground700};

  > div {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  &:hover {
    cursor: pointer;
  }
`;
