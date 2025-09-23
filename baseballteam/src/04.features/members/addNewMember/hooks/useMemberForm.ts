import { useMemo, useState } from "react";

import { useCreateNewMemberAPI } from "../api/createNewMember";
import { useMajorSelects } from "@entities/majors";
import {
  useContactInputs,
  useDateInputs,
  useNameIDInput,
} from "@entities/members";

interface Options {
  postSuccess: () => void;
}

export function useMemberForm({ postSuccess }: Readonly<Options>) {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const { payload, ready: isNameIDReady } = useNameIDInput();
  const { selectedMajorId, isUpdated: isDepartmentReady } = useMajorSelects();
  const {
    phone,
    email,
    address,
    isUpdated: isContactReady,
  } = useContactInputs();
  const { birthDate, dateJoined } = useDateInputs();

  const { mutate: createNewMember, isPending } = useCreateNewMemberAPI();

  const isFormReady = useMemo(() => {
    if (isPending) return false;

    return isNameIDReady && isDepartmentReady && isContactReady;
  }, [
    isNameIDReady,
    isDepartmentReady,
    isContactReady,
    isPending,
  ]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending || !isFormReady) return;

    setErrorMsg("");

    createNewMember(
      {
        ...payload,
        major_id: selectedMajorId,
        phone,
        email,
        address,
        birth_date: birthDate,
        date_joined: dateJoined,
      },
      {
        onSuccess: (result) => {
          if (result.status !== "SUCCESS") {
            setErrorMsg(result.message);
          } else {
            postSuccess();
          }
        },
      }
    );
  };

  return { isFormReady, submit, errorMsg };
}
