import { useQuery } from '@tanstack/react-query';
import { channelService } from '@/firebase/channelService';
import { useAuthStore } from '@/store/useAuthStore';

export const useGetChannels = () => {
    const userId = useAuthStore((state) => state.user?.uid);

    return useQuery({
        queryKey: ['channels', userId],
        queryFn: () => channelService.getChannels(userId!),
        enabled: !!userId,
    });
};
