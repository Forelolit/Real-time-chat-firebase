import { useState, type FC } from 'react';
import { ChatArticle, InputGroup, InputGroupAddon, InputGroupInput, Spinner } from '@/components/index';
import { Search } from 'lucide-react';
import clsx from 'clsx';
import { useGetChannelsByIds } from '@/hooks/useGetChannelsByIds';

interface SearchInputProps {
    className?: string;
}

export const SearchInput: FC<SearchInputProps> = ({ className }) => {
    const { channels, isLoading } = useGetChannelsByIds();
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const findChannel = (text: string) => {
        return channels?.filter((t) => t.name.toLowerCase().includes(text.toLowerCase()));
    };

    const filteredChannels = searchText ? findChannel(searchText) ?? [] : [];

    return (
        <div className={clsx(className, 'relative border border-neutral-300 w-full p-4 rounded-2xl mt-4')}>
            <InputGroup>
                <InputGroupInput
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setTimeout(() => setIsFocused(false), 150);
                    }}
                />
                <InputGroupAddon>{isLoading ? <Spinner /> : <Search />}</InputGroupAddon>
                <InputGroupAddon align="inline-end">{filteredChannels?.length ?? 0} results</InputGroupAddon>
            </InputGroup>

            {isFocused && filteredChannels.length > 0 && (
                <div className="z-10 absolute top-20 left-0 grid gap-2 p-2 rounded-2xl border bg-neutral-100 w-full">
                    <span className="text-neutral-600 ml-2">Channels</span>

                    {filteredChannels.map((i) => (
                        <div key={i.id} className="p-1 rounded-xl hover:bg-neutral-50 border">
                            <ChatArticle variant="outline" data={i} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
