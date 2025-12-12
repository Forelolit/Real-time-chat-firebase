import { paths } from '@/constants/constans';
import type { FC } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/index';

export const RegisterRequired: FC = () => {
    return (
        <div className="grid gap-4">
            <h1 className="text-gray-700 text-3xl font-bold">You need to register for chatting</h1>

            <Link to={paths.register}>
                <Button className="w-full">Registration</Button>
            </Link>
        </div>
    );
};
