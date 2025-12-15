import { channelService } from '@/firebase/channelService';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';

export const useGetChannelsByIds = () => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ['channels', user?.channelIds],
        queryFn: () => channelService.getChannelsByIds(user?.channelIds ?? []),
        enabled: !!user?.channelIds,
    });
};
