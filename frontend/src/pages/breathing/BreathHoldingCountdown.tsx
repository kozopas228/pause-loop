import React, { Dispatch, SetStateAction, useRef } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import { describeArc } from '@/utils/math.ts';
import { BREATHING_BREATH_HOLD_BASE_TIME } from '@/utils/constants.ts';
import { motion } from 'framer-motion';

interface IProps {
    setPhase: Dispatch<SetStateAction<BreathingPhaseEnum>>;
    round: number;
    breatheInAudioRef: React.MutableRefObject<any>;
}

const BreathHoldingCountdown = ({
    breatheInAudioRef,
    setPhase,
    round,
}: IProps) => {
    const radius = 256; // Радіус кола
    const radiusMobile = 256 / 2; // Радіус кола

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
                <div className='absolute left-[50%] top-[55%] z-10 flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center md:top-[51%]'>
                    <p className='text-center font-semibold text-sky-900 dark:text-sky-300 md:text-lg'>
                        Hold Breath For:
                    </p>
                    <div className='mt-2 flex justify-center text-3xl font-extrabold text-sky-700 dark:text-sky-300 md:text-5xl'>
                        {props.formatted.minutes}:{props.formatted.seconds}
                    </div>
                    <p className='mt-6 text-center text-sm font-bold text-sky-900 dark:text-sky-300 md:text-xl'>
                        Remember, you can Breath In if you need to.
                    </p>
                </div>
                <svg
                    className='rotate-270 z-0 h-[256px] w-[256px] transform rounded-full border border-blue-200 dark:border-sky-700 md:h-[512px] md:w-[512px]'
                    viewBox='0 0 512 512'>
                    {/* Сектор "Pacman" */}
                    <path
                        d={describeArc(256, 256, radius, 0, angle)}
                        className='fill-blue-200 dark:fill-sky-700'
                    />
                </svg>
            </motion.div>
        );
    };

    const handleComplete = () => {
        breatheInAudioRef.current?.play();
        setPhase(BreathingPhaseEnum.InhaleHolding);
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
