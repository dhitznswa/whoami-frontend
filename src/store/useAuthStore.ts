import { create } from "zustand";

export type Session = {
  sub: string;
  username: string;
  name: string;
  iat: number;
  exp: number;
};

type SessionState = {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  clearSession: () => void;
};

export const useSession = create<SessionState>((set) => ({
  session: null,
  isLoading: true,
  setSession: (session) => set({ session, isLoading: false }),
  clearSession: () => set({ session: null, isLoading: false }),
}));
