import { useMemo, useState, type ReactNode } from "react";

import { ContactInputsContext } from "../contexts/useContactInputs";

interface Props {
  children: ReactNode;
  originalPhone: string | null;
  originalEmail: string | null;
  originalAddress: string | null;
}

export function ContactInputsProvider({
  children,
  originalPhone,
  originalEmail,
  originalAddress,
}: Readonly<Props>) {
  const [newPhone, setNewPhone] = useState<string>(originalPhone ?? "");
  const [newEmail, setNewEmail] = useState<string>(originalEmail ?? "");
  const [newAddress, setNewAddress] = useState<string>(originalAddress ?? "");

  // 하나라도 변경되었으면, 버튼이 활성화되어야 한다
  const isUpdated = useMemo(() => {
    return (
      newPhone !== (originalPhone ?? "") ||
      newEmail !== (originalEmail ?? "") ||
      newAddress !== (originalAddress ?? "")
    );
  }, [
    newPhone,
    newEmail,
    newAddress,
    originalPhone,
    originalEmail,
    originalAddress,
  ]);

  const value = useMemo(
    () => ({
      phone: newPhone,
      setPhone: setNewPhone,
      email: newEmail,
      setEmail: setNewEmail,
      address: newAddress,
      setAddress: setNewAddress,
      isUpdated,
    }),
    [newPhone, newEmail, newAddress, isUpdated]
  );

  return (
    <ContactInputsContext.Provider value={value}>
      {children}
    </ContactInputsContext.Provider>
  );
}
