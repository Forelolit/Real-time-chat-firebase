import { createBrowserRouter } from 'react-router';
import * as Pages from '@/pages/index';
import { paths } from '@/constants/constans';
import { Layout } from '@/app/layout';

export const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: paths.home,
                element: <Pages.HomePage />,
            },
            {
                path: paths.notFound,
                element: <Pages.NotFoundPage />,
            },
            {
                path: paths.channels,
                element: <Pages.ChatPage />,
            },
            {
                path: paths.register,
                element: <Pages.RegisterPage />,
            },
        ],
    },
]);
