import { db } from './firebase';
import {
    doc,
    updateDoc,
    arrayUnion,
    setDoc,
    getDoc,
    query,
    collection,
    where,
    getDocs,
    limit,
} from 'firebase/firestore';
import type { User } from '@/types/userInterface';

const addChannelToUser = async (userId: string, channelId: string) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            await setDoc(
                userRef,
                {
                    uid: userId,
                    channelIds: [channelId],
                },
                { merge: true },
            );
        } else {
            await updateDoc(userRef, {
                channelIds: arrayUnion(channelId),
            });
        }

        console.log('Channel added to user:', channelId);
    } catch (error) {
        console.error('Error adding channel to user:', error);
        throw error;
    }
};

const addUserToChannel = async (userId: string, channelId: string) => {
    try {
        const userRef = doc(db, 'users', userId);
        const channelRef = doc(db, 'channels', channelId);

        const channelDoc = await getDoc(channelRef);
        const userDoc = await getDoc(userRef);

        if (!channelDoc.exists()) {
            throw new Error('Channel not found');
        }

        if (!userDoc.exists()) {
            throw new Error('User not found');
        }

        await updateDoc(channelRef, {
            memberIds: arrayUnion(userId),
        });

        await updateDoc(userRef, {
            channelIds: arrayUnion(channelId),
        });

        return true;
    } catch (error) {
        console.error('Error adding user to channel:', error);
        throw error;
    }
};

const getUsersByIds = async (memberIds: string[]): Promise<User[]> => {
    if (!memberIds || memberIds.length === 0) {
        return [];
    }

    const chunkSize = 10;
    const users: User[] = [];

    for (let i = 0; i < memberIds.length; i += chunkSize) {
        const chunk = memberIds.slice(i, i + chunkSize);

        const q = query(collection(db, 'users'), where('__name__', 'in', chunk));

        const snapshot = await getDocs(q);

        users.push(
            ...snapshot.docs.map(
                (doc) =>
                    ({
                        uid: doc.id,
                        ...doc.data(),
                    } as User),
            ),
        );
    }

    return users;
};

export const searchUsers = async (search: string): Promise<User[]> => {
    if (!search.trim()) return [];

    const q = query(collection(db, 'users'), where('searchTokens', 'array-contains', search.toLowerCase()), limit(10));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
    })) as User[];
};

export const userService = {
    addChannelToUser,
    getUsersByIds,
    searchUsers,
    addUserToChannel,
};
