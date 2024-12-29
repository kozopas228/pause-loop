import React, { useState } from 'react';
import {
    Armchair,
    ChevronDown,
    ChevronUp,
    RotateCcw,
    Timer,
    Wind,
} from 'lucide-react';
import BreatheIn from '@/assets/vectors/breathe-in.svg?react';

const BreathingDescription = () => {
    const [isShowDescription, setIsShowDescription] = useState(false);
    const handleDescriptionClick = () => {
        setIsShowDescription((prev) => !prev);
    };

    return (
        <>
            <div className='mx-auto my-8 cursor-pointer opacity-50 hover:opacity-100'>
                <p
                    className='flex items-center justify-center text-sm font-medium text-sky-900 dark:text-sky-50'
                    onClick={handleDescriptionClick}>
                    What is this?
                    {isShowDescription ? (
                        <ChevronUp
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-sky-900 dark:stroke-sky-50'
                        />
                    ) : (
                        <ChevronDown
                            width={25}
                            height={25}
                            className='ml-1 inline-block stroke-sky-900 dark:stroke-sky-50'
                        />
                    )}
                </p>
            </div>
            {isShowDescription && (
                <div className='mb-12 mt-4'>
                    <div className='mx-auto mt-12 grid auto-cols-auto grid-cols-1 items-start justify-items-center gap-x-20 gap-y-20 md:mt-20 md:grid-cols-2 lg:w-3/4 lg:grid-cols-3 xl:grid-cols-5 2xl:w-[1536px]'>
                        <div className='flex h-auto w-3/4 flex-col items-center md:w-full'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-sky-950 text-lg font-bold text-sky-50 dark:bg-sky-50 dark:text-sky-950'>
                                1
                            </div>
                            <p className='mt-6 text-center font-semibold text-sky-950 dark:text-sky-50'>
                                Find comfortable place and prepare
                            </p>
                            <Armchair className='mt-6 h-auto w-1/3 stroke-sky-800 stroke-2 dark:stroke-sky-50 md:mt-12 lg:w-3/4 xl:w-32' />
                        </div>
                        <div className='flex h-auto w-3/4 flex-col items-center md:w-full'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-sky-950 text-lg font-bold text-sky-50 dark:bg-sky-50 dark:text-sky-950'>
                                2
                            </div>
                            <p className='mt-6 text-center font-semibold text-sky-950 dark:text-sky-50'>
                                30 deep abdominal breaths and exhalations
                            </p>
                            <Wind className='mt-6 h-auto w-1/3 stroke-sky-800 stroke-2 dark:stroke-sky-50 md:mt-12 lg:w-3/4 xl:w-32' />
                        </div>
                        <div className='flex h-auto w-3/4 flex-col items-center md:w-full'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-sky-950 text-lg font-bold text-sky-50 dark:bg-sky-50 dark:text-sky-950'>
                                3
                            </div>
                            <p className='mt-6 text-center font-semibold text-sky-950 dark:text-sky-50'>
                                Hold your breath on the exhale
                            </p>
                            <Timer className='mt-6 h-auto w-1/3 stroke-sky-800 stroke-2 dark:stroke-sky-50 md:mt-12 lg:w-3/4 xl:w-32' />
                        </div>
                        <div className='flex h-auto w-3/4 flex-col items-center md:w-full'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-sky-950 text-lg font-bold text-sky-50 dark:bg-sky-50 dark:text-sky-950'>
                                4
                            </div>
                            <p className='mt-6 text-center font-semibold text-sky-950 dark:text-sky-50'>
                                One breath for 15 seconds
                            </p>
                            <BreatheIn className='mt-6 w-3/4 fill-sky-800 stroke-sky-800 stroke-[4px] dark:fill-sky-50 dark:stroke-sky-50 md:mt-12 lg:w-full' />
                        </div>

                        <div className='flex h-auto w-3/4 flex-col items-center md:w-full'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-sky-950 text-lg font-bold text-sky-50 dark:bg-sky-50 dark:text-sky-950'>
                                5
                            </div>
                            <p className='mt-6 text-center font-semibold text-sky-950 dark:text-sky-50'>
                                Repeat steps 2-4 several times
                            </p>
                            <RotateCcw className='mt-6 h-auto w-1/3 stroke-sky-800 stroke-2 dark:stroke-sky-50 md:mt-12 lg:w-3/4 xl:w-32' />
                        </div>
                    </div>

                    <p className='mx-auto mt-20 w-3/4 text-center text-sky-900 dark:text-sky-50'>
                        This breathing method is a technique developed by{' '}
                        <a
                            href='https://en.wikipedia.org/wiki/Wim_Hof'
                            target='_blank'
                            className='text-blue-600 underline dark:text-blue-300'>
                            Wim Hof
                        </a>
                        , also known as "The Iceman," to increase energy, reduce
                        stress, and improve focus. It involves cycles of deep
                        inhalations and exhalations followed by a breath hold.
                        This method helps activate the autonomic nervous system,
                        enhances mental clarity, and strengthens the immune
                        system.
                    </p>
                </div>
            )}
        </>
    );
};

export default BreathingDescription;
