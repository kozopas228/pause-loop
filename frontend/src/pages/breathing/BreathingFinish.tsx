import React, { Dispatch, SetStateAction } from 'react';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import { Play, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';

interface IProps {
    setPhase: Dispatch<SetStateAction<BreathingPhaseEnum>>;
    setRound: Dispatch<SetStateAction<number>>;
}

const BreathingFinish = ({ setPhase, setRound }: IProps) => {
    function handleOnStartClick() {
        setPhase(BreathingPhaseEnum.Preparation);
        setRound(1);
    }

    return (
        <div className='relative mt-8 flex flex-col items-center justify-center'>
            <motion.div
                className={`z-0 h-[256px] w-[256px] cursor-pointer rounded-full bg-blue-200 stroke-sky-800 text-sky-900 hover:stroke-sky-500 hover:text-sky-600 dark:bg-sky-700 dark:stroke-sky-400 dark:text-sky-300 hover:dark:stroke-sky-600 hover:dark:text-sky-500 md:h-[512px] md:w-[512px]`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleOnStartClick}>
                <div className='absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-between'>
                    <Repeat
                        size={64}
                        strokeWidth={1}
                    />
                    <p className='mt-2 font-semibold'>Repeat</p>
                </div>
            </motion.div>
        </div>
    );
};

export default BreathingFinish;
