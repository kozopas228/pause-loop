import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';
import Page from '@/components/page/Page.tsx';
import VisionTimer from '@/pages/vision/VisionTimer.tsx';

const VisionPage = () => {
    const [isShowDescription, setIsShowDescription] = useState(false);

    const handleDescriptionClick = () => {
        setIsShowDescription((prev) => !prev);
    };

    return (
        <Page>
            <VisionTimer />
            <div className='mx-auto my-8 cursor-pointer opacity-50 hover:opacity-100'>
                <p
                    className='flex items-center justify-center text-sm font-medium text-emerald-900 dark:text-emerald-50'
                    onClick={handleDescriptionClick}>
                    What is this?
                    {isShowDescription ? (
                        <ChevronUp
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-emerald-900 dark:stroke-emerald-50'
                        />
                    ) : (
                        <ChevronDown
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-emerald-900 dark:stroke-emerald-50'
                        />
                    )}
                </p>
            </div>
            {isShowDescription && (
                <div className='mt-4 flex justify-center text-center'>
                    <p className='w-3/4 text-emerald-900 dark:text-emerald-50'>
                        The 20/20/20 technique is a method to reduce eye strain
                        while working on a computer. Every 20 minutes, take a
                        20-second break and look at an object 20 feet (6 meters)
                        away to help reset focus and relieve eye fatigue.
                    </p>
                </div>
            )}

            <BodyBackground className={'bg-emerald-50 dark:bg-emerald-900'} />
        </Page>
    );
};

export default VisionPage;
