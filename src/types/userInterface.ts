export interface User {
    uid: string;
    displayName: string | null;
    photoURL?: string | null;
    channelIds?: string[] | null;
    searchTokens?: string[];
}
