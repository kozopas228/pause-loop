import React, { useState } from 'react';
import PomodoroTimer from '@/pages/pomodoro/pomodoro-timer/PomodoroTimer.tsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';
import Page from '@/components/page/Page.tsx';

const PomodoroPage = () => {
    const [isShowDescription, setIsShowDescription] = useState(false);

    const handleDescriptionClick = () => {
        setIsShowDescription((prev) => !prev);
    };

    return (
        <Page>
            <PomodoroTimer />
            <div className='mx-auto my-8 cursor-pointer opacity-50 hover:opacity-100'>
                <p
                    className='flex items-center justify-center text-sm font-medium text-amber-900 dark:text-amber-50'
                    onClick={handleDescriptionClick}>
                    What is this?
                    {isShowDescription ? (
                        <ChevronUp
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-amber-900 dark:stroke-amber-50'
                        />
                    ) : (
                        <ChevronDown
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-amber-900 dark:stroke-amber-50'
                        />
                    )}
                </p>
            </div>
            {isShowDescription && (
                <div className='mt-4 flex justify-center text-center'>
                    <p className='w-3/4 text-amber-900 dark:text-amber-50'>
                        The Pomodoro technique is a method to boost
                        productivity. Work on a task for 25 minutes, then take a
                        5-minute break to recharge. After four cycles, take a
                        longer break of 30 minutes to maintain focus and prevent
                        burnout.
                    </p>
                </div>
            )}

            <BodyBackground className={'bg-amber-50 dark:bg-amber-900'} />
        </Page>
    );
};

export default PomodoroPage;
