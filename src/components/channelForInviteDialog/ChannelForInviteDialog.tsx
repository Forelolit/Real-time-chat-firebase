import { useState, type FC } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/index';
import { userService } from '@/firebase/userService';
import { toast } from 'sonner';
import type { ChannelType } from '@/types/channeInterface';

interface ChannelForInviteDialogProps {
    userId: string;
    channels: ChannelType[];
}

export const ChannelForInviteDialog: FC<ChannelForInviteDialogProps> = ({ userId, channels }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [localChannels, setLocalChannels] = useState<ChannelType[]>(channels);

    const handleAddUser = async (userId: string, channelId: string) => {
        setIsLoading(true);

        setLocalChannels((prev) =>
            prev.map((channel) =>
                channel.id === channelId ? { ...channel, memberIds: [...channel.memberIds, userId] } : channel,
            ),
        );

        try {
            await userService.addUserToChannel(userId, channelId);
            toast.success('User added to channel');
        } catch (error) {
            setLocalChannels(channels);
            toast.error(error instanceof Error ? error.message : 'Error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="cursor-pointer bg-neutral-800 text-neutral-100 py-2 px-4 rounded-[10px]">
                Invite
            </DialogTrigger>

            <DialogContent className="max-h-[600px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center">Channels</DialogTitle>
                </DialogHeader>

                <DialogDescription>Select a channel to invite a member</DialogDescription>

                {localChannels.length ? (
                    localChannels.map((channel) => {
                        const isMember = channel.memberIds.includes(userId);

                        return (
                            <div key={channel.id} className="flex justify-between items-center border rounded p-1">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={channel.channelImage} />
                                        <AvatarFallback>{channel.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span>{channel.name}</span>
                                </div>

                                {!isMember && (
                                    <Button disabled={isLoading} onClick={() => handleAddUser(userId, channel.id)}>
                                        Select
                                    </Button>
                                )}
                                {isMember && <span className="text-neutral-500 text-sm">Already in channel</span>}
                            </div>
                        );
                    })
                ) : (
                    <div>No invitation chats</div>
                )}
            </DialogContent>
        </Dialog>
    );
};
