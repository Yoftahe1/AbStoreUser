import { create } from "zustand";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: String;
  role: string;
  location:string;
  phoneNumber:number;
}

interface UserState {
  user: IUser|null;
  sign: (value: IUser|null) => void;
}

const useUserStore = create<UserState>()((set) => ({
  user: null,
  sign: (value) => set(() => ({ user: value })),
}));

export default useUserStore;
