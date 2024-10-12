import { create } from 'zustand';

const useUserInfoStore = create((set) => ({
    user: '',
    setUser: (ouid) => set({ user: ouid }),
}));

export default useUserInfoStore;