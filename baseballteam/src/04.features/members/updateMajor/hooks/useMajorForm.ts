import { useCallback, useMemo, useState } from "react";

import { useMajorSelects } from "@entities/majors";
import { useUpdateMemberAPI } from "@entities/members";

type Options = {
  memberId: number;
  postUpdate: () => void;
};

type UpdateMajorFormType = {
  major_id: number;
};

export function useMajorForm({ memberId, postUpdate }: Readonly<Options>) {
  const { selectedMajorId, isUpdated } = useMajorSelects();
  const { mutate, isPending } =
    useUpdateMemberAPI<UpdateMajorFormType>(memberId);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isButtonDisabled = useMemo(
    () => isPending || !isUpdated,
    [isPending, isUpdated]
  );

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isButtonDisabled) {
        return;
      }

      setErrorMsg(null);

      mutate(
        { major_id: selectedMajorId },
        {
          onSuccess: (result) => {
            if (result.status !== "SUCCESS") {
              setErrorMsg(result.message);
            } else {
              postUpdate();
            }
          },
        }
      );
    },
    [mutate, postUpdate, selectedMajorId, isButtonDisabled]
  );

  return {
    errorMsg,
    isButtonDisabled,
    submit,
  };
}
