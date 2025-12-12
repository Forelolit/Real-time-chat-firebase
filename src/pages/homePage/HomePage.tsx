import { Button, Container } from '@/components';
import { Header } from '@/components/header/Header';
import { paths } from '@/constants/constans';
import { useAuthStore } from '@/store/useAuthStore';
import type { FC } from 'react';
import { Link } from 'react-router';

export const HomePage: FC = () => {
    const isAuth = useAuthStore((state) => state.isAuth);

    return (
        <section>
            <Container>
                <Header />

                <div className="h-[500px] flex justify-center items-center">
                    {isAuth && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="text-gray-800 text-3xl font-bold">Manage your channels</h1>
                                <p className="text-gray-500 text-base mt-1">
                                    Create a new communication space or join an existing one.
                                </p>
                            </div>

                            <div className="flex gap-4 items-center">
                                <Link to={paths.channels}>
                                    <Button>Create channel</Button>
                                </Link>

                                <Link to={paths.channels}>
                                    <Button variant="outline">Join channel</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                    {!isAuth && (
                        <div className="grid gap-4">
                            <h1 className="text-gray-700 text-3xl font-bold">You need to register for chatting</h1>

                            <Link to={paths.register}>
                                <Button className="w-full">Registration</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};
