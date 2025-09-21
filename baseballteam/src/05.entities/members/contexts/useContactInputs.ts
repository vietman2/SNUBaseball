import { createContext, useContext } from "react";

type ContactInputsContextType = {
  phone: string;
  setPhone: (phone: string) => void;

  email: string;
  setEmail: (email: string) => void;

  address: string;
  setAddress: (address: string) => void;

  isUpdated: boolean;
};

export const ContactInputsContext =
  createContext<ContactInputsContextType | null>(null);

export function useContactInputs() {
  const context = useContext(ContactInputsContext);

  if (!context) {
    throw new Error(
      "useContactInputs must be used within a ContactInputsProvider"
    );
  }

  return context;
}
