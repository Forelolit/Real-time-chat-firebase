import type { ChannelType } from '@/types/channeInterface';
import { create } from 'zustand';

interface ChannelStore {
    channels: ChannelType[];
    setChannel: (channel: ChannelType) => void;
    setChannels: (channels: ChannelType[]) => void;
}

export const useChannelStore = create<ChannelStore>((set) => ({
    channels: [],
    setChannel: (channel) =>
        set((state) => ({
            channels: [...state.channels, channel],
        })),
    setChannels: (channels) => set({ channels }),
}));
