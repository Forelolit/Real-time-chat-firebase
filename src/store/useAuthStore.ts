import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
    isAuth: boolean;
    user: { id: string; name: string } | null;
    setUser: (user: AuthStore['user']) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuth: false,
            user: null,
            setUser: (user) => set({ user, isAuth: !!user }),
            logout: () => set({ user: null, isAuth: false }),
        }),
        {
            name: 'user-storage',
            partialize: (state) => ({
                isAuth: state.isAuth,
                user: state.user,
            }),
        },
    ),
);
