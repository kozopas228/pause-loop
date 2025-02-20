import React, { useState } from 'react';
import {
    Laptop,
    Smartphone,
    Sprout,
} from 'lucide-react';
import PomodoroTomato from '@/pages/pomodoro/pomodoro-timer/PomodoroTomato.tsx';
import PomodoroCountdown from '@/pages/pomodoro/pomodoro-timer/PomodoroCountdown.tsx';
import { PomodoroPhaseEnum } from '@/pages/pomodoro/pomodoro-phase.enum.ts';

const PomodoroTimer = () => {
    const [pomodoroCount, setPomodoroCount] = useState(1);
    const [phase, setPhase] = useState<PomodoroPhaseEnum>(
        PomodoroPhaseEnum.Focus
    );

    return (
        <div className='mx-auto flex flex-col items-center'>
            <PomodoroCountdown
                phase={phase}
                setPhase={setPhase}
                pomodoroCount={pomodoroCount}
                setPomodoroCount={setPomodoroCount}
            />
            <div className='mx-auto mt-8 flex w-48 justify-between'>
                <PomodoroTomato isFilled={true} />
                <PomodoroTomato isFilled={pomodoroCount > 1} />
                <PomodoroTomato isFilled={pomodoroCount > 2} />
                <PomodoroTomato isFilled={pomodoroCount > 3} />
            </div>
            <div className='mt-16 grid grid-cols-3 overflow-hidden rounded-xl border border-amber-500 dark:border-amber-700'>
                <div
                    className={`flex w-28 flex-col items-center justify-between py-2 md:w-40 md:py-4 ${phase === PomodoroPhaseEnum.Focus && 'bg-amber-100 dark:bg-amber-800'}`}>
                    <Laptop className='stroke-amber-500 dark:stroke-amber-600' />{' '}
                    <span className='mt-2 text-sm text-amber-700 dark:text-amber-500'>
                        Focus
                    </span>
                </div>
                <div
                    className={`flex w-28 flex-col items-center justify-between py-2 md:w-40 md:py-4 ${phase === PomodoroPhaseEnum.ShortBreak && 'bg-amber-100 dark:bg-amber-800'}`}>
                    <Smartphone className='stroke-amber-500 dark:stroke-amber-600' />{' '}
                    <span className='mt-2 text-sm text-amber-700 dark:text-amber-500'>
                        Small Break
                    </span>
                </div>
                <div
                    className={`flex w-28 flex-col items-center justify-between py-2 md:w-40 md:py-4 ${phase === PomodoroPhaseEnum.LongBreak && 'bg-amber-100 dark:bg-amber-800'}`}>
                    <Sprout className='stroke-amber-500 dark:stroke-amber-600' />{' '}
                    <span className='mt-2 text-sm text-amber-700 dark:text-amber-500'>
                        Long Break
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
