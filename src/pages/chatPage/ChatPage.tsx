import { Avatar, AvatarFallback, AvatarImage, Container } from '@/components';
import { Separator } from '@/components/ui/separator';
import type { FC } from 'react';
import { Link } from 'react-router';

const chatItems = [
    {
        id: crypto.randomUUID(),
        title: 'Cave',
        url: '/',
    },
    {
        id: crypto.randomUUID(),
        title: 'Fighters',
        url: '/',
    },
    {
        id: crypto.randomUUID(),
        title: 'Coffee drinkers',
        url: '/',
    },
];

export const ChatPage: FC = () => {
    return (
        <section className="h-full">
            <Container className="h-full flex flex-col">
                {chatItems.map((chat) => (
                    <div
                        key={chat.id}
                        className="flex gap-2 items-center border border-neutral-300 p-4 rounded-4xl mt-4">
                        <Avatar className="size-12">
                            <AvatarImage src="" />
                            <AvatarFallback>{chat.title.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Separator orientation="vertical" />
                        <Link to={chat.url}>
                            <p className="text-gray-700 text-2xl font-bold">{chat.title}</p>
                        </Link>
                    </div>
                ))}
            </Container>
        </section>
    );
};

{
    /* <div className="border border-neutral-300 p-4 rounded-3xl mb-4">
    <Input placeholder="Chat here" />
</div>; */
}
