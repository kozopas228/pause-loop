import React, { Dispatch, SetStateAction } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import { describeArc } from '@/utils/math.ts';
import { BREATHING_BREATH_HOLD_BASE_TIME } from '@/utils/constants.ts';
import { motion } from 'framer-motion';

interface IProps {
    setPhase: Dispatch<SetStateAction<BreathingPhaseEnum>>;
    round: number;
}

const BreathHoldingCountdown = ({ setPhase, round }: IProps) => {
    const radius = 256; // Радіус кола

    const renderer: CountdownRendererFn = (props) => {
        const progress =
            props.total / (BREATHING_BREATH_HOLD_BASE_TIME * 1000 * round);
        const angle = 360 * (1 - progress); // Поточний кут (градуси)

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                <div className='absolute left-[50%] top-[50%] z-10 flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center'>
                    <p className='text-lg font-semibold text-sky-900'>
                        Hold Breath For:
                    </p>
                    <div className='mt-2 flex justify-center text-5xl font-extrabold text-sky-700 dark:text-sky-400'>
                        {props.formatted.minutes}:{props.formatted.seconds}
                    </div>
                </div>
                <svg
                    className='rotate-270 z-0 h-[512px] w-[512px] transform rounded-full border border-blue-200'
                    viewBox='0 0 512 512'>
                    {/* Сектор "Pacman" */}
                    <path
                        d={describeArc(256, 256, radius, 0, angle)}
                        className='fill-blue-200'
                    />
                </svg>
            </motion.div>
        );
    };

    const handleComplete = () => {
        // setPhase(BreathingPhaseEnum.NEXT_PHASE);
    };

    return (
        <div className='relative mt-8 flex flex-col items-center justify-center'>
            <Countdown
                date={
                    Date.now() + BREATHING_BREATH_HOLD_BASE_TIME * 1000 * round
                }
                renderer={renderer}
                onComplete={handleComplete}
                intervalDelay={10}
                precision={3}
            />
        </div>
    );
};

export default BreathHoldingCountdown;
