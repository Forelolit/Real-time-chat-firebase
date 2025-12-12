import type { FC } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/index';
import { Search } from 'lucide-react';

interface SearchInputProps {
    results?: number;
}

export const SearchInput: FC<SearchInputProps> = ({ results = 0 }) => {
    return (
        <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">{results} results</InputGroupAddon>
        </InputGroup>
    );
};
