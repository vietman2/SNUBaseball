import { useMemo, useState } from "react";

import { useDateInputs, useUpdateMemberAPI } from "@entities/members";

type Options = {
  memberId: number;
  postUpdate: () => void;
};

type UpdateDatesFormType = {
  birth_date: string | null;
  date_joined: string | null;
};

export function useDatesForm({ memberId, postUpdate }: Readonly<Options>) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { birthDate, dateJoined, isUpdated } = useDateInputs();
  const { mutate: updateDates, isPending } =
    useUpdateMemberAPI<UpdateDatesFormType>(memberId);

  const buttonDisabled = useMemo(() => {
    return isPending || !isUpdated;
  }, [isPending, isUpdated]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending || !isUpdated) return;

    setErrorMsg(null);

    updateDates(
      {
        birth_date: birthDate,
        date_joined: dateJoined,
      },
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
  };

  return {
    errorMsg,
    buttonDisabled,
    isPending,
    submit,
  };
}
