import { useEffect, useState } from 'react';
import { messageService } from '@/firebase/messageService';
import type { Message } from '@/types/messageInterface';

export const useRealtimeMessages = (channelId: string | null) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!channelId) {
            setMessages([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const unsubscribe = messageService.subscribeToMessages(
            channelId,
            (newMessages) => {
                setMessages(newMessages);
                setLoading(false);
            },
            (err) => {
                setError(err);
                setLoading(false);
            },
        );

        // Cleanup subscription on unmount or channelId change
        return () => {
            unsubscribe();
        };
    }, [channelId]);

    return { messages, loading, error };
};
