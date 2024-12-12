import React, { Dispatch, SetStateAction } from 'react';
import { BreathingPhaseEnum } from '@/pages/breathing/breathing-phase.enum.ts';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface IProps {
    setPhase: Dispatch<SetStateAction<BreathingPhaseEnum>>;
}

const BreathingStartButton = ({ setPhase }: IProps) => {
    function handleOnStartClick() {
        setPhase(BreathingPhaseEnum.Preparation);
    }

    return (
        <div className='relative mt-8 flex flex-col items-center justify-center'>
            <motion.div
                className={`z-0 h-[512px] w-[512px] cursor-pointer rounded-full bg-blue-200 bg-transparent stroke-sky-800 text-sky-900 hover:stroke-sky-500 hover:text-sky-600`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleOnStartClick}>
                <div className='absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center'>
                    <Play size={64} />
                    <p className='mt-2 font-semibold'>Begin Breathing</p>
                </div>
            </motion.div>
        </div>
    );
};

export default BreathingStartButton;
