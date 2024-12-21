import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Divider, VerticalDivider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { Menu } from "@components/Menus";
import { useAuth } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { CommentsList } from "@fragments/Comments";
import { MenuOptionType } from "@models/app";
import { DiscussionDetailType } from "@models/forum";
import {
  getDiscussionDetails,
  deleteDiscussion,
  likeDiscussion,
  createDiscussionComment,
  editDiscussionComment,
  deleteDiscussionComment,
} from "@services/board";

export function DiscussionDetail() {
  const [discussion, setDiscussion] = useState<DiscussionDetailType>();
  const [menu, setMenu] = useState<MenuOptionType[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const { user } = useAuth();
  const { colors } = useTheme();
  const { discussionId } = useParams();
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

  const handleEdit = () => {
    navigation(`/forum/discussions/${discussion?.id}/edit`);
  };

  const handleClose = () => {
    navigation("/forum/discussions");
  };

  const handleBack = () => {
    navigation(-1);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const response = await deleteDiscussion(discussion?.id);

      if (response) {
        handleClose();
      } else {
        window.alert("삭제에 실패했습니다.");
      }
    }
  };

  const handleLike = async () => {
    const response = await likeDiscussion(discussion?.id);

    if (response) {
      handleRefresh();
    }
  };

  useEffect(() => {
    const fetchDiscussionDetails = async () => {
      if (!discussionId) return;

      setLoading(true);
      const response = await getDiscussionDetails(parseInt(discussionId));

      if (response) {
        setDiscussion(response);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchDiscussionDetails();
  }, [discussionId, refreshCount]);

  useEffect(() => {
    if (!user || !discussion) return;

    const edit = {
      label: "수정하기",
      onClick: handleEdit,
    };

    const del = {
      label: "삭제하기",
      onClick: handleDelete,
    };

    if (discussion.is_author) {
      setMenu([edit, del]);
    } else if (user.is_admin) {
      setMenu([del]);
    }
  }, [user, discussion]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (discussionId === null || discussion === undefined || error) {
    return <ErrorComponent onRefresh={handleClose} label="뒤로가기" />;
  }

  return (
    <Container>
      <Header>
        <div>
          <div>
            <BackButton onClick={handleBack} data-testid="back">
              <AppIcon
                icon="chevron-left"
                size={24}
                color={colors.borderDark}
              />
            </BackButton>
            <Subtitle>{discussion.title}</Subtitle>
          </div>
          {menu.length > 0 && (
            <Menu
              options={menu}
              isOpen={isMenuOpen}
              toggleDropdown={toggleMenu}
            />
          )}
        </div>
        <Metadata>
          <div>{discussion.author.name}</div>
          <div>{discussion.created_at}</div>
        </Metadata>
      </Header>
      <span>
        <Divider bold color={colors.borderDark} />
      </span>
      <Wrapper>
        <Box>
          <div>{discussion.content}</div>
          <div>
            <FilesWrapper>
              <span>첨부파일 ({discussion.attachments.length})</span>
              {discussion.attachments.map((attachment) => (
                <button
                  onClick={() => handleDownload(attachment.file)}
                  key={attachment.created_at}
                  data-testid={`${attachment.name}`}
                >
                  <File>
                    <div>{attachment.name}</div>
                    <AppIcon icon="download" size={24} color="gray" />
                  </File>
                </button>
              ))}
            </FilesWrapper>
            <Numbers>
              <Row>
                <button onClick={handleLike} data-testid="like">
                  <AppIcon
                    icon={discussion.is_liked ? "heart" : "heart-outline"}
                    size={18}
                    color={discussion.is_liked ? "#FF0000" : colors.primary}
                  />
                </button>
                <div>{discussion.num_likes}</div>
              </Row>
              <Row>
                <AppIcon icon="eye" size={20} color={colors.primary} />
                <div>{discussion.num_views}</div>
              </Row>
              <Row>
                <AppIcon icon="chat" size={16} color={colors.primary} />
                <div>{discussion.comments.length}</div>
              </Row>
            </Numbers>
          </div>
        </Box>
        <span>
          <VerticalDivider bold color={colors.borderDark} />
        </span>
        <span>
          <Divider color={colors.borderDark} />
        </span>
        <div>
          <CommentsList
            postId={discussion.id}
            comments={discussion.comments}
            createComment={createDiscussionComment}
            deleteComment={deleteDiscussionComment}
            editComment={editDiscussionComment}
            refresh={handleRefresh}
          />
        </div>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;

  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const Wrapper = styled.div`
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

  > span:last-child {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    > div {
      max-width: 100%;
    }

    > span:first-child {
      display: none;
    }
  }
`;

const BackButton = styled.button`
  padding-top: 4px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;

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
    }
  }
`;

const FilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const File = styled.div`
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

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Numbers = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const Box = styled.div`
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

const Subtitle = styled.div`
  padding-bottom: 2px;
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground900};
`;
