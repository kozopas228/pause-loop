import React, { useState } from 'react';
import Header from '@/components/header/Header.tsx';
import VisionTimer from '@/pages/vision/VisionTimer.tsx';
import { ChevronDown, ChevronUp } from 'lucide-react';

const VisionPage = () => {
    const [isShowDescription, setIsShowDescription] = useState(false);

    const handleClick = () => {
        setIsShowDescription((prev) => !prev);
    };

    return (
        <div className='flex min-h-screen flex-col bg-emerald-50'>
            <Header />
            <VisionTimer />
            <div className='flex-grow'></div>
            <div className='mx-auto my-8 cursor-pointer opacity-50 hover:opacity-100'>
                <p
                    className='flex items-center justify-center text-sm font-medium text-emerald-900'
                    onClick={handleClick}>
                    What is this?
                    {isShowDescription ? (
                        <ChevronUp
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-emerald-900'
                        />
                    ) : (
                        <ChevronDown
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-emerald-900'
                        />
                    )}
                </p>
            </div>
            {isShowDescription && (
                <div className='mt-4 flex justify-center text-center'>
                    <div className='overflow-x-hidden break-words'>
                        <div className='mb-2 h-32 w-32 border bg-red-100'></div>
                        <div className='mb-2 h-32 w-32 border bg-red-100'></div>
                        <div className='mb-2 h-32 w-32 border bg-red-100'></div>
                        <div className='mb-2 h-32 w-32 border bg-red-100'></div>
                        <div className='mb-2 h-32 w-32 border bg-red-100'></div>
                        <div className='mb-2 h-32 w-32 border bg-red-100'></div>
                        <div className='mb-2 h-32 w-32 border bg-red-100'></div>
                        <div className='mb-2 h-32 w-32 border bg-red-100'></div>
                        <div className='mb-2 h-32 w-32 border bg-red-100'></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisionPage;
