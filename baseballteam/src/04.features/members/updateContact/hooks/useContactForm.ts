import { useMemo, useState } from "react";

import { useUpdateMemberAPI, useContactInputs } from "@entities/members";

type Options = {
  memberId: number;
  postUpdate: () => void;
};

type UpdateContactFormType = {
  phone: string;
  email: string;
  address: string;
};

export function useContactForm({ memberId, postUpdate }: Readonly<Options>) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { phone, email, address, isUpdated } = useContactInputs();
  const { mutate: updateContacts } =
    useUpdateMemberAPI<UpdateContactFormType>(memberId);

  const buttonDisabled = useMemo(() => {
    return submitting || !isUpdated;
  }, [submitting, isUpdated]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (buttonDisabled) return;

    setSubmitting(true);
    setErrorMsg(null);

    updateContacts(
      {
        phone,
        email,
        address,
      },
      {
        onSuccess: (result) => {
          if (result.status !== "SUCCESS") {
            setErrorMsg(result.message);
            setSubmitting(false);
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
    submit,
  };
}
