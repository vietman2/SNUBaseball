import { useCallback, useMemo, useState, type ReactNode } from "react";

import { NameIDInputContext } from "../contexts/useNameIDInput";

interface Props {
  children: ReactNode;
}

export function NameIDInputProvider({ children }: Readonly<Props>) {
  const [name, setName] = useState<string>("");
  const [isFullID, setIsFullID] = useState(true);
  const [fullStudentID, setFullStudentID] = useState<string>("");
  const [admissionYear, setAdmissionYear] = useState<number>(2025);
  const [isPlayer, setIsPlayer] = useState<boolean>(true);

  const toggleMode = useCallback(() => {
    setIsFullID(!isFullID);
  }, [isFullID]);

  const payload = useMemo(() => {
    if (isFullID) {
      return {
        name,
        student_id: fullStudentID,
        admission_year: null,
        is_player: isPlayer,
      };
    } else {
      return {
        name,
        student_id: null,
        admission_year: admissionYear,
        is_player: isPlayer,
      };
    }
  }, [isFullID, fullStudentID, admissionYear, name, isPlayer]);

  const ready = useMemo(() => {
    if (isFullID) {
      return name.length > 0 && fullStudentID.length > 8;
    } else {
      return name.length > 0 && admissionYear >= 2000 && admissionYear <= 2099;
    }
  }, [isFullID, name, fullStudentID, admissionYear]);

  const value = useMemo(
    () => ({
      name,
      setName,
      fullStudentID,
      setFullStudentID,
      admissionYear,
      setAdmissionYear,
      isPlayer,
      setIsPlayer,
      isFullID,
      toggleMode,
      payload,
      ready,
    }),
    [
      name,
      fullStudentID,
      admissionYear,
      isFullID,
      toggleMode,
      payload,
      ready,
      isPlayer,
    ]
  );

  return (
    <NameIDInputContext.Provider value={value}>
      {children}
    </NameIDInputContext.Provider>
  );
}
