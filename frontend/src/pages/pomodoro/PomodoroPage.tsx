import React, { useState } from 'react';
import PomodoroTimer from '@/pages/pomodoro/pomodoro-timer/PomodoroTimer.tsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';
import Page from '@/components/page/Page.tsx';
import WorkingPomodoro from '@/assets/vectors/working-pomodoro.svg?react';
import ChillingPomodoro from '@/assets/vectors/chilling-pomodoro.svg?react';
import RealChillingPomodoro from '@/assets/vectors/real-chilling-pomodoro.svg?react';

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
                    className='flex items-center justify-center text-sm font-medium text-amber-900 dark:text-amber-200'
                    onClick={handleDescriptionClick}>
                    What is this?
                    {isShowDescription ? (
                        <ChevronUp
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-amber-900 dark:stroke-amber-200'
                        />
                    ) : (
                        <ChevronDown
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-amber-900 dark:stroke-amber-200'
                        />
                    )}
                </p>
            </div>
            {isShowDescription && (
                <div className='mb-12 mt-4'>
                    <h3 className='px-3 text-center text-lg font-bold text-amber-700 dark:text-amber-50'>
                        A simple way to increase productivity and focus.
                    </h3>
                    <div className='mx-auto mt-12 grid auto-cols-auto grid-cols-1 items-start justify-items-center gap-x-32 gap-y-20 md:mt-20 md:grid-cols-2 lg:w-3/4 lg:grid-cols-3 xl:grid-cols-4 2xl:w-[1024px]'>
                        <div className='flex h-auto flex-col items-center'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-amber-950 text-lg font-bold text-amber-50 dark:bg-amber-50 dark:text-amber-950'>
                                1
                            </div>
                            <p className='mt-6 text-center font-semibold text-amber-950 dark:text-amber-50'>
                                Work for 25 minutes with maximum focus
                            </p>
                            <WorkingPomodoro className='mt-6 h-auto w-3/4 md:mt-12 md:w-full' />
                        </div>
                        <div className='flex h-auto flex-col items-center'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-amber-950 text-lg font-bold text-amber-50 dark:bg-amber-50 dark:text-amber-950'>
                                2
                            </div>
                            <p className='mt-6 text-center font-semibold text-amber-950 dark:text-amber-50'>
                                Make a small break for 5 minutes
                            </p>
                            <ChillingPomodoro className='mt-6 h-auto w-3/4 md:mt-12 md:w-full' />
                        </div>
                        <div className='flex h-auto flex-col items-center'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-amber-950 text-lg font-bold text-amber-50 dark:bg-amber-50 dark:text-amber-950'>
                                3
                            </div>
                            <p className='mt-6 text-center font-semibold text-amber-950 dark:text-amber-50'>
                                Repeat 3 times
                            </p>
                            <div className='mt-6 h-auto w-3/4 md:mt-12 md:w-full'>
                                <div className='flex w-full justify-between'>
                                    <WorkingPomodoro className='mr-6 h-auto w-full' />
                                    <ChillingPomodoro className='h-auto w-full' />
                                </div>
                                <div className='mt-2 flex w-full justify-between'>
                                    <WorkingPomodoro className='mr-6 h-auto w-full' />
                                    <ChillingPomodoro className='h-auto w-full' />
                                </div>
                                <div className='mt-2 flex w-full justify-center'>
                                    <WorkingPomodoro className='h-auto w-1/2' />
                                </div>
                            </div>
                        </div>
                        <div className='flex h-auto flex-col items-center'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-amber-950 text-lg font-bold text-amber-50 dark:bg-amber-50 dark:text-amber-950'>
                                4
                            </div>
                            <p className='mt-6 text-center font-semibold text-amber-950 dark:text-amber-50'>
                                Make a long break for 30 minutes
                            </p>
                            <RealChillingPomodoro className='mt-6 h-auto w-3/4 md:mt-12 md:w-full' />
                        </div>
                    </div>
                </div>
            )}

            <BodyBackground className={'bg-amber-50 dark:bg-amber-950'} />
        </Page>
    );
};

export default PomodoroPage;
