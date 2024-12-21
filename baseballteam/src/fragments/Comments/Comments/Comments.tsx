import { useEffect, useState } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { TextInput } from "@components/Inputs";
import { Menu } from "@components/Menus";
import { useAuth } from "@contexts/auth";
import { GenericCommentType, MenuOptionType } from "@models/app";

interface Props {
  postId: number;
  comments: GenericCommentType[];
  createComment: (id: number, content: string) => Promise<boolean | null>;
  editComment: (
    id: number,
    commentId: number | null,
    content: string
  ) => Promise<boolean | null>;
  deleteComment: (id: number, commentId: number) => Promise<boolean | null>;
  refresh: () => void;
}

export function CommentsList({
  postId,
  comments,
  createComment,
  editComment,
  deleteComment,
  refresh,
}: Readonly<Props>) {
  const [newComment, setNewComment] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleNewComment = async () => {
    const response = await createComment(postId, newComment);

    if (response) {
      setNewComment("");
      window.alert("댓글이 작성되었습니다.");
      refresh();
    } else {
      window.alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleEditClick = (id: number, originalComment: string) => {
    setSelectedCommentId(id);
    setEditContent(originalComment);
    setEditMode(true);
  };

  const handleEditCancel = () => {
    setSelectedCommentId(null);
    setEditMode(false);
    setEditContent("");
  };

  const handleEditConfirm = async () => {
    const response = await editComment(postId, selectedCommentId, editContent);

    if (response) {
      setEditMode(false);
      setEditContent("");
      window.alert("댓글이 수정되었습니다.");
      refresh();
    } else {
      window.alert("댓글 수정에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const response = await deleteComment(postId, commentId);

      if (response) {
        setSelectedCommentId(null);
        window.alert("댓글이 삭제되었습니다.");
        refresh();
      } else {
        window.alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <Comments>
        {comments.map((comment) => (
          <div key={comment.id}>
            {editMode && selectedCommentId === comment.id ? (
              <>
                <Horizontal>
                  <TextInput
                    placeholder="댓글을 입력하세요"
                    value={editContent}
                    onChange={setEditContent}
                    wide
                    compact
                  />
                  <div>
                    <button
                      onClick={handleEditCancel}
                      data-testid="cancel-edit"
                    >
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
              </>
            ) : (
              <>
                <Comment
                  comment={comment}
                  editClick={handleEditClick}
                  deleteClick={handleDeleteComment}
                />
              </>
            )}
          </div>
        ))}
      </Comments>
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
    </>
  );
}

interface CommentProps {
  comment: GenericCommentType;
  editClick: (id: number, originalComment: string) => void;
  deleteClick: (id: number) => void;
}

function Comment({ comment, editClick, deleteClick }: Readonly<CommentProps>) {
  const [menu, setMenu] = useState<MenuOptionType[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!user) return;

    const edit = {
      label: "수정하기",
      onClick: () => editClick(comment.id, comment.content),
    };

    const del = {
      label: "삭제하기",
      onClick: () => deleteClick(comment.id),
    };

    if (user.uuid === comment.author.uuid) {
      setMenu([edit, del]);
    }
  }, [user, comment]);

  return (
    <CommentContainer>
      <div>
        <span>{comment.content}</span>
        {menu.length > 0 && (
          <Menu
            options={menu}
            isOpen={isMenuOpen}
            toggleDropdown={toggleMenu}
            small
          />
        )}
      </div>
      <div>
        <span>{comment.author.name}</span>
        <span>{comment.created_at}</span>
      </div>
    </CommentContainer>
  );
}

const Comments = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

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

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  > div:first-child {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.foreground900};
    line-height: 1.5;
  }

  > div:last-child {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.foreground500};
  }
`;
