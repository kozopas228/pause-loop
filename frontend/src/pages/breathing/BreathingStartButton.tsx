import React, {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useContext,
} from 'react';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { BreathingContext } from '@/pages/breathing/breathing.context.ts';

interface IProps {
    setPhase: Dispatch<SetStateAction<BreathingPhaseEnum>>;
}

const BreathingStartButton = ({ setPhase }: IProps) => {
    const context = useContext(BreathingContext);

    function handleOnStartClick() {
        setPhase(BreathingPhaseEnum.Preparation);

        if (context?.meditationAudioRef.current) {
            context.meditationAudioRef.current.volume = 0.5;
            context.meditationAudioRef.current.play();
        }

        // we need to load or play audio by some of user's interaction
        // because iOS browsers don't allow to play audio on page load
        // or without any interaction

        context?.breatheInAudioRef.current?.load();
        context?.breatheOutAudioRef.current?.load();
        context?.tickAudioRef.current?.load();
        context?.tickFastAudioRef.current?.load();
        context?.gongAudioRef.current?.load();
        context?.alarmAudioRef.current?.load();
        context?.bellAudioRef.current?.load();
    }

    return (
        <div className='relative mt-8 flex flex-col items-center justify-center'>
            <motion.div
                className={`dark: z-0 h-[256px] w-[256px] cursor-pointer rounded-full bg-blue-200 stroke-sky-800 text-sky-900 hover:stroke-sky-500 hover:text-sky-600 dark:bg-sky-700 dark:stroke-sky-400 dark:text-sky-300 hover:dark:stroke-sky-600 hover:dark:text-sky-500 md:h-[384px] md:w-[384px]`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleOnStartClick}>
                <div className='absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center'>
                    <Play
                        className='h-[48px] w-[48px] md:h-[64px] md:w-[64px]'
                        strokeWidth={1}
                    />
                    <p className='mt-2 font-semibold'>Begin Breathing</p>
                </div>
            </motion.div>
        </div>
    );
};

export default BreathingStartButton;
