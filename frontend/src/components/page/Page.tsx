import React, {CSSProperties, ReactNode} from 'react';
import Header from '@/components/header/Header.tsx';
import { motion } from 'framer-motion';

interface IProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    isBlurredHeader?: boolean;
    showNav?: boolean;
}

const Page = ({ children, className, style, isBlurredHeader = true, showNav = true }: IProps) => {
    return (
        <div
            className={`flex min-h-[100svh] flex-col ${className}`}
            style={style}>
            <Header isBlurred={isBlurredHeader} showNav={showNav} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                {children}
            </motion.div>
        </div>
    );
};

export default Page;
