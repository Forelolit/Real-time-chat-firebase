import { userService } from '@/firebase/userService';
import { useQuery } from '@tanstack/react-query';

export const useGetUsersByIds = (userIds: string[]) => {
    const { data: users, isLoading } = useQuery({
        queryKey: ['users', userIds],
        queryFn: () => userService.getUsersByIds(userIds),
        enabled: userIds.length > 0,
    });

    return { users, isLoading };
};
