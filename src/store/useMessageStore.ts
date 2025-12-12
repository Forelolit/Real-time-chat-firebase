import type { User } from '@/types/userInterface';

interface MessageStore {
    mesId: string;
    user: User;
    message: string;
    setMessage: (message: MessageStore['message']) => void;
    deleteMessage: (message: MessageStore['message']) => void;
}
