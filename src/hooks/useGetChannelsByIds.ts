import { channelService } from '@/firebase/channelService';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';

export const useGetChannelsByIds = () => {
    const user = useAuthStore((state) => state.user);

    const { data: channels, isLoading } = useQuery({
        queryKey: ['channels', user?.channelIds],
        queryFn: channelService.getChannelsByIds,
        enabled: !!user?.channelIds,
    });

    return { channels, isLoading };
};
