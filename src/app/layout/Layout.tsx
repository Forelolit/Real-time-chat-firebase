import { AppSidebar, SidebarProvider } from '@/components';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

export const Layout = () => {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <Outlet />
                </main>
                <Toaster />
            </SidebarProvider>
        </>
    );
};
