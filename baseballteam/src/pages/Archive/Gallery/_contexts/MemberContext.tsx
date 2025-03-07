import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { MemberMiniType } from "@models/user";
import { searchMembers } from "@services/person";

interface MemberContextType {
  people: MemberMiniType[];
  selectedPerson: MemberMiniType | null;
  selectPerson: (person: MemberMiniType | null) => void;
  fetchMembers: (query: string) => Promise<boolean>;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberProvider({ children }: { children: React.ReactNode }) {
  const [people, setPeople] = useState<MemberMiniType[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<MemberMiniType | null>(
    null
  );

  const fetchMembers = async (query: string) => {
    const response = await searchMembers(query);

    if (response) {
      setPeople(response);
      return true;
    } else {
      return false;
    }
  };

  const selectPerson = (person: MemberMiniType | null) => {
    setSelectedPerson(person);
  };

  useEffect(() => {
    fetchMembers("");
  }, []);

  const value = useMemo(
    () => ({
      people,
      selectedPerson,
      selectPerson,
      fetchMembers,
    }),
    [people, selectedPerson]
  );

  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
}

export function useMember() {
  const context = useContext(MemberContext);

  if (!context) {
    throw new Error("useMember must be used within a MemberProvider");
  }

  return context;
}
