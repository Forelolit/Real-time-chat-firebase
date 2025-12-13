import { create } from 'zustand';
import type { ChannelType } from '@/types/channeInterface';

interface ChannelStore {
    activeChannel: ChannelType | null;
    setActiveChannel: (channel: ChannelType | null) => void;
}

export const useChannelStore = create<ChannelStore>()((set) => ({
    activeChannel: null,
    setActiveChannel: (channel) => set({ activeChannel: channel }),
}));
