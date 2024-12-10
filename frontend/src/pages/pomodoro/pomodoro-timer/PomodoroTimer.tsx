import React from 'react';
import {
    Laptop,
    PauseIcon,
    Smartphone,
    Sprout,
    SquareIcon,
} from 'lucide-react';
import PomodoroTomato from '@/pages/pomodoro/pomodoro-timer/PomodoroTomato.tsx';

enum PomodoroPhaseEnum {
    Focus,
    ShortBreak,
    LongBreak,
}

const PomodoroTimer = () => {
    return (
        <div className='mx-auto'>
            <div className='mt-16 flex justify-center text-8xl font-extrabold text-amber-700'>
                19:52
            </div>
            <div className='mx-auto mt-8 flex w-16 justify-between'>
                <PauseIcon
                    size={30}
                    className='cursor-pointer stroke-amber-900 opacity-15 hover:opacity-100'
                />
                <SquareIcon
                    size={30}
                    className='cursor-pointer stroke-amber-900 opacity-15 hover:opacity-100'
                />
            </div>
            <div className='mx-auto mt-8 flex w-48 justify-between'>
                <PomodoroTomato isFilled={true} />
                <PomodoroTomato isFilled={true} />
                <PomodoroTomato isFilled={false} />
                <PomodoroTomato isFilled={false} />
            </div>
            <div className='mt-16 grid w-auto grid-cols-3 overflow-hidden rounded-xl border border-amber-500'>
                <div className='flex w-40 flex-col items-center justify-between bg-amber-100 py-4'>
                    <Laptop className='stroke-amber-500' /> <span className='text-amber-700 mt-1'>Focus</span>
                </div>
                <div className='flex w-40 flex-col items-center justify-between py-4'>
                    <Smartphone className='stroke-amber-500' /> <span className='text-amber-700 mt-1'>Small Break</span>
                </div>
                <div className='flex w-40 flex-col items-center justify-between py-4'>
                    <Sprout className='stroke-amber-500' /> <span className='text-amber-700 mt-1'>Long Break</span>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
