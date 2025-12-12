import clsx from 'clsx';
import type { FC } from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container: FC<ContainerProps> = ({ children, className = '' }) => {
    return <div className={clsx(className, 'w-[1000px] mx-auto px-5')}>{children}</div>;
};
