import { useMemo, useState, type ReactNode } from "react";

import { DateInputsContext } from "../contexts/useDateInputs";

interface Props {
  children: ReactNode;
  originalBirthDate: string | null;
  originalJoinDate: string | null;
}

export function DateInputsProvider({
  children,
  originalBirthDate,
  originalJoinDate,
}: Readonly<Props>) {
  const [birthDate, setBirthDate] = useState<string | null>(originalBirthDate);
  const [dateJoined, setDateJoined] = useState<string | null>(originalJoinDate);

  // 하나라도 변경되었으면, 버튼이 활성화되어야 한다
  const isUpdated = useMemo(() => {
    return birthDate !== originalBirthDate || dateJoined !== originalJoinDate;
  }, [birthDate, dateJoined, originalBirthDate, originalJoinDate]);

  const value = useMemo(
    () => ({
      birthDate,
      setBirthDate,
      dateJoined,
      setDateJoined,
      isUpdated,
    }),
    [birthDate, dateJoined, isUpdated]
  );

  return (
    <DateInputsContext.Provider value={value}>
      {children}
    </DateInputsContext.Provider>
  );
}
