import { ChatArticle, Container, RegisterRequired, SearchInput, Separator } from '@/components';
import { paths } from '@/constants/constans';
import { useAuthStore } from '@/store/useAuthStore';
import clsx from 'clsx';
import type { FC } from 'react';

const chatItems = [
    {
        id: crypto.randomUUID(),
        title: 'Cave',
        url: `${paths.channels}/cave`,
    },
    {
        id: crypto.randomUUID(),
        title: 'Fighters',
        url: `${paths.channels}/fighters`,
    },
    {
        id: crypto.randomUUID(),
        title: 'Coffee drinkers',
        url: `${paths.channels}/coffee-drinkers`,
    },
];

export const ChatPage: FC = () => {
    const isAuth = useAuthStore((state) => state.isAuth);

    return (
        <section className="h-full">
            <Container>
                <div
                    className={clsx(
                        'flex',
                        !isAuth && 'justify-center items-center h-[700px]',
                        isAuth && 'h-full flex-col gap-6',
                    )}>
                    {isAuth && (
                        <>
                            <SearchInput />

                            <Separator />

                            <ul className="flex flex-col gap-4">
                                {chatItems.map((chat) => (
                                    <li>
                                        <ChatArticle data={chat} />
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {!isAuth && (
                        <div className="block">
                            <h2 className="text-2xl text-gray-500">Channels</h2>
                            <RegisterRequired />
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};
