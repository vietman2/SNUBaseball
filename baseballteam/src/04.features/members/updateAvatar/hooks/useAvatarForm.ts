import { useEffect, useState } from "react";

import { useProfileImageMutation } from "../api/updateAvatar";

type Options = {
  memberId: number;
  postUpload: () => void;
};

export function useAvatarForm({ memberId, postUpload }: Readonly<Options>) {
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { mutateAsync: uploadFile } = useProfileImageMutation(memberId);

  const MAX_SIZE_MB = 10;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setErrorMsg("업로드할 파일을 선택해주세요.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    uploadFile(file, {
      onSuccess: (result) => {
        if (result.status !== "SUCCESS") {
          setErrorMsg(result.message);
          setSubmitting(false);
          return;
        }

        setSubmitting(false);
        postUpload();
      },
    });
  };

  useEffect(() => {
    // 새 파일이 선택되면 에러 메시지 정리
    if (file) setErrorMsg(null);
  }, [file]);

  return {
    file,
    setFile,
    submitting,
    errorMsg,
    MAX_SIZE_MB,
    setErrorMsg,
    submit,
  };
}
