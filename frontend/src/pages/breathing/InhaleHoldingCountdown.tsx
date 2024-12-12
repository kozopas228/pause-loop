import React, { Dispatch, SetStateAction, useRef } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import { describeArc } from '@/utils/math.ts';
import {
    BREATHING_INHALE_HOLD_TIME,
    BREATHING_ROUNDS_AMOUNT,
} from '@/utils/constants.ts';
import { motion } from 'framer-motion';

interface IProps {
    setPhase: Dispatch<SetStateAction<BreathingPhaseEnum>>;
    round: number;
    breatheOutAudioRef: React.MutableRefObject<any>;
}

const InhaleHoldingCountdown = ({
    breatheOutAudioRef,
    setPhase,
    round,
}: IProps) => {
    const radius = 256; // Радіус кола

    const renderer: CountdownRendererFn = (props) => {
        const progress = props.total / (BREATHING_INHALE_HOLD_TIME * 1000);
        const angle = 360 * (1 - progress); // Поточний кут (градуси)

        return (
            <div>
                <motion.div
                    className='absolute left-[50%] top-[46%] z-10 flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <p className='text-lg font-semibold text-sky-900 dark:text-sky-300'>
                        Breath In and Hold For:
                    </p>
                    <div className='mt-2 flex justify-center text-5xl font-extrabold text-sky-700 dark:text-sky-300'>
                        {props.formatted.minutes}:{props.formatted.seconds}
                    </div>
                </motion.div>
                <svg
                    className='rotate-270 z-0 h-[512px] w-[512px] transform rounded-full border border-blue-200 bg-blue-200 dark:border-sky-700 dark:bg-sky-700'
                    viewBox='0 0 512 512'>
                    {/* Сектор "Pacman" */}
                    <path
                        d={describeArc(256, 256, radius, 0, angle)}
                        className='fill-sky-50 dark:fill-sky-950'
                    />
                </svg>
            </div>
        );
    };

    const handleComplete = () => {
        breatheOutAudioRef.current?.play();

        if (round === BREATHING_ROUNDS_AMOUNT) {
            setPhase(BreathingPhaseEnum.Finish);
        } else {
            setPhase(BreathingPhaseEnum.BetweenRoundRelax);
        }
    };

    return (
        <div className='relative mt-8 flex flex-col items-center justify-center'>
            <Countdown
                date={Date.now() + BREATHING_INHALE_HOLD_TIME * 1000}
                renderer={renderer}
                onComplete={handleComplete}
                intervalDelay={10}
                precision={3}
            />
        </div>
    );
};

export default InhaleHoldingCountdown;
