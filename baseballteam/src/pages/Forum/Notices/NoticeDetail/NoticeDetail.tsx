import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider, VerticalDivider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { Menu } from "@components/Menus";
import { useAuth } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { CommentsList } from "@fragments/Comments";
import { MenuOptionType } from "@models/app";
import { NoticeDetailType } from "@models/forum";
import {
  getNoticeDetails,
  deleteNotice,
  likeNotice,
  createNoticeComment,
  deleteNoticeComment,
  editNoticeComment,
} from "@services/board";

export function NoticeDetail() {
  const [notice, setNotice] = useState<NoticeDetailType>();
  const [menu, setMenu] = useState<MenuOptionType[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const { user } = useAuth();
  const { colors } = useTheme();
  const { noticeId } = useParams();
  const navigation = useNavigate();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDownload = (attachment: string) => {
    window.open(attachment);
  };

  const handleClose = () => {
    navigation("/forum/notices");
  };

  const handleLike = async () => {
    setLoading(true);

    const response = await likeNotice(notice?.id);

    if (response) {
      handleRefresh();
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchNoticeDetails = async () => {
      if (!noticeId) return;

      setLoading(true);
      const response = await getNoticeDetails(parseInt(noticeId));

      if (response) {
        setNotice(response.data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchNoticeDetails();
  }, [noticeId, refreshCount]);

  useEffect(() => {
    if (!user || !notice) return;

    const handleEdit = () => {
      navigation(`/forum/notices/${notice?.id}/edit`);
    };

    const handleDelete = async () => {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        const response = await deleteNotice(notice?.id);

        if (response) {
          handleClose();
        } else {
          window.alert("삭제에 실패했습니다.");
        }
      }
    };

    const edit = {
      label: "수정하기",
      onClick: handleEdit,
    };

    const del = {
      label: "삭제하기",
      onClick: handleDelete,
    };

    if (notice.is_author) {
      setMenu([edit, del]);
    } else if (user.is_admin) {
      setMenu([del]);
    }
  }, [user, notice]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (noticeId === null || notice === undefined || error) {
    return <ErrorComponent onRefresh={handleClose} label="뒤로가기" />;
  }

  return (
    <Container>
      <Header>
        <ChipWrapper>
          <div>
            <Chip
              label={notice.category.label}
              color={notice.category.color}
              bgColor={notice.category.background_color}
            />
            <Subtitle>{notice.title}</Subtitle>
          </div>
          {menu.length > 0 && (
            <Menu
              options={menu}
              isOpen={isMenuOpen}
              toggleDropdown={toggleMenu}
            />
          )}
        </ChipWrapper>
        <Metadata>
          <span>{notice.author.name}</span>
          <span>{notice.created_at}</span>
        </Metadata>
      </Header>
      <span>
        <Divider bold color={colors.borderDark} />
      </span>
      <Contents>
        <Content>
          <div>{notice.content}</div>
          <div>
            <AttachmentsWrapper>
              <span>첨부파일 ({notice.attachments.length})</span>
              {notice.attachments.map((attachment) => (
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
            <Stats>
              <Row>
                <button onClick={handleLike} data-testid="like">
                  <AppIcon
                    icon={notice.is_liked ? "heart" : "heart-outline"}
                    size={18}
                    color={notice.is_liked ? "#FF0000" : colors.primary}
                  />
                </button>
                <div>{notice.num_likes}</div>
              </Row>
              <Row>
                <AppIcon icon="eye" size={20} color={colors.primary} />
                <div>{notice.num_views}</div>
              </Row>
              <Row>
                <AppIcon icon="chat" size={16} color={colors.primary} />
                <div>{notice.comments.length}</div>
              </Row>
            </Stats>
          </div>
        </Content>
        <span>
          <VerticalDivider bold color={colors.borderDark} />
        </span>
        <div>
          <CommentsList
            postId={notice.id}
            comments={notice.comments}
            createComment={createNoticeComment}
            deleteComment={deleteNoticeComment}
            editComment={editNoticeComment}
            refresh={handleRefresh}
          />
        </div>
      </Contents>
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
  padding: 16px 12px;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding-bottom: 16px;

  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 50%;
    padding: 16px 12px 4px 12px;
  }
`;

const Subtitle = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const AttachmentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Attachment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

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

const ChipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  > div:first-child {
    line-height: 1.5;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.foreground900};

    white-space: pre-wrap;
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  color: ${({ theme }) => theme.colors.foreground700};

  > button {
    display: flex;
    align-self: center;
  }
`;
