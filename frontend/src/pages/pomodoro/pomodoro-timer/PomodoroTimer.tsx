import React, { useState } from 'react';
import {
    Laptop,
    PauseIcon,
    Smartphone,
    Sprout,
    SquareIcon,
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
            <div className='mt-16 grid grid-cols-3 overflow-hidden rounded-xl border border-amber-500'>
                <div
                    className={`flex w-28 flex-col items-center justify-between py-2 md:w-40 md:py-4 ${phase === PomodoroPhaseEnum.Focus && 'bg-amber-100'}`}>
                    <Laptop className='stroke-amber-500' />{' '}
                    <span className='mt-2 text-sm text-amber-700'>Focus</span>
                </div>
                <div
                    className={`flex w-28 flex-col items-center justify-between py-2 md:w-40 md:py-4 ${phase === PomodoroPhaseEnum.ShortBreak && 'bg-amber-100'}`}>
                    <Smartphone className='stroke-amber-500' />{' '}
                    <span className='mt-2 text-sm text-amber-700'>
                        Small Break
                    </span>
                </div>
                <div
                    className={`flex w-28 flex-col items-center justify-between py-2 md:w-40 md:py-4 ${phase === PomodoroPhaseEnum.LongBreak && 'bg-amber-100'}`}>
                    <Sprout className='stroke-amber-500' />{' '}
                    <span className='mt-2 text-sm text-amber-700'>
                        Long Break
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
