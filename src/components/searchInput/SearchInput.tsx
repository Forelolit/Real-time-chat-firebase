import type { FC } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/index';
import { Search } from 'lucide-react';
import clsx from 'clsx';

interface SearchInputProps {
    results?: number;
    className?: string;
}

export const SearchInput: FC<SearchInputProps> = ({ results = 0, className }) => {
    return (
        <div className={clsx(className, 'border border-neutral-300 w-full p-4 rounded-2xl mt-4')}>
            <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">{results} results</InputGroupAddon>
            </InputGroup>
        </div>
    );
};
