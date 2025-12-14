import { userService } from '@/firebase/userService';
import { useQuery } from '@tanstack/react-query';

export const useSearchUsers = (search: string) => {
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['search-users', search],
        queryFn: () => userService.searchUsers(search),
        enabled: search.trim().length > 0,
        staleTime: 60_000,
    });

    return { users, isLoading };
};
