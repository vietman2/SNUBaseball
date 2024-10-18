import { useEffect, useState } from "react";
import styled from "styled-components";
import DOMPurify from "isomorphic-dompurify";

import { Chip } from "@components/Chips";
import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { Subtitle } from "@components/Texts";
import { useAuth } from "@contexts/auth";
import { NoticeDetailType } from "@models/forum";
import {
  getNoticeDetails,
  deleteNotice,
  createNoticeComment,
  editNoticeComment,
  deleteNoticeComment,
} from "@services/board";
import { TextInput } from "@components/Inputs";

interface Props {
  noticeId: number | null;
  goBack: () => void;
  handleEdit: () => void;
}

export function NoticeDetail({
  noticeId,
  goBack,
  handleEdit,
}: Readonly<Props>) {
  const [notice, setNotice] = useState<NoticeDetailType>();
  const [newComment, setNewComment] = useState<string>("");
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [editComment, setEditComment] = useState<string>("");

  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const { user } = useAuth();

  const canDelete = notice?.author.uuid === user?.uuid || user?.is_admin;

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleDownload = (attachment: string) => {
    window.open(attachment);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const response = await deleteNotice(notice?.id);

      if (response) {
        goBack();
      }
    }
  };

  const handleNewComment = async () => {
    const response = await createNoticeComment(notice?.id, newComment);

    if (response) {
      setNewComment("");
      alert("댓글이 작성되었습니다.");
      handleRefresh();
    } else {
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleEditClick = (id: number, originalComment: string) => {
    setSelectedCommentId(id);
    setEditComment(originalComment);
    setEditMode(true);
  };

  const handleEditCancel = () => {
    setSelectedCommentId(null);
    setEditMode(false);
    setEditComment("");
  };

  const handleEditConfirm = async () => {
    const response = await editNoticeComment(
      notice?.id,
      selectedCommentId,
      editComment
    );

    if (response) {
      setEditMode(false);
      setEditComment("");
      alert("댓글이 수정되었습니다.");
      handleRefresh();
    } else {
      alert("댓글 수정에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const response = await deleteNoticeComment(notice?.id, id);

      if (response) {
        setSelectedCommentId(null);
        alert("댓글이 삭제되었습니다.");
        handleRefresh();
      } else {
        alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    const fetchNoticeDetails = async () => {
      if (noticeId === null) return;

      setLoading(true);
      const response = await getNoticeDetails(noticeId);

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

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (noticeId === null || notice === undefined || error) {
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;
  }

  return (
    <Container>
      <Header>
        <ChipWrapper>
          <Chip
            label={notice.category.label}
            color={notice.category.color}
            bgColor={notice.category.background_color}
          />
          <div>
            {user?.uuid === notice.author.uuid && (
              <button onClick={handleEdit}>
                <Chip label="수정" color="#FFFFFF" bgColor="#0F0F70" />
              </button>
            )}
            {canDelete && (
              <button onClick={handleDelete} data-testid={"delete-notice"}>
                <Chip label="삭제" color="#FFFFFF" bgColor="#F44336" />
              </button>
            )}
          </div>
        </ChipWrapper>
        <Subtitle size="large">{notice.title}</Subtitle>
        <Metadata>
          <div>{notice.author.name}</div>
          <div>{notice.created_at}</div>
        </Metadata>
      </Header>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <AttachmentsWrapper>
        <Subtitle>첨부파일 ({notice.attachments.length})</Subtitle>
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
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Content>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(notice.content),
          }}
        />
      </Content>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Comments>
        <Subtitle>댓글 ({notice.comments.length})</Subtitle>
        {notice.comments.map((comment) => (
          <div key={comment.id}>
            {editMode && selectedCommentId === comment.id ? (
              <Horizontal>
                <TextInput
                  placeholder="댓글을 입력하세요"
                  value={editComment}
                  onChange={setEditComment}
                  wide
                  compact
                />
                <div>
                  <button onClick={handleEditCancel} data-testid="cancel-edit">
                    <AppIcon icon="close" size={24} color="red" />
                  </button>
                  <button
                    onClick={handleEditConfirm}
                    data-testid="confirm-edit"
                  >
                    <AppIcon icon="check" size={24} color="green" />
                  </button>
                </div>
              </Horizontal>
            ) : (
              <Comment>
                <div>
                  <div>{comment.content}</div>
                  <div>
                    {comment.author.name} | {comment.created_at}
                  </div>
                </div>
                <div>
                  {user?.uuid === comment.author.uuid && (
                    <>
                      <button
                        onClick={() =>
                          handleEditClick(comment.id, comment.content)
                        }
                        data-testid={`edit-comment-${comment.id}`}
                      >
                        <Chip label="수정" color="#F0F0F0" bgColor="#303090" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        data-testid={`delete-comment-${comment.id}`}
                      >
                        <Chip label="삭제" color="#F8F8F8" bgColor="#FF7961" />
                      </button>
                    </>
                  )}
                </div>
              </Comment>
            )}
          </div>
        ))}
        {!editMode && (
          <Horizontal>
            <TextInput
              placeholder="댓글을 입력하세요"
              value={newComment}
              onChange={setNewComment}
              wide
              compact
            />
            <button onClick={handleNewComment} data-testid="new-comment">
              <AppIcon icon="send" size={24} color="gray" />
            </button>
          </Horizontal>
        )}
      </Comments>
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
  padding: 8px 0;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
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

const ChipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 12px;

  > div {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
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

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 300px;
  padding: 8px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const Comments = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 8px;
  gap: 12px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const Comment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  gap: 4px;

  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  > div:last-child {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${({ theme }) => theme.colors.foreground700};

  > div:first-child {
    display: flex;
    flex: 1;
  }

  > button {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    gap: 4px;

    border-radius: 8px;

    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.background500};
    }
  }
`;

const DividerWrapper = styled.div`
  display: flex;
`;
