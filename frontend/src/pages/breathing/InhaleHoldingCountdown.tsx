import React, { Dispatch, SetStateAction, useContext, useRef } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import { describeArc } from '@/utils/math.ts';
import {
    BREATHING_INHALE_HOLD_TIME,
    BREATHING_ROUNDS_AMOUNT,
} from '@/utils/constants.ts';
import { motion } from 'framer-motion';
import { BreathingContext } from '@/pages/breathing/breathing.context.ts';

interface IProps {
    setPhase: Dispatch<SetStateAction<BreathingPhaseEnum>>;
    round: number;
}

const InhaleHoldingCountdown = ({ setPhase, round }: IProps) => {
    const context = useContext(BreathingContext);

    const radius = 256;

    const renderer: CountdownRendererFn = (props) => {
        const progress = props.total / (BREATHING_INHALE_HOLD_TIME * 1000);
        const angle = 360 * (1 - progress); // Current angle (degrees)

        return (
            <div>
                <motion.div
                    className='absolute left-[50%] top-[52%] z-10 flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center md:top-[51%]'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <p className='text-center font-semibold text-sky-900 dark:text-sky-300 md:text-lg'>
                        Breath In and Hold For:
                    </p>
                    <div className='mt-2 flex justify-center text-3xl font-extrabold text-sky-700 dark:text-sky-300 md:text-5xl'>
                        {props.formatted.minutes}:{props.formatted.seconds}
                    </div>
                    <p className='mt-6 text-center text-sm font-bold text-sky-900 dark:text-sky-300 md:text-xl'>
                        &nbsp;
                    </p>
                </motion.div>
                <svg
                    className='rotate-270 z-0 h-[256px] w-[256px] transform rounded-full border border-blue-200 bg-blue-200 dark:border-sky-700 dark:bg-sky-700 md:h-[384px] md:w-[384px]'
                    viewBox='0 0 512 512'>
                    {/* "Pacman" */}
                    <path
                        d={describeArc(256, 256, radius, 0, angle)}
                        className='fill-sky-50 dark:fill-sky-950'
                    />
                </svg>
            </div>
        );
    };

    const handleComplete = () => {
        context?.breatheOutAudioRef.current?.play();

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
