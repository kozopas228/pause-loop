import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';
import Page from '@/components/page/Page.tsx';
import VisionTimer from '@/pages/vision/VisionTimer.tsx';
import TestImage from '@/assets/images/brown-noise-background.jpg';
import VisionWorkingImage from '@/assets/vectors/vision-working.svg?react';
import VisionLookAway from '@/assets/vectors/vision-look-away.svg?react';

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
                <div className='mb-12 mt-4'>
                    <h3 className='px-3 text-center text-lg font-bold text-emerald-900 dark:text-emerald-50'>
                        To reduce eye strain caused by prolonged screen time:
                    </h3>
                    <div className='mx-auto mt-12 grid auto-cols-auto grid-cols-1 items-start justify-items-center gap-4 gap-y-20 md:mt-20 md:grid-cols-2 lg:w-3/4 lg:grid-cols-3 2xl:w-[1024px]'>
                        <div className='flex h-auto w-64 flex-col items-center'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-bold text-white dark:bg-white dark:text-black'>
                                1
                            </div>
                            <p className='mt-6 text-center font-semibold'>
                                Work for 20 minutes
                            </p>
                            <VisionWorkingImage className='mt-6 h-auto w-full md:mt-12' />
                        </div>
                        <div className='flex h-auto w-64 flex-col items-center'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-bold text-white dark:bg-white dark:text-black'>
                                2
                            </div>
                            <p className='mt-6 text-center font-semibold'>
                                Look at something 20 feet away for 20 seconds
                            </p>
                            <VisionLookAway className='mt-6 h-auto w-full md:mt-12' />
                        </div>
                        <div className='flex h-auto w-64 flex-col items-center'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-bold text-white dark:bg-white dark:text-black'>
                                3
                            </div>
                            <p className='mt-6 text-center font-semibold'>
                                Repeat
                            </p>
                            <RotateCcw className='mt-6 h-auto w-32 stroke-emerald-800 stroke-2 dark:stroke-emerald-50 md:mt-12' />
                        </div>
                    </div>
                </div>
            )}

            <BodyBackground className={'bg-emerald-50 dark:bg-emerald-950'} />
        </Page>
    );
};

export default VisionPage;
