import { Button, Container, RegisterRequired, SearchInput } from '@/components';
import { paths } from '@/constants/constans';
import { useAuthStore } from '@/store/useAuthStore';
import clsx from 'clsx';
import type { FC } from 'react';
import { Link } from 'react-router';

export const HomePage: FC = () => {
    const isAuth = useAuthStore((state) => state.isAuth);

    return (
        <section>
            <Container>
                {isAuth && <SearchInput />}

                <div className={clsx(`h-[${isAuth ? '500px' : '700px'}] flex justify-center items-center`)}>
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
                        <div className="block">
                            <h2 className="text-2xl text-gray-500">Home</h2>
                            <RegisterRequired />
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};
