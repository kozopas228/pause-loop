import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import { BREATHING_PREPARATION_TIME } from '@/utils/constants.ts';
import { motion } from 'framer-motion';

interface IProps {
    setPhase: Dispatch<SetStateAction<BreathingPhaseEnum>>;
}

const PreparationCountdown = ({ setPhase }: IProps) => {
    const [startTime, setStartTime] = useState(Date.now());

    function handleOnComplete() {
        setPhase(BreathingPhaseEnum.Breathing);
    }

    function renderer(props: CountdownRenderProps): ReactNode {
        return (
            <div className='relative mt-8 flex flex-col items-center justify-center'>
                <div
                    className={`z-0 h-[512px] w-[512px] rounded-full bg-blue-200 bg-transparent`}>
                    <motion.div
                        className='absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>
                        <p className='text-lg font-semibold text-sky-900'>
                            Be ready to inhale in:
                        </p>
                        <div className='mt-2 flex justify-center text-8xl font-extrabold text-sky-700 dark:text-sky-400'>
                            {props.formatted.minutes}:{props.formatted.seconds}
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <Countdown
            date={startTime + BREATHING_PREPARATION_TIME * 1000}
            renderer={renderer}
            intervalDelay={10}
            precision={3}
            autoStart={true}
            onComplete={handleOnComplete}
        />
    );
};

export default PreparationCountdown;
