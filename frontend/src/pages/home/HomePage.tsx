import React from 'react';
import Header from '@/components/header/Header.tsx';
import Page from '@/components/page/Page.tsx';
import BodyBackground from '@/components/body-background/BodyBackground.tsx';
import { Link } from 'react-router-dom';
import PomodoroTomato from '@/pages/pomodoro/pomodoro-timer/PomodoroTomato.tsx';
import BrownNoiseBackgroundImageLight from '@/assets/images/brown-noise-background-light.jpg';
import BrownNoiseBackgroundImage from '@/assets/images/brown-noise-background.jpg';
import { useTheme } from '@/shadcn/components/theme-provider.tsx';
import { BREATHING_BREATH_DURATION } from '@/utils/constants.ts';

const HomePage = () => {
    const theme = useTheme();

    return (
        <Page showNav={false}>
            <div className='mx-auto mt-6 grid w-11/12 grid-cols-2 gap-6 md:w-[612px] lg:mt-20 lg:w-[956px] lg:grid-cols-4 lg:gap-10'>
                <Link
                    to='/vision'
                    className='rounded-sm border-2 border-emerald-100 bg-emerald-50 shadow duration-150 hover:shadow-lg dark:border-emerald-800 dark:bg-emerald-950 dark:shadow-emerald-900'>
                    <div className='relative mx-auto h-[130px] w-[130px] pt-2'>
                        <svg
                            className='h-full w-full -rotate-90 transform'
                            viewBox={`0 0 ${12 * 2} ${12 * 2}`}>
                            <circle
                                cx={12}
                                cy={12}
                                r={12 - 1 / 2}
                                strokeWidth={1}
                                fill='none'
                                strokeDasharray={2 * Math.PI * (12 - 1 / 2)}
                                className={`stroke-emerald-500`}
                            />
                        </svg>
                        <div className='absolute inset-0 flex flex-col items-center justify-center'>
                            <p className='mt-6 h-12 px-10 text-center text-xs font-semibold text-emerald-900 dark:text-emerald-50'>
                                Working time
                            </p>
                            <div className='text-2xl font-extrabold tracking-tight text-emerald-900 dark:text-emerald-50'>
                                20:00
                            </div>
                            <div className='mt-10 flex w-16 justify-between'></div>
                        </div>
                    </div>
                    <div className='mt-2 p-3'>
                        <div className='text-center text-lg font-bold text-emerald-950 dark:text-emerald-50 md:text-start'>
                            Eye saver 20/20/20
                        </div>
                        <div className='mt-1 hidden text-emerald-950 opacity-70 dark:text-emerald-50 md:block md:text-sm'>
                            20 minutes of work 20 seconds of looking at
                            something 20 feet far.
                        </div>
                    </div>
                </Link>

                <Link
                    to='/pomodoro'
                    className='rounded-sm border-2 border-amber-100 bg-amber-50 shadow duration-150 hover:shadow-lg dark:border-amber-800 dark:bg-amber-950 dark:shadow-amber-900'>
                    <div className='mx-auto flex h-[130px] w-[130px] flex-col items-center justify-center'>
                        <div className='text-4xl font-extrabold text-amber-700 dark:text-amber-400'>
                            25:00
                        </div>
                        <div className='grid grid-cols-4 content-center gap-4'>
                            <PomodoroTomato isFilled={true} />
                            <PomodoroTomato isFilled={true} />
                            <PomodoroTomato isFilled={false} />
                            <PomodoroTomato isFilled={false} />
                        </div>
                    </div>
                    <div className='mt-2 p-3'>
                        <div className='text-center text-lg font-bold text-amber-950 dark:text-amber-50 md:text-start'>
                            Pomodoro Timer
                        </div>
                        <div className='mt-1 hidden text-amber-950 opacity-70 dark:text-amber-50 md:block md:text-sm'>
                            Improve productivity by working in intervals.
                        </div>
                    </div>
                </Link>

                <Link
                    to='/noise'
                    className='rounded-sm border-2 border-orange-100 shadow duration-150 hover:shadow-lg dark:border-orange-800 dark:shadow-orange-900'
                    style={{
                        backgroundImage: `${theme.resolvedTheme === 'light' ? `url(${BrownNoiseBackgroundImageLight})` : `url(${BrownNoiseBackgroundImage})`} `,
                        backgroundPosition: 'center center',
                        backgroundSize: 'auto',
                        backgroundBlendMode: 'overlay',
                    }}>
                    <div className='relative mx-auto h-[130px] w-[130px] pt-2'></div>
                    <div className='mt-2 p-3'>
                        <div className='text-center text-lg font-bold text-orange-950 dark:text-orange-50 md:text-start'>
                            Brown Noise
                        </div>
                        <div className='mt-1 hidden text-orange-950 opacity-70 dark:text-orange-50 md:block md:text-sm'>
                            Deep sound, ideal for relaxation or focus.
                        </div>
                    </div>
                </Link>

                <Link
                    to='/breathing'
                    className='rounded-sm border-2 border-sky-100 bg-sky-50 shadow duration-150 hover:shadow-lg dark:border-sky-800 dark:bg-sky-950 dark:shadow-sky-900'>
                    <div className='relative mx-auto h-[130px] w-[130px] pt-2'>
                        <div
                            className={`z-10 h-[128px] w-[128px] rounded-full bg-blue-300 transition-transform dark:bg-sky-700`}></div>
                        <div
                            className={`absolute top-2 z-0 h-[128px] w-[128px] rounded-full border-[3px] border-blue-200 bg-transparent dark:border-blue-300`}></div>
                        <div
                            className={`absolute top-2 z-20 h-[128px] w-[128px] scale-50 rounded-full border-[64px] border-blue-200 bg-transparent`}></div>
                    </div>
                    <div className='mt-2 p-3'>
                        <div className='text-center text-lg font-bold text-sky-950 dark:text-sky-50 md:text-start'>
                            Breathing
                        </div>
                        <div className='mt-1 hidden text-sky-950 opacity-70 dark:text-sky-50 md:block md:text-sm'>
                            Boost energy, reduce stress, and improve focus.
                        </div>
                    </div>
                </Link>
            </div>

            <BodyBackground className={'bg-background'} />
        </Page>
    );
};

export default HomePage;
