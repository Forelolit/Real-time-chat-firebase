import { type FC } from 'react';
import { SearchInput } from '@/components/index';

export const Header: FC = () => {
    return (
        <header className="border border-neutral-300 w-full p-4 rounded-2xl mt-4">
            <SearchInput />
        </header>
    );
};
