import { createContext, useContext, useState, type ReactNode } from "react";

export type AccountType = "creative" | "consumer";

interface UserContextType {
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
  isPro: boolean;
  setIsPro: (v: boolean) => void;
  savedCreatives: string[];
  savedProjects: string[];
  savedEvents: string[];
  toggleSaveCreative: (id: string) => void;
  toggleSaveProject: (id: string) => void;
  toggleSaveEvent: (id: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [accountType, setAccountType] = useState<AccountType>("creative");
  const [isPro, setIsPro] = useState(false);
  const [savedCreatives, setSavedCreatives] = useState<string[]>([]);
  const [savedProjects, setSavedProjects] = useState<string[]>([]);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  const toggle = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  return (
    <UserContext.Provider
      value={{
        accountType,
        setAccountType,
        isPro,
        setIsPro,
        savedCreatives,
        savedProjects,
        savedEvents,
        toggleSaveCreative: (id) => setSavedCreatives((prev) => toggle(prev, id)),
        toggleSaveProject: (id) => setSavedProjects((prev) => toggle(prev, id)),
        toggleSaveEvent: (id) => setSavedEvents((prev) => toggle(prev, id)),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
