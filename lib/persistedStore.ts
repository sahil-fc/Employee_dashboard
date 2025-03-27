import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the store state and actions interface
interface UserStore {
  isLogin: boolean;
  token: string | null;
  email: string | null;
  name: string | null;
  setIsLogin: (status: boolean) => void;
  setToken: (token: string | null) => void;
  setEmail: (email: string | null) => void;
  setName: (name: string | null) => void;
  companyId  : string | null;
  setCompanyId : (id: string | null) => void;
}

// Create the Zustand store with persistence
export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      isLogin: false,
      token: null,
      email: null,
      name: null,
      companyId : null,
      setCompanyId : (id)=> set({companyId :id}),
      setIsLogin: (status) => set({ isLogin: status }),
      setToken: (token) => set({ token }),
      setEmail: (email) => set({ email }),
      setName: (name) => set({ name }),
    }),
    {
      name: 'urja', // Key in storage
      storage: createJSONStorage(() => localStorage), // Persist to localStorage
    }
  )
);
