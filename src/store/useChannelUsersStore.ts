import { create } from 'zustand';
import type { User } from '@/types/userInterface';

interface ChannelUsersStore {
    users: User[];
    setUsers: (users: User[]) => void;
}

export const useChannelUsersStore = create<ChannelUsersStore>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
}));
