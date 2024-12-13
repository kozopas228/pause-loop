import React, {
    Dispatch,
    MutableRefObject,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import {
    BREATHING_PAUSE_BETWEEN_ROUNDS,
    BREATHING_PREPARATION_TIME,
} from '@/utils/constants.ts';
import { motion } from 'framer-motion';
import { BreathingContext } from '@/pages/breathing/breathing.context.ts';

interface IProps {
    setPhase: Dispatch<SetStateAction<BreathingPhaseEnum>>;
    setRound: Dispatch<SetStateAction<number>>;
}

const BetweenRoundCountdown = ({ setPhase, setRound }: IProps) => {
    const context = useContext(BreathingContext);

    const [startTime, setStartTime] = useState(Date.now());

    function handleOnComplete() {
        context!.gongAudioRef.current?.play();
        setPhase(BreathingPhaseEnum.Breathing);
        setRound((prev) => prev + 1);
    }

    function renderer(props: CountdownRenderProps): ReactNode {
        return (
            <div className='relative mt-8 flex flex-col items-center justify-center'>
                <div
                    className={`z-0 h-[256px] w-[256px] rounded-full bg-blue-200 dark:bg-sky-700 md:h-[384px] md:w-[384px]`}>
                    <motion.div
                        className='absolute left-[50%] top-[46%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>
                        <p className='text-lg font-semibold text-sky-900 dark:text-sky-300'>
                            Next Round in:
                        </p>
                        <div className='mt-2 flex justify-center text-5xl font-extrabold text-sky-700 dark:text-sky-300'>
                            {props.formatted.minutes}:{props.formatted.seconds}
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <Countdown
            date={startTime + BREATHING_PAUSE_BETWEEN_ROUNDS * 1000}
            renderer={renderer}
            intervalDelay={10}
            precision={3}
            autoStart={true}
            onComplete={handleOnComplete}
        />
    );
};

export default BetweenRoundCountdown;
