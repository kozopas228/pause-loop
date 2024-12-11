import React, { ReactNode } from 'react';
import Header from '@/components/header/Header.tsx';
import { motion } from 'framer-motion';

interface IProps {
    children: ReactNode;
}

const Page = ({ children }: IProps) => {
    return (
        <div className='flex min-h-[100svh] flex-col'>
            <Header />
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
