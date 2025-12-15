import { paths } from '@/constants/constans';
import { useAuthStore } from '@/store/useAuthStore';
import { Navigate, Outlet, useLocation } from 'react-router';

export const PrivateRoute = () => {
    const location = useLocation();
    const isAuth = useAuthStore((state) => state.isAuth);

    if (!isAuth) {
        return <Navigate to={paths.login} state={{ from: location }} replace />;
    }

    return <Outlet />;
};
