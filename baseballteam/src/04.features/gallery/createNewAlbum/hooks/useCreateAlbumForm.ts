import { useState } from "react";

import { useCreateAlbumAPI } from "../api/createAlbum";
import { useAlbumForm } from "@entities/gallery";

interface Options {
  postSuccess: () => void;
}

export function useCreateAlbumForm({ postSuccess }: Readonly<Options>) {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const { isUpdated, payload } = useAlbumForm();
  const { mutate: createAlbum, isPending } = useCreateAlbumAPI();

  const isButtonDisabled = !isUpdated || isPending;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isButtonDisabled) return;

    setErrorMsg("");

    createAlbum(payload, {
      onSuccess: (result) => {
        if (result.status !== "SUCCESS") {
          setErrorMsg(result.message);
        } else {
          postSuccess();
        }
      },
    });
  };

  return {
    errorMsg,
    isButtonDisabled,
    submit,
  };
}
